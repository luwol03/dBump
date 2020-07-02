FROM node:14
COPY . /dBump

WORKDIR /dBump

RUN npm i

CMD node /dBump/main.js
