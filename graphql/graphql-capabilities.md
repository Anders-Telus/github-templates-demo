# GraphQL

This section explains what are the Capabilties this PoC application brings to the table

## Capabilities

Listed below are the capabilities can be referred here:

1. [Folder structure](#Folder-structure)
2. [Error handling](#Error-handling)
3. Recommended [Request input & Response types](#Request-and-Response-types)
4. Recommended [Federation](#Federation-between-sub-graphs-and-super-graph) between various sub-graphs and the super-graph
5. [Unit Tests](#Unit-tests)
6. [Integration Tests](#Integration-Tests)
7. [E2E Tests](#E2E-Tests)
8. [DataSources](#Data-Sources) - to connect various Data Sources like REST endpoints, Mongo Databases, SQL DBs etc., from subgraphs
9. [Authentication & Authorization](#Authentication-and-Authorization)
10. [Tracing & Monitoring](#Tracing-and-Monitoring) - OpenTelemetry or any other options

## Folder structure

- Graphql -> subgraphs -> tmf629-customer-gql -> src -> sevices

### Datasources

- We have seperated our backend which is mongodb in this project with the following structure

1. datasources -> mongodb -> _model.js
   1. Which is numbered_model.js  uses the mongodatasources from
   2. this allows us to bind all the collections to easily connect them at any time.

2. datasources  -> mongodb -> _schema.js
   1. mongodb/ mongoose allows use to create a typed  collection interface for our new model

3. datasources  -> mongodb -> index.js

   1. this file allows us to bind the colletion to a db for further data manipulation

4. datasources -> index.js
   1. we bind this to create our finalized datasource once we bind this to our apollo datasources.

   see the Apollo section here (TODO)

5. datasources -> pre-load.js

    1. we can initialize some prep work to ensure data is cleaned and inserted corretly. Note this may not apply to every project as this is a poc

6. datasources  -> mongodb -> seed.js

- we can prepopulate data for the db.

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
    1. We can add a nice way to seperate the file for querys, mutations and subscriptions
 2. resolvers -> mutation
    1. Mutations are CRUD operation for Graphql
 3. resolvers -> query
    1. Querys are where you can bind your typedefs and query your data
    2. See what is querys here(TODO)

### Typedefs

 1. typedefs -> schema.js
    1. A schema is used to define your graphql model see more information here(TODO)

## Error handling

- Please refer to this link
[Apollo Server error types](https://www.apollographql.com/docs/react/data/error-handling/)

- please see our implementation here -> graphql -> router -> router.js[commitforerror](https://github.com/telus/reference-application-poc/commit/87c60fa8a5736450d45a48a49ae7b1e590ae98c2)

## Request and Response types

[Apollo types](https://www.apollographql.com/docs/apollo-server/schema/schema/)

-please see our implementation here [example](https://github.com/telus/reference-application-poc/blob/feature/AG-41/graphql/subgraphs/tmf629-customer-gql/src/services/customer/typeDefs/schema.js#L53-L54)

## Federation between sub-graphs and super-graph

- We are currently using the gateway to connect our subgraphs together

[SuperGraph](https://www.apollographql.com/docs/studio/federated-graphs/)

-Please see our example here [SuperGraph](https://github.com/telus/reference-application-poc/blob/feature/AG-41/graphql/supergraph.graphql#L14)

## Unit Tests

### What are unit tests?

Mocked data and functionality for different scenarios.

### Why did we not use unit tests?

Most of our code base is tightly coupled with mongodb. As such we are using integration tests atm.

### How they are achieved?

- We are using the built in tool with apollo please see here for the reference

[Apollo testing](https://www.apollographql.com/docs/apollo-server/testing/mocking)

## Integration Tests

### What are integration tests?

-Apollo Server uses a multi-step request pipeline to validate and execute incoming GraphQL operations. This pipeline supports integration with custom plugins at each step, which can affect an operation's execution. Because of this, it's important to perform integration tests with a variety of operations to ensure your request pipeline works as expected.

### Why did we not choose integration tests?

With the combination of Graphql and mongo db and integration test proves how to mock things and not get the real data.

### How did we achive this?

- Please see our feature todo list via the readmegraphqlguide

[Integration tests](https://www.apollographql.com/docs/apollo-server/testing/testing)

## E2E Tests

### What are E2E tests?

```text
Instead of bypassing the HTTP layer, you might want to fully run your server and test it with a real HTTP client. Apollo Server doesn't provide built-in support for this at this time.

You can run operations against your server using a combination of any HTTP or GraphQL client such as supertest or Apollo Client's HTTP Link . There are also community packages available such as apollo-server-integration-testing, which uses mocked Express request and response objects.
```

### Why did we choose this route?

-Based on our POC we are actually using Graphql and MongoDb. E2E shows us the end to end real life problem we are solving

### How did we acheive this?

- Please see the example for our POC here

[E2EExample](https://github.com/telus/reference-application-poc/blob/feature/AG-41/graphql/router/router.test.js#L1-L96)

Documentation for apollo server

[E2E](https://www.apollographql.com/docs/apollo-server/testing/testing#end-to-end-testing)

## Data Sources

### What are Data sources?

```text
Data sources are classes that Apollo Server can use to encapsulate fetching data from a particular source, such as a database or a REST API. These classes help handle caching, deduplication, and errors while resolving operations.

Your server can use any number of different data sources. You don't have to use data sources to fetch data, but they're strongly recommended.
```

### Why are we using this?

- in our POC we are using [Mongodbdatasource](https://github.com/GraphQLGuide/apollo-datasource-mongodb/)

- this allows us to tightly couple graphql queries and mongodb resolvers all at the same time

### How did we use this feature?

- [MongoDB DatasourcePOC Example](https://github.com/telus/reference-application-poc/blob/feature/AG-41/graphql/subgraphs/tmf629-customer-gql/src/services/customer/datasources/mongoDB/_model.js#L3)

Offical documentation

- [Apollo Datasources](https://www.apollographql.com/docs/apollo-server/data/data-sources)

## RestDataSource

### What is a rest datasource?

```text
You then extend the RESTDataSource class and implement whatever data-fetching methods your resolvers need. These methods can use built-in convenience methods (like get and post) to perform HTTP requests, helping you add query parameters, parse JSON results, and handle errors.
```

### Why would this benificial?

- please read the documentation as they explain all the bells and whitles you can use with this feature

[RestDataSource](https://www.apollographql.com/docs/apollo-server/data/data-sources#restdatasource-reference)

## MongoDataSource

### What is a mongo data source?

- if you ever needed a beautiful way to connect your graphql resolvers and mongodb quries, this is the perfect feature to quickly access your dataset in the graphql layer.

### Why would you use this feature?

- Graphql and MongoDB are very unique beasts. However apollo server has a built in wrapper to allow the two to talk to each other.

### How was this achived ?

- please see our implementaion here [mongo db example](https://github.com/telus/reference-application-poc/blob/feature/AG-41/graphql/subgraphs/tmf629-customer-gql/src/services/customer/datasources/mongoDB/_model.js#L3)

Offical Documentation

- [To connect with Mongo Databases](https://github.com/GraphQLGuide/apollo-datasource-mongodb/)

## Authentication and Authorization

### What is Authentication and Authorization?

```text

Your GraphQL API probably needs to control which users can see and interact with the various data it provides.

Authentication is determining whether a given user is logged in, and subsequently determining which user someone is.
Authorization is then determining what a given user has permission to do or see.
```

### Why would you use this ?

- Before we can correctly control access to data, we have to authenticate a user. There are many patterns for providing authentication credentials, including HTTP headers and JSON web tokens.

### How would we use this?

- In our current POC we are adding this to a future feature list located in readmegraphqlguide.

Offical Documentation

[Authorization](https://www.apollographql.com/docs/apollo-server/security/authentication)

## Tracing and Monitoring

### What is Tracing and Monitoring?

```text
OpenTelemetry is a collection of open-source tools for generating and processing telemetry data (such as logs and metrics) from different systems in a generic, consistent way.

You can configure your gateway, your individual subgraphs, or even a monolothic Apollo Server instance to emit telemetry related to processing GraphQL operations.
```

### Why are we using this in our application?

When we are dealing with large amounts of data we need a smart way to capture this via our subgraphs

### How are we using this?

Please see our example here.

[ExampleWithopentelementary](https://github.com/telus/reference-application-poc/blob/feature/AG-41-updateddocumentation/graphql/router/router.js#L38)

Offical Documentation

[Tracing and Monitoring](https://www.apollographql.com/docs/apollo-server/monitoring/metrics)
