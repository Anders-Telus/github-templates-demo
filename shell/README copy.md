# Casa Container App
### Why?
TBD

### What?
TBD - Aggregated demo App with Search and Dialog MFEs

## Requirements

- Node 14 or greater

## Usage

```sh
$ npm i
$ npm start
```

- Open [http://localhost:3000](http://localhost:3000), to check out the result.

## Docker

```sh
$ docker build -t casa-container:v1 .
$ docker run -p 4000:3000 -e "SEARCH_EXPERIENCE_HOST=http://localhost:9001" -e "DIALOG_EXPERIENCE_HOST=http://localhost:9004" casa-container:v1
```
Assumption is Search MFE runs on localhost:9001 and Dialog MFE runs on localhost:9004 accordingly

- Open [http://localhost:4000](http://localhost:4000), to check out the result.

## Docker-compose

```sh
$ docker-compose up
```

- Open [http://localhost:4000](http://localhost:4000), to check out the result.
