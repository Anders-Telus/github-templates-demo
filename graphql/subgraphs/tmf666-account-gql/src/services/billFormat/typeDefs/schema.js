import { gql } from 'apollo-server';

  const billFormatTypeDefs = gql`
  
  type BillFormat @key(fields: "id") {
    _id: ID!
    id: String!
    name: String!
    description: String
    href: String
  }

  extend type Account {
    id: ID! @external
    billFormat: [BillFormat]
}

  extend type Query {
    billFormat(id: ID!): BillFormat
    allBillFormats: [BillFormat]
  }
  input BillFormatInput {
    id: String!
    name: String!
    description: String
    href: String
  }

  extend type Mutation {
    addBillFormat(billFormat: BillFormatInput!): BillFormat
    deleteBillFormatById(id: String): String
  }`;

export default billFormatTypeDefs;