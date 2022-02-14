
import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import buildBillFormatSource from "./services/billFormat/datasources";
import buildBillCycleSource from "./services/billCycle/datasources";
import errorBuilder from "./common/errorBuilder";
import billFormatLoad from "./services/billFormat/datasources/pre-load";
import billCycleLoad from "./services/billCycle/datasources/pre-load";
import {typeDefs } from "./services/index"
import billCycleResolver from "./services/billCycle/resolvers/index.js";
import billFormatResolver from "./services/billFormat/resolvers/index.js";

// Open Telemetry (optional)
import { ApolloOpenTelemetry } from "supergraph-demo-opentelemetry";
import { makeExecutableSchema } from '@graphql-tools/schema';


if (process.env.APOLLO_OTEL_EXPORTER_TYPE) {
  new ApolloOpenTelemetry({
    type: "subgraph",
    name: "account",
    exporter: {
      type: process.env.APOLLO_OTEL_EXPORTER_TYPE, // console, zipkin, collector
      host: process.env.APOLLO_OTEL_EXPORTER_HOST,
      port: process.env.APOLLO_OTEL_EXPORTER_PORT,
    },
  }).setupInstrumentation();
}

const port = process.env.APOLLO_PORT || 4000;
const db_username = process.env.DB_USERNAME || "root";
const db_password = process.env.DB_PASSWORD || "rootpassword";


(async () => {
  const mongoUri = `mongodb://${db_username}:${db_password}@mongodb:27017/admin`;
  console.log("mongo url: " + mongoUri);
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    await billFormatLoad.data(db);
    await billCycleLoad.data(db);

    const getError = (error) => {
      const errorMsg = errorBuilder(error);
      return errorMsg;
    };

const resolvers = [billFormatResolver, billCycleResolver];
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

    const server = new ApolloServer({
      schema: schema,
      tracing: true,
      context: async ({ req }) => {},
      dataSources: () => ({
        ...buildBillFormatSource.db(db),
        ...buildBillCycleSource.db(db)
      }),
      onHealthCheck: (typeDefs) => {
        return new Promise((resolve, reject) => {
          if (typeDefs) {
            resolve(); // reach health check using ${url}.well-known/apollo/server-health
          } else {
            reject();
          }
        });
      },
      formatError: (err) => {
        const error = getError(err);
        return error;
      },
    });
    server
      .listen({ port: port })
      .then(({ url }) => {
        console.log(`🚀 New Account subgraph ready at ${url}`);
        console.log("MongoDB connected!!");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
})();
