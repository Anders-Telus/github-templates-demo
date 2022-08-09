FROM node:17.0.0 as debug

WORKDIR /work/

COPY ./src/package.json /work/package.json
COPY ./src/ /work/src/
RUN npm install
RUN npm install -g nodemon

#EXPOSE 4001

ENTRYPOINT [ "nodemon", "--experimental-specifier-resolution=node","./src/server.js"]
