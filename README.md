# Reference Application

*DEMO APPLICATION*

For more information please reach out to:
- gonzalo.vazquez@telus.com
- steve.choi@telus.com

Follow the story at: https://github.com/telus/reference-application/wiki

Discussions: https://github.com/telus/reference-application/discussions

### High Level Architecture

![Reference Application](https://user-images.githubusercontent.com/1566236/137525278-8bed145b-ffb8-464a-b83f-ed724a502ad8.png)

### Structure

*Bottom Up Approach*

1. TMF Specifications
2. Prism Mock Server - REST Endpoint
3. GraphQL Layer
4. MicroFront End

#### Prerequisites 

- Docker
- Docker Compose

#### Instructions

1. Clone repo
2. Run `docker-compose up` to spin up the services
3. Run `docker-compose down` to bring down the service
4. To start with env file `docker-compose --env-file ./config/.env.dev up` 
