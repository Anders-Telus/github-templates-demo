
import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import buildCustomerSource from "./services/customer/datasources";
import errorBuilder from "./common/errorBuilder";
import customerLoad from "./services/customer/datasources/pre-load";
import customerTypeDefs from "./services/customer/typeDefs/schema.js";
import customerResolver from "./services/customer/resolvers/index";
import  { buildSubgraphSchema } from '@apollo/subgraph';
// Open Telemetry (optional)
import { ApolloOpenTelemetry } from "supergraph-demo-opentelemetry";

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

const port = process.env.APOLLO_PORT || 4001;
const db_username = process.env.DB_USERNAME || 'root';
const db_password = process.env.DB_PASSWORD || 'rootpassword';

(async () => {
    const mongoUri = `mongodb://${db_username}:${db_password}@mongodb:27017/admin`;
    console.log("mongo url: " + mongoUri);
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;
        await customerLoad.data(db);


        const server = new ApolloServer({
            schema: buildSubgraphSchema( [
                { typeDefs: customerTypeDefs, resolvers: customerResolver },
              ]),
            tracing: true,
            context: async ({ req }) => { },
            dataSources: () => ({
                ...buildCustomerSource.db(db),
            }),
            onHealthCheck: (customerTypeDefs) => {
                return new Promise((resolve, reject) => {
                    if (customerTypeDefs) {
                        resolve(); // reach health check using ${url}.well-known/apollo/server-health
                    } else {
                        reject();
                    }
                });
            },
            formatError: (err) => {

                switch(err.extensions.code) {
                  case "BAD_USER_INPUT":
                   return new Error("Please check your input");  
                  case "GRAPHQL_VALIDATION_FAILED":
                    return new Error("Your field is spelled incorrect please verify");
                  default:
                    return err;
                }
                // Don't give the specific errors to the client
                // Otherwise return the original error. The error can also
                // be manipulated in other ways, as long as it's returned
              },
        });
        server
            .listen({ port: port })
            .then(({ url }) => {
                console.log(`🚀 Customer subgraph ready at ${url}`);
                console.log("MongoDB connected!!");
            })
            .catch((err) => {
                console.error('Error in subgraph', err);
            });
    } catch (err) {
        console.log("Failed to connect to MongoDB", err);
    }
})();
