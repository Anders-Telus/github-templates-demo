# How to run Subgraphs Mongo and Docker

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

## Setting your Mongo Credentials

The reference application uses the follwing file to set your mongoDB credentials

```text
root directory config/.env.dev
```

## Where is the graphQl Page

After running the commands to start your instances you should be able to navigate to the following page
![Reference Application](https://github.com/telus/reference-application-poc/blob/main/graphql/subgraphs/images/graphQlPageSample.png)

## References

```link
https://www.apollographql.com/docs/apollo-server/v2/api/graphql-tools/
```

## Federation 2
```link
https://www.apollographql.com/blog/announcement/backend/announcing-federation-2/
```

- Gateway vs Router

 ```link
 https://www.apollographql.com/docs/router/ - Router
 ```

 ```link
 https://www.apollographql.com/docs/federation/gateway/
 ```

- Apollo

```link
https://www.apollographql.com/docs/federation/quickstart/
```

- federation 2

```link
https://www.apollographql.com/docs/federation/v2/
```

- Subgraphs

```link
https://www.apollographql.com/docs/federation/v2/subgraphs/
```

- Supergraph

```link
https://github.com/apollographql/supergraph-demo-fed2/blob/main/supergraph.graphql
```

- Directives

```link
https://www.apollographql.com/blog/graphql/directives/eusable-graphql-schema-directives/
```
