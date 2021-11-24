// Open Telemetry (optional)
const { ApolloOpenTelemetry } = require('supergraph-demo-opentelemetry');

if (process.env.APOLLO_OTEL_EXPORTER_TYPE) {
  new ApolloOpenTelemetry({
    type: 'subgraph',
    name: 'account',
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

const port = process.env.APOLLO_PORT || 4001;

const accounts = [
    { id: "1234", name: "Test account", status: "active" },
    { id: "4321", name: "Test account 2", status: "deactivated" }
]

const typeDefs = gql(readFileSync('./accounts.graphql', { encoding: 'utf-8' }));
const resolvers = {
    Query: {
        allAccounts: (_, args, context) => {
            return accounts;
        },
        account: (_, args, context) => {
            return accounts.find(c => c.id == args.id);
        }
    },
    account: {
        __resolveReference: (reference) => {
            return accounts.find(u => u.id == reference.id);
        }
    }
}

const server = new ApolloServer({ schema: buildFederatedSchema({ typeDefs, resolvers }) });

server.listen( {port: port} ).then(({ url }) => {
  console.log(`🚀 Accounts subgraph ready at ${url}`);
}).catch(err => {console.error(err)});
