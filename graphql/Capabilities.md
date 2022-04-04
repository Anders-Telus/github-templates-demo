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

## Request and Response types

[Apollo types](https://www.apollographql.com/docs/apollo-server/schema/schema/)

## Federation between sub-graphs and super-graph

- We are currently using the gateway to connect our subgraphs together

[SuperGraph](https://www.apollographql.com/docs/studio/federated-graphs/)

## Unit Tests

- We are using the built in tool with apollo please see here for the reference

[Apollo testing](https://www.apollographql.com/docs/apollo-server/testing/mocking)

## Integration Tests

- Please see the reference here

[Integration tests](https://www.apollographql.com/docs/apollo-server/testing/testing)

## E2E Tests

- Please see the reference here

[E2E](https://www.apollographql.com/docs/apollo-server/testing/testing#end-to-end-testing)

## Data Sources

[Apollo Datasources](https://www.apollographql.com/docs/apollo-server/data/data-sources)

## RestDataSource

[RestDataSource](https://www.apollographql.com/docs/apollo-server/data/data-sources#restdatasource-reference)

## MongoDataSource

[To connect with Mongo Databases](https://github.com/GraphQLGuide/apollo-datasource-mongodb/)

## Authentication and Authorization

[Authorization](https://www.apollographql.com/docs/apollo-server/security/authentication)

## Tracing and Monitoring

[Tracing and Monitoring](https://www.apollographql.com/docs/apollo-server/monitoring/metrics)

