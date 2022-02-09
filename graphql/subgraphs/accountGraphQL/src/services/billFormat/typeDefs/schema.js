import { gql } from "graphql-modules";

const billFormatTypeDefs = gql`
  type BillFormat {
    _id: ID!
    id: String!
    name: String!
    description: String
    href: String
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
  }
`;

export default billFormatTypeDefs;
