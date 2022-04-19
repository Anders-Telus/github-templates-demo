# Prerequisites

- Docker
- Docker Compose

## How to run Subgraphs, Mongo and Docker

How to build Mongo and Graphql

```code
docker-compose --env-file ./config/.env.dev build
```

How to get Docker to spin up all your graphs and Mongodb

```code
docker-compose --env-file ./config/.env.dev up
```

How to stop all Docker containers running

```code
docker-compose --env-file ./config/.env.dev down
```

## Overview of Supergraph and Subgraph

- Once you the above steps were completed successfully go to the following link

- What is a SuperGraph

[SuperGraph]https://github.com/telus/reference-application-poc/blob/main/graphql/supergraph.graphql#L14)

- What is a super graph?

[SuperGraph](https://www.apollographql.com/docs/studio/federated-graphs/)

- The Example supergraph in this  project is located below

```text
http://localhost:4000/
```

- What is a subgraph ?
[How to start a sub graph](https://github.com/telus/reference-application-poc/blob/main/graphql/subgraphs/tmf666-account-gql/src/server.js#L55)

- the tmf629customer graph for our example is located here

```text
http://localhost:4001/
```

- the tmf666-account graph is located here

```text
http://localhost:4000/
```

## Graphql application break down

### How to run E2E tests

First why did we use E2E tests vs unit tests. This project has a two tech stacks such as Graphql and mongo db.

For this POC integration tests are better suited due to tightly complex code with mongo db. Firstly. We are using V3 of the apollo federation. An example is located here graphql -> router -> router.test.js file we have an example with the latest way to use integration tests via their reccomended documentation.

However with the subgraphs due to mongo db and certain npm dependencies we are going to revist there recomendded approach as we slightly did things differently via these two subgraphs listed below.

Any future features are outline here via our [TODO list](#future-features-todo)

## How to run the example E2E tests

- First Run npm i via this folder

  ```text
  https://github.com/telus/reference-application-poc/tree/main/graphql/subgraphs/tmf629-customer-gql/src
  ```

- Use the following command to to activate E2E

```code
npm run test 
```

- To test the router please go to the following path

```text
/reference-application-poc/graphql/router
```

- You can find where the unit tests and integration test are found for customer

```text
https://github.com/telus/reference-application-poc/tree/main/graphql/subgraphs/tmf629-customer-gql/src__test__
```

```text
You can find where the unit tests and integration test are found for account
/Users/andreslind/Documents/clients/reference-application-poc/graphql/subgraphs/tmf629-account-gql/src/__test__
```

## Datasources what is a datasource

[Data source example](https://github.com/telus/reference-application-poc/blob/main/graphql/subgraphs/tmf629-customer-gql/src/services/customer/datasources/mongoDB/_model.js#L3)

## What is a Typedefs?

[Example TypeDef](https://github.com/telus/reference-application-poc/blob/main/graphql/subgraphs/tmf629-customer-gql/src/services/customer/typeDefs/schema.js#L46)

## Setting your Mongo Credentials

The reference application uses the follwing file to set your mongoDB credentials

```text
root directory config/.env.dev
```

### Clean up Guide

- use ./mongo-clean-up.sh to clean up old files for mongo db

### Future Features TODO

- Subscriptions are unsupported but planned for a future Gateway version

- Look at fixing warnings and dependency issues for all package.json installs.(Internal Dependency bot)

-Update all unit tests to use the recommended approach.

-Add rest endpoints for examples via supergraph

-Add Authentication examples via kong

-Update better error handeling via the router and subgraphs

-We upgraded to Apollo 3 and federation 2. Based on that we need finish  a few things.

- Any dependency that has conflicts has to be resolved and not forced.

- Apollo 3 deprecated alot of plugins in favor of rolling there own.

- Apollo Federation 2 has new features and lots of new goodies. However due to time and caping this POC we will take full advantage of its glory in the near future.

- Supergraph type checking needs to be improved and handled via human readable syntax vs leaving the end user confused.

- Here is the list of upgrades via there recommended stategy [Apollo Upgrade guide](https://www.apollographql.com/docs/apollo-server/migration)
