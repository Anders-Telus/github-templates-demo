

const apolloOpenTelemetry = "";
import { ApolloOpenTelemetry } from 'supergraph-demo-opentelemetry';
if (process.env.APOLLO_OTEL_EXPORTER_TYPE) {
   apolloOpenTelemetry  = new ApolloOpenTelemetry({
    type: 'router',
    name: 'router',
    exporter: {
      type: process.env.APOLLO_OTEL_EXPORTER_TYPE, // console, zipkin, collector
      host: process.env.APOLLO_OTEL_EXPORTER_HOST,
      port: process.env.APOLLO_OTEL_EXPORTER_PORT,
    }
  }).setupInstrumentation();
}

export default apolloOpenTelemetry;