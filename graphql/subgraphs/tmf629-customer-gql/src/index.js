// Open Telemetry (optional)
const { ApolloOpenTelemetry } = require ("supergraph-demo-opentelemetry");

if (process.env.APOLLO_OTEL_EXPORTER_TYPE) {
  new ApolloOpenTelemetry({
    type: 'subgraph',
    name: 'customer',
    exporter: {
      type: process.env.APOLLO_OTEL_EXPORTER_TYPE, // console, zipkin, collector
      host: process.env.APOLLO_OTEL_EXPORTER_HOST,
      port: process.env.APOLLO_OTEL_EXPORTER_PORT,
    }
  }).setupInstrumentation();
}

const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const { GraphQLJSON } = require("graphql-type-json");
const buildSource = require('./datasources');
const errorBuilder = require('./common/errorBuilder');
const load = require('./datasources/pre-load')
const { readFileSync } = require('fs');

const port = process.env.APOLLO_PORT || 4001;
const db_username = process.env.DB_USERNAME || 'root';
const db_password = process.env.DB_PASSWORD || 'rootpassword';

(async () => {
  //const mongoUri = 'mongodb://'+db_username+':'+db_password+'@mongodb:27017/admin';
  const mongoUri = `mongodb://${db_username}:${db_password}@mongodb:27017/admin`;
  console.log('mongo url: '+mongoUri);
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) console.error("error while connecting db: "+err);
  });

  const db = mongoose.connection;
  await load.data(db);

  const typeDefs = await gql(readFileSync('./src/customers.graphql', { encoding: 'utf-8' }));
  const resolvers = {
    Query: {
      jobs: async (_, { limit }, { dataSources: { Job } }) => {
       return Job.getAll(limit);
     },
     branch: async (_, { _id }, { dataSources: { Branch } }) =>
       Branch.loadBranch(_id),
     branches: async (_, __, { dataSources: { Branch } }) => Branch.getAll(),
     branchProfessionsByQuery: async (
       _,
       { sourceId, ttl },
       { dataSources: { Profession } }
     ) =>
       Profession.loadProfessionsByQuery({
         branchSourceId: sourceId
       }, 
       ttl),
    },
    Branch: {
     professions: async (
       { sourceId, professions: professionsIds },
       { ttl },
       { dataSources: { Profession } }
     ) => Profession.loadProfessions(professionsIds)
   },
   Job: {
     profession: async (
       { _id, profession: professionId },
       { ttl },
       { dataSources: { Profession } }
     ) => Profession.loadProfession(professionId, ttl)
    }
  }

  const getError = (error) => {
    const errorMsg = errorBuilder(error);
    return errorMsg;
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    tracing: true,
    context: async ({ req }) => {},
    dataSources: () => ({
      ...buildSource.db(db)
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
  server.listen( {port: port} ).then(({ url }) => {
    console.log(`🚀 Customers subgraph ready at ${url}`);
  }).catch(err => {console.error(err)});
})();
