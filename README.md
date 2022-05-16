# Reference Application

For more information please reach out to the Agora team via Slack channel #agora-project.

Follow the story at: <https://github.com/telus/reference-application/wiki>

Discussions: <https://github.com/telus/reference-application/discussions>

## High Level Architecture

![Reference Application](https://user-images.githubusercontent.com/1566236/137525278-8bed145b-ffb8-464a-b83f-ed724a502ad8.png)

## Structure

- Bottom Up Approach

1. TMF Specifications
2. Prism Mock Server - REST Endpoint
3. GraphQL Layer
4. MicroFront End

## Prerequisites

- Docker
- Docker Compose

## Running Subgraphs, Mongo and Docker

### How to build Mongo and Graphql

```code
docker-compose --env-file ./config/.env.dev build
```

### How to get Docker to spin up all your graphs and Mongodb

```code
docker-compose --env-file ./config/.env.dev up
```

### How to stop all Docker containers from running

```code
docker-compose --env-file ./config/.env.dev down
```

## Starter guide for Subgraphs and Super Graphs

Please see [README.md](https://github.com/telus/reference-application-poc/blob/fix/AG-41-cleanup/graphql/README.md) for further details.

## Setting your Mongo Credentials

The reference application uses the `root directory config/.env.dev` file to set your mongoDB credentials.

### Cleaning up files

Use `./mongo-clean-up.sh` to clean up old files for MongoDB.

## Code formatting plugins

In this project we are using the following plugin:
[prettier-vscode[(https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
