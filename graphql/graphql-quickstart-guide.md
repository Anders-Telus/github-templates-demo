# Get started with GraphQL

This tutorial is meant to get you up and running with GraphQL for the reference-application-poc.

## Prerequisites

- Node 16

## Step 1: How to build Mongo and Graphql

```code
npm install
npm run start
```

## How to run E2E tests for the example

1. First Run npm i via this folder

  ```text
  https://github.com/telus/reference-application-poc/tree/main/graphql/subgraphs/tmf629-customer-gql/src
  ```

2. Use the following command to to activate E2E

```code
npm run test 
```

3. To test the router please go to this [folder](https://github.com/telus/reference-application-poc/tree/main/graphql/router).
4. The unit test and integration tests for customers are found in this [folder](https://github.com/telus/reference-application-poc/tree/main/graphql/subgraphs/tmf629-customer-gql/src/__test__).
5. The unit test and integration tests for accounts are found in this [folder](https://github.com/telus/reference-application-poc/tree/main/graphql/subgraphs/tmf666-account-gql/src/__test__).

## Setting your Mongo credentials

The reference application uses the `root directory config/.env.dev` file to set your mongoDB credentials.

### Cleaning up files

Use `./mongo-clean-up.sh` to clean up old files for MongoDB.
