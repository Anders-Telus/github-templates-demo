
FROM node:17.0.0 as debug

WORKDIR /usr/src/app

COPY package.json .

RUN npm install
RUN npm install -g nodemon


COPY router.js .

CMD [ "nodemon", "  --experimental-specifier-resolution=node", "router.js" ]
