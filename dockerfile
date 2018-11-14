FROM node:8-slim

COPY . /starter
COPY package.json /starter/package.json

WORKDIR /starter

ENV NODE_ENV production
RUN npm install express
RUN npm install path

CMD ["node","index.js"]

EXPOSE 7357
