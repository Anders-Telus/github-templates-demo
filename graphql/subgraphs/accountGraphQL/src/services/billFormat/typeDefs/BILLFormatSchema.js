import { gql } from "graphql-modules";

const billFormatTypeDefs = gql`
  type BillFormat {
    _id: ID!
    id: String!
    name: String!
    description: String
    href: String
  }

  type Query {
    billFormat(id: ID!): BillFormat
  }
`;

export default billFormatTypeDefs;
