// Open Telemetry (optional)
import { ApolloGateway } from "@apollo/gateway"
import { ApolloServer } from "apollo-server"
import { ApolloOpenTelemetry } from "supergraph-demo-opentelemetry"
import { readFileSync } from "fs"

const port = process.env.APOLLO_PORT || 4000
const embeddedSchema = process.env.APOLLO_SCHEMA_CONFIG_EMBEDDED === "true" ? true : false
console.log(process.env.APOLLO_SCHEMA_CONFIG_EMBEDDED)
const supergraph = embeddedSchema ? "/etc/config/supergraph.graphql" : "../supergraph.graphql"
const config = {}

setupTelementry()
setupApolloGateway()

async function setupApolloGateway() {
  config["supergraphSdl"] = readFileSync(supergraph).toString()
  config["debug"] = true
  config["formatError"] = (err) => {
    return new Error("error")
  }

  //used with docker
  if (!embeddedSchema) {
    console.log("Starting Apollo Gateway in local mode ...")
    console.log("Using local:", `${supergraph}`)
  } else {
    console.log("Starting Apollo Gateway in managed mode ...", `${supergraph}`)
  }

  const gateway = new ApolloGateway(config)

  const server = new ApolloServer({
    gateway,
    introspection: true,
    debug: true,
    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
    formatError: (error) => {
      // switch(error.extensions.c)
      switch(error.extensions.code){
        case "GRAPHQL_VALIDATION_FAILED":
          return new Error("Error")
          default:
            return error.extensions.code
      }
    }
  })

  const { url } = await server.listen({ port: port })
  console.log(`🚀 Server ready at ${url}`)
}

function setupTelementry() {
  if (process.env.APOLLO_OTEL_EXPORTER_TYPE) {
    return new ApolloOpenTelemetry({
      type: "router",
      name: "router",
      exporter: {
        type: process.env.APOLLO_OTEL_EXPORTER_TYPE, // console, zipkin, collector
        host: process.env.APOLLO_OTEL_EXPORTER_HOST,
        port: process.env.APOLLO_OTEL_EXPORTER_PORT
      },
      formatError: (err) => {
        return new Error("error")
        console.log(err)
      }
    }).setupInstrumentation()
  }
}
