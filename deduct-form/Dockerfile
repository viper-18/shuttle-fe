FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY public/ public/

COPY server.js .

CMD ["node", "server.js"]
