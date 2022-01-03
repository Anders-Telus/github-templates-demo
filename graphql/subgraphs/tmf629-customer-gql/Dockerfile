FROM node:14.17-alpine

ENV NO_UPDATE_NOTIFIER=true

ENV HOME=/app
WORKDIR /app

COPY ./ /app/

RUN npm install

RUN addgroup -g 1001 -S telus
RUN adduser -S telus -u 1001

RUN chown -R telus:telus /app
RUN chmod -R 755 /app
USER telus

#EXPOSE 4001

CMD [ "node", "index.js" ]
