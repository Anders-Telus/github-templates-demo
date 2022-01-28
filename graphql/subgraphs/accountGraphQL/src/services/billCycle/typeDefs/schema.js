import { gql } from "graphql-modules";

const billCycleTypeDefs = gql`
scalar DateTime
type ValidFor {
    endDateTime: DateTime
    startDateTime: DateTime
  }
  
  type BillCycle {
    billingDateShift: Int
    billingPeriod: String
    chargeDateOffset: Int
    creditDateOffset: Int
    description: String
    frequency: String
    href: String
    id: String
    mailingDateOffset: Int
    name: String
    paymentDueDateOffset: Int
    validFor: ValidFor
  }
  extend type Query {
        billCycle(id: ID!): BillCycle
      }
  `
   

export default billCycleTypeDefs;
