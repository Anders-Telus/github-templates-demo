# GraphQL

GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system that you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. 

## What is a SuperGraph?

A [federated](https://www.apollographql.com/docs/studio/federated-graphs/) graph (also known as a supergraph) is a graph that’s composed of multiple individual subgraphs.

### Why use the supergraph?

Our purpose is to demonstrate the use of multiple subgraghs in one url route for our POC example. We can now use data from all over the world and stich it together in one place.

### How we implemented the supergraph

Our current application example is:
[SuperGraph](https://github.com/telus/reference-application-poc/blob/main/graphql/supergraph.graphql#L14)

[`http://localhost:4000/`](http://localhost:4000/)

## What is a subgraph?

By having one graph, you maximize the value of GraphQL:

- More data and services can be accessed from a single query.
- Code, queries, skills, and experience are portable across teams.
- One central catalog of all available data that all graph users can look to.
- Implementation cost is minimized, because graph implementation work isn't duplicated.
- Central management of the graph becomes possible – for example, unified access control policies.

### Why use the subgraph?

We want to show how different teams in Telus can easily talk to one another for our use case. 

### How we implemented the subgraph

To start the project please visit how inorder to view this example subgraphs here: [How to start the subgraph server](#how-to-run-subgraphs-and-mongo)

[How to start a sub graph](https://github.com/telus/reference-application-poc/blob/main/graphql/subgraphs/tmf666-account-gql/src/server.js#L55)

- The tmf629customer graph for our example is located here: [`http://localhost:4001/`](http://localhost:4001/)
- The tmf666-account graph is located here: [`http://localhost:4000/`](http://localhost:4000/)

## Graphql application breakdown

### Why use E2E tests?

Listed below are the reasons why we use E2E tests versus unit tests:

1. This project has two tech stacks, such as Graphql and MongoDB.
2. Integration tests are better suited for this POC due to tightly complex code with mongo db. We are using V3 of the Apollo Federation, and  we have an example with the latest way to use integration tests via their recomended documentation here: graphql -> router -> router.test.js file.

However, with the subgraphs due to MongoDB, and certain npm dependencies, we are going to revist the recommended approach as we did things slightly differently via these two subgraphs listed below.

Any future features are outlined in our [Future Features To Do](#future-features-to-do) list, below.

### What is a data source?

For details, please refer to this [data source article](https://www.apollographql.com/docs/apollo-server/data/data-sources/) and this [data source example](https://github.com/telus/reference-application-poc/blob/main/graphql/subgraphs/tmf629-customer-gql/src/services/customer/datasources/mongoDB/_model.js#L3).

### What is a typeDefs?

[Example TypeDef](https://github.com/telus/reference-application-poc/blob/main/graphql/subgraphs/tmf629-customer-gql/src/services/customer/typeDefs/schema.js#L46)

### Future features to do

- Subscriptions are unsupported, but planned for a future Gateway version.
- Look at fixing warnings and dependency issues for all package.json installs.(Internal Dependency bot)
- Update all unit tests to use the recommended approach.
- Add rest endpoints for examples via supergraph.
- Add Authentication examples via Kong.
- Update better error handling via the router and subgraphs.
- We upgraded to Apollo 3 and Federation 2, and because of that we need finish a few things.
- Any dependency that has conflicts has to be resolved and not forced.
- Apollo 3 deprecated alot of plugins in favor of rolling their own.
- Apollo Federation 2 has new features and lots of new goodies. However due to time and caping this POC, we will only take full advantage of it in the near future.
- Supergraph type checking needs to be improved and handled via human readable syntax vs leaving the end user confused.
- Here is the list of upgrades via their recommended stategy [Apollo Upgrade guide](https://www.apollographql.com/docs/apollo-server/migration).
- Best practice of [rover-cli](https://bestrustcrates.com/p/apollographqlrover/index.html).

