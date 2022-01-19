// Open Telemetry (optional)
import { ApolloGateway } from '@apollo/gateway';
import {ApolloServer} from 'apollo-server';
import { ApolloOpenTelemetry } from 'supergraph-demo-opentelemetry';

import { readFileSync } from 'fs';
const port = process.env.APOLLO_PORT || 4000;
const embeddedSchema = process.env.APOLLO_SCHEMA_CONFIG_EMBEDDED === "true" ? true : false;

const supergraph = embeddedSchema ? "/etc/config/supergraph.graphql" : "../supergraph.graphql";
const config = {};



setupTelementry();
setupApolloGateway();

function setupApolloGateway() {
  
  config['supergraphSdl'] = readFileSync(supergraph).toString();
  //used with docker
  if (embeddedSchema) {
    console.log('Starting Apollo Gateway in local mode ...');
    console.log(`Using local: ${supergraph}`)
  } else {
    console.log('Starting Apollo Gateway in managed mode ...');
  }

  const gateway = new ApolloGateway(config);

  const server = new ApolloServer({ gateway })

  server.listen({ port: port }).then(({ url }) => {

    console.log(`🚀 Graph Router ready at ${url}`);
  }).catch(err => { console.error(err) });
}
function setupTelementry () {
  if (process.env.APOLLO_OTEL_EXPORTER_TYPE) {
    return new ApolloOpenTelemetry({
      type: 'router',
      name: 'router',
      exporter: {
        type: process.env.APOLLO_OTEL_EXPORTER_TYPE, // console, zipkin, collector
        host: process.env.APOLLO_OTEL_EXPORTER_HOST,
        port: process.env.APOLLO_OTEL_EXPORTER_PORT,
      }
    }).setupInstrumentation();
  }
}




