import appSchema from "./app.schema.js";

import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import buildCustomerSource from "./services/customer/datasources";
import errorBuilder from "./common/errorBuilder";
import customerLoad from "./services/customer/datasources/pre-load";

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

        const getError = (error) => {
            const errorMsg = errorBuilder(error);
            return errorMsg;
        };

        const server = new ApolloServer({
            schema: appSchema,
            tracing: true,
            context: async ({ req }) => { },
            dataSources: () => ({
                ...buildCustomerSource.db(db),
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
                console.log(`🚀 Customer subgraph ready at ${url}`);
                console.log("MongoDB connected!!");
            })
            .catch((err) => {
                console.error('Error in subgraph',err);
            });
    } catch (err) {
        console.log("Failed to connect to MongoDB", err);
    }
})();
