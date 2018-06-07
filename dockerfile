FROM node:8-slim

COPY . /starter
COPY package.json /starter/package.json

WORKDIR /starter

ENV NODE_ENV production

CMD ["node","index.js"]

EXPOSE 7357