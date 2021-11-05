from node:16-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY customers.js .
COPY customers.graphql .

CMD [ "node", "customers.js" ]