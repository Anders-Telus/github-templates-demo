# Reference Application

The reference-application-poc is a demo application which was developed by the Agora team.

For more information:

- Reach out to the Agora team on Slack at: #agora-project
- Follow the story at: <https://github.com/telus/reference-application/wiki>
- Discussions at: <https://github.com/telus/reference-application/discussions>

## High Level Architecture

![Reference Application](https://user-images.githubusercontent.com/1566236/137525278-8bed145b-ffb8-464a-b83f-ed724a502ad8.png)

## Structure

Bottom Up Approach:

1. TMF specifications
2. Prism mock server - REST endpoint
3. GraphQL layer
4. Micro frontend

### 1. TMF specifications

The TMF Service Layer is composed of:

- TMF 666 - Account Management
- TMF 629 - Customer Management
- TMF 632 - Party Management

#### *TMF 666 - Account Management*

This API provides a standardized mechanism for the management of billing and settlement accounts, as well as for financial accounting (account receivable) either in B2B or B2B2C contexts.

#### *TMF 629 - Customer Management*

This API provides a standardized mechanism for customer and customer account management, such as creation, update, retrieval, deletion and notification of events. Customer can be a person, an organization or another service provider who buys products from an enterprise.

#### *TMF 632 - Party Management*

This API provides a standardized mechanism for party management such as creation, update, retrieval, deletion and notification of events. Party can be an individual or an organization that has any kind of relation with the enterprise.

### 2. Prism mock server - REST endpoint

A mock server uses fake responses to imitate the response of a real server. By mocking the response of your under-development backend, for example, your frontend team can independently develop and test other components.

The benefits of mocking a REST server are:

- Parallel development - mock servers help you develop API-consuming components before the backend is ready. By removing this dependency, teams can develop both components in parallel and thus accelerate delivery.
- Early-stage testing - mocking lets you test your components without the dependency of having your actual backend up and running.
- Faster feedback - mocking your REST API response lets internal and external users test components before your backend is ready to be exposed and provides useful feedback earlier in development.


### 3. GraphQL layer

GraphQL serves as the doorway into the graph layer. The graph layer fits in between the UI layer and the service layer, and brings all of a company's data and services together into one consistent, secure, and discoverable interface so that anyone can access it through a single endpoint.

The GraphQL layer is composed of:

- Supergraph Schema
- Optimizing Query
- Federated Query

#### *Supergraph Schema*

A federated graph (also known as a supergraph) is a graph that’s composed of multiple individual subgraphs.

Our purpose is to demonstrate the use of multiple subgraghs in one url route for our POC example. We can now use data from all over the world and stich it together in one place.

References:

- [Supergraphs](https://github.com/telus/reference-application-poc/tree/main/graphql)
- [Federated graphs in Studio](https://www.apollographql.com/docs/studio/federated-graphs/)
- [reference-application-poc example](https://github.com/telus/reference-application-poc/blob/main/graphql/supergraph.graphql#L14)

#### *Optimizing Query*

[TO DO - Describe what this is and how it is used in the reference-application-poc]

#### *Federated Query*

GraphQL federation allows you to set up a single GraphQL API, or a gateway, that fetches from all your other APIs. Your frontend only needs to query the gateway no matter how the services are split up behind it.

In a federated architecture, individual GraphQL APIs are called subgraphs, and they are composed into a supergraph. By querying the supergraph, clients can query all of the subgraphs at the same time.

A gateway serves as the public access point for the supergraph. It receives incoming GraphQL operations and intelligently distributes them across your subgraphs.

References:

- [Introduction to Apollo Federation](https://www.apollographql.com/docs/federation/#how-it-works)

### 4. Micro-frontend

Micro-frontend architecture is a design approach in which a front-end app is decomposed into individual, semi-independent 'microapps' working loosely together. The micro-frontend concept is vaguely inspired by, and named after, microservices.

Benefits of the micro-frontend pattern:

- Micro-frontend architectures may be simpler, and thus easier to reason about and manage.
- Independent development teams can collaborate on a front-end app more easily.
- They can provide a means for migrating from an “old” app by having a “new” app running side by side with it.

## Prerequisites

- Docker
- Docker Compose

## Step 1: Running subgraphs, Mongo and Docker

### 1. Build Mongo and Graphql

```code
docker-compose --env-file ./config/.env.dev build
```

### 2. Get Docker to spin up all your graphs and Mongodb

```code
docker-compose --env-file ./config/.env.dev up
```

### 3. Stop all Docker containers from running

```code
docker-compose --env-file ./config/.env.dev down
```

## Step 2: Starter guide for subgraphs and superGraphs

- [GraphQL](https://github.com/telus/reference-application-poc/blob/main/graphql/README.md) README.md

## Step 3: Set your Mongo credentials

### 1. Set your MongoDB credentials

The reference-application-poc uses the following file to set your mongoDB credentials:

```text
root directory config/.env.dev
```

### 2. Clean up files

Use `./mongo-clean-up.sh` to clean up old files for MongoDB.

## Step 4: Prettier Code formatter

In this project we are using the following plugin:

- [Prettier Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)