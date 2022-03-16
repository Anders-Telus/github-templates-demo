import { gql } from 'apollo-server';
const customerTypeDefs = gql`
scalar DateTime

  type Customer {
    _id: ID!
    id: String
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
    me: [Customer]
    allCustomers: [Customer]
    customer(id: ID!): Customer
  }

  input CustomerInput {
    id: String
    name: String
    status: String
    href: String
    statusReason: String
  }

  
  type Mutation {
    addCustomer(customer: CustomerInput!): Customer
    deleteCustomerById(id: String): String
  }
`;

export default customerTypeDefs;