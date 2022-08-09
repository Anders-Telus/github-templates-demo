import { gql } from "apollo-server"

const typeDefs = gql`
  type Account @key(fields: "id") {
    _id: String
    id: ID!
    name: String!
    accountType: String
    description: String
    href: String
  }

  input AccountInput {
    id: String!
    name: String!
    accountType: String
    description: String
    href: String
  }

  extend type Mutation {
    addAccount(account: AccountInput!): Account
    deleteAccount(id: String): String
  }

  extend type Query {
    account(id: ID!): Account
    allAccounts: [Account]
  }
`

export default typeDefs
