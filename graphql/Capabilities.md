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

- This project uses examples via our server, mutation and typedef files.
We demonstrate this via apollo gateway and apollo server via our router.js and server.js files.

## Request and Response types

- in our application we get bad or valid responses depending what type of query we are serving.

for example this query for customers

```code
{
  "data": {
    "allCustomers": [
      {
        "name": "John"
      },
      {
        "name": "Bob"
      }
    ]
  }
}
```

- you can also get a bad response

```code
{
  "errors": [
    {
      "message": "Field \"name\" argument \"id\" of type \"ID!\" is required but not provided.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ]
    }
  ]
}
```

## Federation between sub-graphs and super-graph

- subgraphs are shown in all schema.js files

- please look at supergraph.graphql for future implemenation

[SuperGraph](https://www.apollographql.com/docs/studio/federated-graphs/)

## Unit Tests

- We are using the built in tool with apollo please see here for the reference

- Please look at all __test__ folders for our unit testing implementation
[Apollo testing](https://www.apollographql.com/docs/apollo-server/testing/mocking)

## Integration Tests

- Please see the reference here
- Please see any integration.test.js files for any implemenation.

[Integration tests](https://www.apollographql.com/docs/apollo-server/testing/testing)

## E2E Tests

- Please see the reference here
- We are currently under development and will address this later in future sprints

[E2E](https://www.apollographql.com/docs/apollo-server/testing/testing#end-to-end-testing)

## Data Sources

[Apollo Datasources](https://www.apollographql.com/docs/apollo-server/data/data-sources)

- We will add this in future releases.

## RestDataSource

[RestDataSource](https://www.apollographql.com/docs/apollo-server/data/data-sources#restdatasource-reference)

- We will add this in our future releases.


## MongoDataSource

[To connect with Mongo Databases](https://github.com/GraphQLGuide/apollo-datasource-mongodb/)

- Our application uses mongodatasources for all of the graphql -> mongodb middle wear.

## Authentication and Authorization

[Authorization](https://www.apollographql.com/docs/apollo-server/security/authentication)

- We will add this in our future releases.

## Tracing and Monitoring

[Tracing and Monitoring](https://www.apollographql.com/docs/apollo-server/monitoring/metrics)

- We will add this in our future releases.
