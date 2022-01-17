# building the app using npm
FROM node:14-alpine3.13 as build

COPY . .

RUN npm install

RUN npm run build


# creating the nginx image
FROM nginx:alpine

COPY --from=build ./dist /usr/share/nginx/html

COPY ./openshift4/default.conf /etc/nginx/conf.d

USER root

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

EXPOSE 3000
