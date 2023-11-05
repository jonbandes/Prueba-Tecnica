FROM node:16-bullseye

WORKDIR /src/index.js

COPY . .

RUN npm install

CMD [ "npm", "start"]