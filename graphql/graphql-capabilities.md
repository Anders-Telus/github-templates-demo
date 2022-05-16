# GraphQl Capabilities

This document explains what capabilities the Reference Application PoC application brings to the reference-application-poc.

Listed below are the capabilities:

1. [GraphQL](#graphql)
2. [Error handling](#error-handling)
3. [Request input and Response types](#request-input-and-response-types) - Recommended
4. [Federation between subgraphs and supergraph](#federation-between-subgraphs-and-supergraph) - Recommended
5. [Testing](#testing)
6. [E2E Tests](#e2e-tests)
7. [Data Sources](#data-sources) - to connect various Data Sources like REST endpoints, Mongo Databases, SQL DBs etc., from subgraphs
8. [Authentication and Authorization](#authentication-and-authorization)
9. [Tracing and Monitoring](#tracing-and-monitoring) - OpenTelemetry or any other options

## GraphQL

GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. After a GraphQL service is running (typically at a URL on a web service), it can receive GraphQL queries to validate and execute. The service first checks a query to ensure it only refers to the types and fields defined, and then runs the provided functions to produce a result.

### Folder structure

The two major components of the graphql folder are the router folder and the subgraph folder.

#### Router folder

The router folder is a very important folder as it allows us to merge our subgraphs together via a product called Apollo Federation, a powerful open-source architecture. With federation, you can create a unified supergraph that combines multiple GraphQL APIs, and share ownership of your supergraph across any number of teams.

![image](https://user-images.githubusercontent.com/94395908/166473675-56e26797-7d07-4e0e-8699-5ffd85519199.png)

Below are the three core technologies that we use to put our router together.

1. [ApolloGateway](https://www.apollographql.com/docs/federation/api/apollo-gateway/)
2. [ApolloServer](https://www.apollographql.com/docs/apollo-server/)
3. [ApolloOpenTelemetry](https://www.apollographql.com/docs/federation/opentelemetry/)

Please read up on the topics before proceeding, as the following sections will be going deeper into the subject matter.

#### Subgraph folder

In a federated architecture, individual GraphQL APIs are called **subgraphs**, and they are composed into a **supergraph**. By querying your supergraph, clients can query all of your subgraphs at the same time. This allows users to create, update and retrieve Service Orders, and manages related notifications. A service order will describe a list of service order items. A service order item references an action on an existing or future service.

`tmf629-customer-qql` and `tmf629-account-qql` are mock versions of what true customer data looks like.

## Error Handling

In the reference application we are showcasing where you can trigger errors in the apolloserver instances.

### Federation graph error handling

When Apollo Server encounters errors while processing a GraphQL operation, its response to the client includes an `errors` array that contains each error that occurred. To fully understand how errors are handled please refer to this link: [Apollo Server error types](https://www.apollographql.com/docs/apollo-server/data/errors/)

#### Example 1 - federation error handling via the router

- The end user will not see the federation graph errors.
- The developer will need to look at the console to see the hidden errors.
- Things are a bit different in subgraphs.

Please see this code reference:
[router error handling example](https://github.com/telus/reference-application-poc/blob/main/graphql/router/router.js#L39)

### Subgraph error handling

Subgraph error handling is a bit more flexible in regards to actually showing an error. You can traverse throuh the the errors via the error response code that is demonstrated here:
[subgraph error example](https://github.com/telus/reference-application-poc/blob/main/graphql/subgraphs/tmf666-account-gql/src/server.js#L59)

There are also some feature items to add a master error class to appropriatly handle programmer error repsonses into human readable errors.

### Datasources

We have separated our backend, which is mongodb in this project, with the following structure:

1. datasources -> mongodb -> _model.js
   1. This is numbered_model.js which uses the mongodatasources from
   2. This allows us to bind all of the collections to easily connect them at any time.

2. datasources -> mongodb -> _schema.js
   1. mongodb / mongoose allows us to create a typed collection interface for our new model.

3. datasources -> mongodb -> index.js
   1. This file allows us to bind the collection to a db for further data manipulation.

4. datasources -> index.js
   1. Once we bind this to our apollo datasources we will bind this to create our finalized datasource.

   See the Apollo section here: (TODO)

5. datasources -> pre-load.js
    1. We can initialize some prep work to ensure the data is cleaned and inserted correctly. Note that this may not apply to every project as this reference application is a poc.

6. datasources -> mongodb -> seed.js
   1. We can prepopulate data for the db using the code below.

 ``` code
 import { MongoDataSource } from 'apollo-datasource-mongo';
 export default class Customer extends MongoDataSource {
    initialize(config) {
        super.initialize({
            ...config,
            debug: true,
        });
    }
    getCustomer(customerId) {
        try {
            return this.Customer.loadOneById(customerId);
        } catch (error) {
            console.log(`---------> customer error -------------->  :: ${error}`);
            return error;
        }
    }

    saveCustomer(data) {
        try {
            const customer = new this.Customer(data);
            return customer.save();
        } catch (error) {
            console.log(`---------> customer save error -------------->  :: ${error}`);
            return error;
        }
    }

    allCustomers() {
        try {
            return this.Customer.find({}).clone().catch(function(err){ console.log(err)});
        } catch (error) {
            console.log(`allCustomer error :: ${error}`);
            return error;
        }
    }

    deleteCustomerbyId(id) {
        try {
          return this.Customer.deleteOne(id).catch((err)=> {return err})
        } catch (err) {
          console.log(err)
        }
      }
}
 ```

### Resolvers

 1. resolvers -> index.js
    1. We can add a nice way to seperate the file for querys, mutations and subscriptions.
 2. resolvers -> mutation
    1. Mutations are the CRUD operation for Graphql.
 3. resolvers -> query
    1. Querys are where you can bind your typedefs and query your data.
    2. See what querys are here: (TODO)

### Typedefs

 1. typedefs -> schema.js
    1. A schema is used to define your graphql model. See more information here: (TODO)

## Request input and Response types

Every GraphQL server (including Apollo Server) uses a schema to define the structure of data that clients can query. This article describes the fundamental building blocks of a schema and how to create one for your GraphQL server:
[Apollo types](https://www.apollographql.com/docs/apollo-server/schema/schema/)

Here is an [example](https://github.com/telus/reference-application-poc/blob/feature/AG-41/graphql/subgraphs/tmf629-customer-gql/src/services/customer/typeDefs/schema.js#L53-L54) of our implementation.

## Federation between subgraphs and supergraph

A federated graph / [supergraph](https://www.apollographql.com/docs/studio/federated-graphs/) is composed of multiple individual subgraphs.

We are currently using the gateway to connect our subgraphs together, as shown in this [supergraph](https://github.com/telus/reference-application-poc/blob/feature/AG-41/graphql/supergraph.graphql#L14) example.

## Testing

- [Unit tests](#unit-tests)
- [Integration tests](#integration-tests)
- [E2E Tests](#e2e-tests)

### Unit Tests

Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. The unit tests are mocking data and functionality for different scenarios.

#### Why we did not use unit tests

Most of the code base is tightly coupled with mongodb, therefore we are using integration tests at the moment.

#### How this was achieved

For the reference application we are using the built in [Apollo](https://www.apollographql.com/docs/apollo-server/testing/mocking) testing tool.

### Integration Tests

Integration testing is the process of testing the interface between two software units or module. It's focus on determining the correctness of the interface. The purpose of the integration testing is to expose faults in the interaction between integrated units.

Apollo Server uses a multi-step request pipeline to validate and execute incoming GraphQL operations. This pipeline supports integration with custom plugins at each step, which can affect an operation's execution. Because of this, it's important to perform integration tests with a variety of operations, to ensure your request pipeline works as expected.

#### Why we did not choose integration tests

With the combination of Graphql and mongodb, integration testing proved how to mock things and not get the real data.

#### How this was achieved

See our feature todo list via the readmegraphqlguide. Please see this [integration testing](https://www.apollographql.com/docs/apollo-server/testing/testing) article for details about integration testing with Apollo Server.

### E2E Tests

End-to-end (E2E) testing is a methodology used in the software development lifecycle (SDLC) to test the functionality and performance of an application under product-like circumstances and data to replicate live settings. The goal is to simulate what a real user scenario looks like from start to finish.

#### Why we chose this route

Instead of bypassing the HTTP layer, you might want to fully run your server and test it with a real HTTP client. However, at this time Apollo Server doesn't provide built-in support for this.

You can run operations against your server using a combination of any HTTP or GraphQL client, such as supertest or Apollo Client's HTTP Link. There are also community packages available, such as apollo-server-integration-testing, which uses mocked Express request and response objects.

Based on our reference-application-poc we are actually using Graphql and MongoDb. E2E shows us the end to end real life problems we are solving.

#### How this was achieved

- Here is the [E2E example](https://github.com/telus/reference-application-poc/blob/feature/AG-41/graphql/router/router.test.js#L1-L96) for our POC.
- Here is [E2E](https://www.apollographql.com/docs/apollo-server/testing/testing#end-to-end-testing) documentation for Apollo Server.

## Data Sources

Data sources are classes that Apollo Server can use to encapsulate fetching data from a particular source, such as a database or a REST API. These classes help handle caching, duplication, and errors while resolving operations.

Your server can use any number of different data sources. You don't have to use data sources to fetch data, but they are strongly recommended.

### Why we are using Apollo data source for MongoDB

We are using [MongoDB data source](https://github.com/GraphQLGuide/apollo-datasource-mongodb/) in our POC. This allows us to tightly couple graphql queries and mongoDB resolvers at the same time.

### How we use this feature

For details see this [MongoDB data source example](https://github.com/telus/reference-application-poc/blob/feature/AG-41/graphql/subgraphs/tmf629-customer-gql/src/services/customer/datasources/mongoDB/_model.js#L3) in the reference architecture POC. You can also refer to this [Apollo Data sources](https://www.apollographql.com/docs/apollo-server/data/data-sources) article.

### RestDataSource

The `RESTDataSource` abstract class helps you fetch data from REST APIs. Your server defines a separate subclass of `RESTDataSource` for each REST API it communicates with.

To get started, you should install the `apollo-datasource-rest package`. You can then extend the RESTDataSource class and implement whatever data-fetching methods your resolvers need. These methods can use built-in convenience methods (like get and post) to perform HTTP requests, helping you add query parameters, parse JSON results, and handle errors.

#### Why this would be beneficial

The [RestDataSource](https://www.apollographql.com/docs/apollo-server/data/data-sources#restdatasource-reference)
documentation explains all the bells and whistles you can use with this feature.

### MongoDataSource

If you ever need a beautiful way to connect your graphql resolvers and mongodb quries, MongoDataSource is the perfect feature to quickly access your dataset in the graphql layer.

#### Why you would use this feature

Graphql and MongoDB are very unique tools, but apollo server has a built in wrapper to allow the two to talk to each other.

#### How this was achieved

You can see our implementation in this [mongo db example](https://github.com/telus/reference-application-poc/blob/feature/AG-41/graphql/subgraphs/tmf629-customer-gql/src/services/customer/datasources/mongoDB/_model.js#L3). You can also use this GraphQLGuide for details on [connecting with Mongo Databases](https://github.com/GraphQLGuide/apollo-datasource-mongodb/).

## Authentication and authorization

Your GraphQL API probably needs to control which users can see and interact with the various data it provides.

- **Authentication** is determining whether a given user is logged in, and subsequently determining which user someone is.
- **Authorization** is then determining what a given user has permission to do or see.

Please see this article for details about Apollo's [authentication and authorization](https://www.apollographql.com/docs/apollo-server/security/authentication).

### Why you would use this

We have to authenticate a user before we can correctly control access to data. There are many patterns for providing authentication credentials, including HTTP headers and JSON web tokens.

### How we would use this

In our current POC we are adding this to a future feature list located in readmegraphqlguide.

## Tracing and Monitoring

OpenTelemetry is a collection of open-source tools for generating and processing telemetry data (such as logs and metrics) from different systems in a generic, consistent way.

You can configure your gateway, your individual subgraphs, or even a monolothic Apollo Server instance to emit telemetry related to processing GraphQL operations.

### Why we are using this in our application

When we are dealing with large amounts of data, we need a smart way to capture this via our subgraphs.

### How we are using this

Please see our [example with OpenTelementry](https://github.com/telus/reference-application-poc/blob/feature/AG-41-updateddocumentation/graphql/router/router.js#L38). You can also refer to Apollo's [Metrics and logging](https://www.apollographql.com/docs/apollo-server/monitoring/metrics) article for more information about GraphQL performance data.
