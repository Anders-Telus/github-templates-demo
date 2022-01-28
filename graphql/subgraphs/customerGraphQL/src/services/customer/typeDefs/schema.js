import { gql } from "graphql-modules";

const customerTypeDefs = gql`
scalar DateTime

  type Customer {
    id:ID!
    name: String
    status: String
    href: String
    statusReason: String
    characteristic: [Characteristic]
    creditProfile: [CreditProfile]
  }

  type Characteristic {
    name: String
    valueType: String
    value: String
  }

  type CreditProfile {
    creditProfileDate: DateTime
    creditRiskRating: Int
    creditScore: Int
    validFor: ValidFor
  }

  type ValidFor {
    endDateTime: DateTime
    startDateTime: DateTime
  }

  type Query {
    allCustomers: [Customer]
    customer(id: ID!): Customer
  }
`;

export default customerTypeDefs;