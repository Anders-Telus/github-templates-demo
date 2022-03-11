
import { gql } from 'apollo-server';
 const billCycleTypeDefs = gql`

  scalar DateTime

  type ValidFor {
      endDateTime: DateTime
      startDateTime: DateTime
    }

   extend type Account {
    id: ID! @external
    billCycle: [BillCycle]
}
  
   type BillCycle @key(fields: "id") {
    billingDateShift: Int
    billingPeriod: String
    chargeDateOffset: Int
    creditDateOffset: Int
    description: String
    frequency: String
    href: String
    _id: ID!
    id: String
    mailingDateOffset: Int
    name: String
    paymentDueDateOffset: Int
    validFor: ValidFor
  }

  input BillCycleInput {
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
  }
  
 extend type Query {
        allBillCycles: [BillCycle]
        billCycle(id: ID!): BillCycle
      }

  type Mutation {
    addBillCycle(billCycle: BillCycleInput!): BillCycle
  }`;

export default billCycleTypeDefs;