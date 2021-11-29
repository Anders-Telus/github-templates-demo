
FROM node:alpine

ENV NODE_VERSION 16.10.0

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./

COPY account.js .
COPY accounts.graphql .

RUN npm install

RUN addgroup -g 1001 -S nodejs
RUN adduser -S telus -u 1001

USER telus

#EXPOSE 4001

CMD [ "node", "account.js" ]