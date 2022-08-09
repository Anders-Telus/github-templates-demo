
// Open Telemetry (optional)
const { ApolloOpenTelemetry } = require('supergraph-demo-opentelemetry');

if (process.env.APOLLO_OTEL_EXPORTER_TYPE) {
  new ApolloOpenTelemetry({
    type: 'subgraph',
    name: 'customers',
    exporter: {
      type: process.env.APOLLO_OTEL_EXPORTER_TYPE, // console, zipkin, collector
      host: process.env.APOLLO_OTEL_EXPORTER_HOST,
      port: process.env.APOLLO_OTEL_EXPORTER_PORT,
    }
  }).setupInstrumentation();
}

const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { readFileSync } = require('fs');

const port = process.env.APOLLO_PORT || 4000;

const customers = [
    { id: "C111", name: "Test Customer", status: "active", accounts:[{id: "AC01", name: "Test Account"}] },
    { id: "C222", name: "Test Customer 2", status: "deactivated", accounts:[{id: "AC02", name: "Test Account"}] }
]

const typeDefs = gql(readFileSync('./customers.graphql', { encoding: 'utf-8' }));
const resolvers = {
    Query: {
        allCustomers: (_, args, context) => {
            return customers;
        },
        customer: (_, args, context) => {
            return customers.find(c => c.id == args.id);
        }
    },
    Customer: {
        __resolveReference: (reference) => {
            return customers.find(u => u.id == reference.id);
        }
    }
}

const server = new ApolloServer({ schema: buildFederatedSchema({ typeDefs, resolvers }) });

server.listen( {port: port} ).then(({ url }) => {
  console.log(`🚀 Customers subgraph ready at ${url}`);
}).catch(err => {console.error(err)});
