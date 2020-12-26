FROM node:14-alpine
WORKDIR /usr/src/g13-wall-of-shame-api
COPY .env ./
COPY dist/ ./
COPY package*.json ./
RUN [ "npm", "install", "--only=prod" ]
CMD [ "node", "main.js" ]
LABEL version="1.0"
LABEL description="API for G13 Wall of Shame application"
EXPOSE 80/tcp
EXPOSE 80/udp