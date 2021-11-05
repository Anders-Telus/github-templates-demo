FROM node:alpine

ENV NODE_VERSION 16.10.0

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
COPY templates ./templates
RUN npm install

RUN addgroup -g 1001 -S nodejs
RUN adduser -S telus -u 1001

USER telus

EXPOSE 4020

CMD ["node","./node_modules/@stoplight/prism-cli/dist/index.js", "mock", "-h", "0.0.0.0","-p","4020","templates/tmf-api/TMF666-Account-v4.0.0.swagger.json"]