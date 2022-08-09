import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import buildBillFormatSource from "./services/billFormat/datasources";
import buildAccountSource from "./services/account/datasources";
import buildBillCycleSource from "./services/billCycle/datasources";
import billFormatLoad from "./services/billFormat/datasources/pre-load";
import billCycleLoad from "./services/billCycle/datasources/pre-load";
import accountLoad from "./services/account/datasources/pre-load";
import billCycleResolver from "./services/billCycle/resolvers/index.js";
import billFormatResolver from "./services/billFormat/resolvers/index.js";
import accountResolver from "./services/account/resolvers/index.js";
import { buildSubgraphSchema } from "@apollo/subgraph";

// Open Telemetry (optional)
import { ApolloOpenTelemetry } from "supergraph-demo-opentelemetry";
import billCycleTypeDefs from "./services/billCycle/typeDefs/schema";
import billFormatTypeDefs from "./services/billFormat/typeDefs/schema";
import accountTypeDefs from "./services/account/typeDefs/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

if (process.env.APOLLO_OTEL_EXPORTER_TYPE) {
  new ApolloOpenTelemetry({
    type: "subgraph",
    name: "account",
    exporter: {
      type: process.env.APOLLO_OTEL_EXPORTER_TYPE, // console, zipkin, collector
      host: process.env.APOLLO_OTEL_EXPORTER_HOST,
      port: process.env.APOLLO_OTEL_EXPORTER_PORT,
    },
  }).setupInstrumentation();
}

const port = process.env.APOLLO_PORT || 4000;
//

const accounts = [
  {
    id: "1",
    name: "WirelessBillAccount",
    accountType: "Wireless",
    description: "WirelessTesting",
    href: "",
    billCycleID: "111",
    billFormatID: "101",
    customerID: "1",
    billCycle: "",
    billFormat:""
  },
  {
    id: "2",
    name: "InternetBillAccount",
    accountType: "Internet",
    description: "InternetTesting",
    href: "",
    billCycleID: "222",
    billFormatID: "201",
    customerID: "2",
    billCycle: "",
    billFormat:""
  }
]

const accountQuery = {
  // account: (_, { id }, { context }) => {
  //   return dataSources.Account.loadAccount(id)
  // },
  allAccounts: async (arg,context)=> {
    try {
      const accountModel = accounts.find({})
        .clone()
        .catch((err) => {
          console.log(err)
        })
      return accountModel
    } catch (error) {
      console.log(`Account error :: ${error}`)
      return error
    }
  }
}

// const billCycles = [
//   {
//     id: "1",
//     billingDateShift: 12,
//     billingPeriod: "NET 1",
//     paymentDueDateOffset: 20,
//     mailingDateOffset: 2,
//     name: "Bond",
//     chargeDateOffset: 15,
//     creditDateOffset: 10,
//     description: "testing",
//     frequency: "N/A",
//     href: "www.test.com",
//     validFor: {
//       endDateTime: "2020-12-31",
//       startDateTime: "2020-12-31"
//     },
//   },
//   {
//     id: "2",
//     billingDateShift: 12,
//     billingPeriod: "NET 2",
//     paymentDueDateOffset: 20,
//     mailingDateOffset: 2,
//     name: "Anders",
//     chargeDateOffset: 15,
//     creditDateOffset: 10,
//     description: "testing",
//     frequency: "N/A",
//     href: "www.test.com",
//     validFor: {
//       endDateTime: 0,
//       startDateTime: 0
//     },
//   },
//   {
//     id: "3",
//     billingDateShift: 12,
//     billingPeriod: "NET 3",
//     paymentDueDateOffset: 20,
//     mailingDateOffset: 2,
//     name: "Bond",
//     chargeDateOffset: 15,
//     creditDateOffset: 10,
//     description: "testing",
//     frequency: "N/A",
//     href: "www.test.com",
//     validFor: {
//       endDateTime: "2022-12-17T22:00:36.136+08:00",
//       startDateTime: "2022-12-17T22:00:36.136+08:00"
//     },
//   }
// ];
// const billCycleQuery = {
//   billCycle: (parent, { id }, { dataSources: { BillCycle } }) => BillCycle.loadBillCycle(id),
//   allBillCycles: (_, __, { dataSources: { BillCycle } }) => BillCycle.allBillCycles(),
//   __resolveReference: (reference) => {
//     return BillCycle.find((u) => u.id == reference.id)
//   }
// }

// const billFormats = [
//   { id: "1", name: "IT", description: "IT Billing Format", href: "" },
//   { id: "2", name: "Digital", description: "Digital Billing Format", href: "" },
//   { id: "3", name: "Wireless", description: "Wireless Billing Format", href: "" },
//   { id: "3", name: "Health", description: "Health Billing Format", href: "" }

// ];


(async () => {
  try {
    const stitchedSchema = mergeTypeDefs([
      accountTypeDefs,
      // billCycleTypeDefs,
      // billFormatTypeDefs,
    ]);

    const newResolvers = mergeResolvers([
      accountQuery,
      // billCycleResolver,
      // billFormatResolver,
    ]);
    const server = new ApolloServer({
      schema: buildSubgraphSchema([
        { typeDefs: stitchedSchema, resolvers: newResolvers },
      ]),
      tracing: true,
      context: async ({ req }) => {},
      formatError: (err) => {
        switch (err.extensions.code) {
          case "BAD_USER_INPUT":
            return new Error("Please check your input");
          case "GRAPHQL_VALIDATION_FAILED":
            return new Error("Your field is spelled incorrectly please verify");
          case " INTERNAL_SERVER_ERROR":
            return new Error("Server Error");

          default:
            return err;
        }
        // Don't give the specific errors to the client
        // Otherwise return the original error. The error can also
        // be manipulated in other ways, as long as it's returned
      },
      onHealthCheck: (typeDefs) => {
        return new Promise((resolve, reject) => {
          if (typeDefs) {
            resolve(); // reach health check using ${url}.well-known/apollo/server-health
          } else {
            reject();
          }
        });
      },
    });
    server
      .listen({ port: port })
      .then(({ url }) => {
        console.log(`🚀 New Account subgraph ready at ${url}`);
        console.log("MongoDB connected!!");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
})();
