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

EXPOSE 4010

CMD ["node","./node_modules/@stoplight/prism-cli/dist/index.js", "mock", "-h", "0.0.0.0","-p","4010","templates/tmf-api/TMF629-Customer-v4.0.0.swagger.json"]