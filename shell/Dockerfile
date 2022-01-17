# building the app using npm
FROM node:14-alpine3.13 as build

COPY . .

RUN npm install
RUN npm i node-sass

RUN npm run build


# creating the nginx image
FROM nginx:stable-alpine as release

COPY --from=build ./dist /usr/share/nginx/html

COPY ./openshift4/default.conf /etc/nginx/conf.d
# copy .env.example as .env to the relase build
COPY .env /usr/share/nginx/html/.env

#USER root

#RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
#    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

RUN apk add --update nodejs
RUN apk add --update npm
RUN npm i -g runtime-env-cra@0.2.0

WORKDIR /usr/share/nginx/html

EXPOSE 3000

CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]