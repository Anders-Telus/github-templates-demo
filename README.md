# Reference Application

-DEMO APPLICATION

For more information please reach out to:

- gonzalo.vazquez@telus.com
- steve.choi@telus.com

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

## Setting your Mongo Credentials

The reference application uses the follwing file to set your mongoDB credentials

```text
root directory config/.env.dev
```

### Clean up Guide

- use ./mongo-clean-up.sh to clean up old files for mongo db


## What is prettier and code formatting plugins ?

- in this project we are using the following plugin

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

