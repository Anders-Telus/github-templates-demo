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

config["supergraphSdl"] = readFileSync(supergraph).toString()
config["debug"] = true
config["formatError"] = (err) => {
  return new Error("error")
}
setupTelementry()
createApolloServer(port);
const gateway = new ApolloGateway(config);
export const createAp = async (options = { port: port}) => {
  
  const server = new ApolloServer({
    gateway,
    introspection: true,
    debug: true,
    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
    formatError: (error) => {
      switch (error.extensions.code) {
        case "GRAPHQL_VALIDATION_FAILED":
          return new Error("Custom readable error")
        default:
          return error.extensions.code
      }
    }
  })
  const serverInfo = await server.listen(options)
  if (process.env.NODE_ENV !== "test") {
    console.log(`🚀 Query endpoint ready at http://localhost:${options.port}${server.graphqlPath}`)
  }

  // serverInfo is an object containing the server instance and the url the server is listening on
  return serverInfo
}

export async function createApolloServer(options = { port: port }){


//used with docker
if (!embeddedSchema) {
  console.log("Starting Apollo Gateway in local mode ...")
  console.log("Using local:", `${supergraph}`)
} else {
  console.log("Starting Apollo Gateway in managed mode ...", `${supergraph}`)
}


  const gateway = new ApolloGateway(config);
  const server = new ApolloServer({
    gateway,
    introspection: true,
    debug: true,
    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
    formatError: (error) => {
      switch (error.extensions.code) {
        case "GRAPHQL_VALIDATION_FAILED":
          return new Error("Custom readable error")
        default:
          return error.extensions.code
      }
    }
  })
  const serverInfo = await server.listen(options)
  if (process.env.NODE_ENV !== "test") {
    console.log(`🚀 Query endpoint ready at http://localhost:${port}${server.graphqlPath}`)
  }

  // serverInfo is an object containing the server instance and the url the server is listening on
  return serverInfo
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
      }
    }).setupInstrumentation()
  }
}
