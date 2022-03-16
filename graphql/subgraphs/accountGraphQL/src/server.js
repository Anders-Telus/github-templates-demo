import { ApolloServer } from "apollo-server"
import mongoose from "mongoose"
import buildBillFormatSource from "./services/billFormat/datasources"
import buildAccountSource from "./services/account/datasources"
import buildBillCycleSource from "./services/billCycle/datasources"
import billFormatLoad from "./services/billFormat/datasources/pre-load"
import billCycleLoad from "./services/billCycle/datasources/pre-load"
import accountLoad from "./services/account/datasources/pre-load"
import billCycleResolver from "./services/billCycle/resolvers/index.js"
import billFormatResolver from "./services/billFormat/resolvers/index.js"
import accountResolver from "./services/account/resolvers/index.js"
import { buildSubgraphSchema } from "@apollo/subgraph"

// Open Telemetry (optional)
import { ApolloOpenTelemetry } from "supergraph-demo-opentelemetry"
import billCycleTypeDefs from "./services/billCycle/typeDefs/schema"
import billFormatTypeDefs from "./services/billFormat/typeDefs/schema"
import accountTypeDefs from "./services/account/typeDefs/schema"
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge"

if (process.env.APOLLO_OTEL_EXPORTER_TYPE) {
  new ApolloOpenTelemetry({
    type: "subgraph",
    name: "account",
    exporter: {
      type: process.env.APOLLO_OTEL_EXPORTER_TYPE, // console, zipkin, collector
      host: process.env.APOLLO_OTEL_EXPORTER_HOST,
      port: process.env.APOLLO_OTEL_EXPORTER_PORT
    }
  }).setupInstrumentation()
}

const port = process.env.APOLLO_PORT || 4000
const db_username = process.env.DB_USERNAME || "root"
const db_password = process.env.DB_PASSWORD || "rootpassword"

;(async () => {
  const mongoUri = `mongodb://${db_username}:${db_password}@mongodb:27017/admin`
  console.log("mongo url: " + mongoUri)
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const db = mongoose.connection

    await billFormatLoad.data(db)
    await billCycleLoad.data(db)
    await accountLoad.data(db)

    const stitchedSchema = mergeTypeDefs([accountTypeDefs, billCycleTypeDefs, billFormatTypeDefs])

    const newResolvers = mergeResolvers([accountResolver, billCycleResolver, billFormatResolver])
    const server = new ApolloServer({
      schema: buildSubgraphSchema([{ typeDefs: stitchedSchema, resolvers: newResolvers }]),
      tracing: true,
      context: async ({ req }) => {},
      plugins: [
        // ApolloServerPluginUsageReporting({
        //   rewriteError(err) {
        //     // Make sure that a specific pattern is removed from all error messages.
        //     err.message = err.message.replace(/x-api-key:[A-Z0-9-]+/, "REDACTED")
        //     return err
        //   }
        // })
      ],
      formatError: (err) => {
        switch (err.extensions.code) {
          case "BAD_USER_INPUT":
            return new Error("Please check your input")
          case "GRAPHQL_VALIDATION_FAILED":
            return new Error("Your field is spelled incorrect please verify")
          case " INTERNAL_SERVER_ERROR":
            return new Error("Your field is spelled incorrect please verify")

          default:
            return err
        }
        // Don't give the specific errors to the client
        // Otherwise return the original error. The error can also
        // be manipulated in other ways, as long as it's returned
      },
      dataSources: () => ({
        ...buildBillFormatSource.db(db),
        ...buildBillCycleSource.db(db),
        ...buildAccountSource.db(db)
      }),
      onHealthCheck: (typeDefs) => {
        return new Promise((resolve, reject) => {
          if (typeDefs) {
            resolve() // reach health check using ${url}.well-known/apollo/server-health
          } else {
            reject()
          }
        })
      }
    })
    server
      .listen({ port: port })
      .then(({ url }) => {
        console.log(`🚀 New Account subgraph ready at ${url}`)
        console.log("MongoDB connected!!")
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (err) {
    console.log("Failed to connect to MongoDB", err)
  }
})()
