FROM node:8-slim

COPY . /starter
COPY package.json /starter/package.json

WORKDIR /starter

ENV NODE_ENV production
RUN npm install --production
RUN npm install webpack-dev-server -g

CMD ["webpack-dev-server"]

EXPOSE 7357