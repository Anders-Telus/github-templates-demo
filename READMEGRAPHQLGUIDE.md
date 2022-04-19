
# Introductory

```text
GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. 
```

## How to build Mongo and Graphql

```code
docker-compose --env-file ./config/.env.dev build
```

### How to get Docker to spin up all your graphs and Mongodb

```code
docker-compose --env-file ./config/.env.dev up
```

### How to stop all Docker containers running

```code
docker-compose --env-file ./config/.env.dev down
```

## Overview of Supergraph and Subgraph

### What is a SuperGraph?

A federated graph (also known as a supergraph ) is a graph that’s composed of multiple individual subgraphs:

- The Example supergraph in this  project is located below

### Why did we choose to use the super graph

For POC example purposes we wanted to demonstrate the use of multiple subgraghs in one url route.

We can now use data from all over the world and stich it together in one place.

### How did we implement the supergraph?

Our current application example:

[SuperGraph]https://github.com/telus/reference-application-poc/blob/main/graphql/supergraph.graphql#L14)

```text
http://localhost:4000/
```

Offical Documentation:

[SuperGraph](https://www.apollographql.com/docs/studio/federated-graphs/)

### What is a subgraph ?

```text
By having one graph, you maximize the value of GraphQL:

More data and services can be accessed from a single query
Code, queries, skills, and experience are portable across teams
One central catalog of all available data that all graph users can look to
Implementation cost is minimized, because graph implementation work isn't duplicated
Central management of the graph – for example, unified access control policies – becomes possible
```

### Why Did we use the subgraph?

- for our use case we want to show how different teams in Telus can easily talk to one another. 

### How did we implement a subgraph ?

Please visit how to start the project inorder to view this example subgraphs here  [How to start the subgraph server](#how-to-run-subgraphs-and-mongo)
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

- Best practice of [rover-cli](https://bestrustcrates.com/p/apollographqlrover/index.html)
