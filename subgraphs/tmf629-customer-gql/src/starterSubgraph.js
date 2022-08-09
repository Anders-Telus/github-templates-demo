
import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import buildCustomerSource from "./services/customer/datasources";
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


(async () => {

    try {


        const customers = [
            {
              id: 1,
              name: "John",
              status: 'Active',
              href: 'http://www.google.com',
              statusReason: 'Some reason',
              characteristic: [
                {
                  name: 'good',
                  valueType: 'newType',
                  value: 'new'
                }
              ],
              creditProfile: [
                {
                  creditProfileDate: '2021-10-15',
                  creditRiskRating: 5,
                  creditScore: 10,
                  validFor: {
                    endDateTime: '2021-12-31',
                    startDateTime: '2021-10-15'
                  }
                }
              ]
            },
            {
              id: 2,
              name: "Bob",
              status: 'Inactive',
              href: 'http://www.example.com',
              statusReason: 'Some other reason',
              characteristic: [
                {
                  name: 'better',
                  valueType: 'oldType',
                  value: 'old'
                }
              ],
              creditProfile: [
                {
                  creditProfileDate: '2020-10-15',
                  creditRiskRating: 4,
                  creditScore: 8,
                  validFor: {
                    endDateTime: '2020-12-31',
                    startDateTime: '2020-10-15'
                  }
                }
              ]
            }
          ]
          
    const customerResolvers = {
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

        const server = new ApolloServer({
            schema: buildSubgraphSchema( [
                { typeDefs: customerTypeDefs, resolvers: customerResolvers },
              ]),
            tracing: true,
            context: async ({ req }) => { },
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
              debugger;
                switch(err.extensions.code) {
                  case "BAD_USER_INPUT":
                   return new Error("Please check your input");  
                  case "GRAPHQL_VALIDATION_FAILED":
                    return new Error("Your field is spelled incorrectly please verify");
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
            //    console.log("MongoDB connected!!");
            })
            .catch((err) => {
                console.error('Error in subgraph', err);
            });
    } catch (err) {
        console.log("Failed to connect to MongoDB", err);
    }
})();
