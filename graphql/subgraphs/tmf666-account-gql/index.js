import db from './db.js';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import PostsAPI from './datasources/Posts.js'
import UsersAPI from './datasources/Users.js'

// Open Telemetry (optional)
import { ApolloOpenTelemetry } from 'supergraph-demo-opentelemetry';

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

import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { readFileSync } from 'fs';

const port = process.env.APOLLO_PORT || 4000;

const typeDefs = gql(readFileSync('./accounts.graphql', { encoding: 'utf-8' }));
const resolvers = {
  Query,
  Mutation
}

const context= {
  db,
}

const server = new ApolloServer({
  schema: buildFederatedSchema({
    typeDefs,
    resolvers,
  }),
  dataSources: () => {
    return {
      postsAPI: new PostsAPI(),
      usersAPI: new UsersAPI(),
    };
  },
  context
});

server.listen({ port: port }).then(({ url }) => {
  console.log(`🚀 Accounts subgraph ready at ${url}`);
}).catch(err => { console.error(err) });
