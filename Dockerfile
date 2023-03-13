FROM node:14-alpine as builder
WORKDIR /src
COPY . .
RUN [ "yarn"]
RUN [ "yarn", "build" ]

FROM node:14-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /src/.env .
COPY --from=builder /src/dist/ .
COPY --from=builder /src/package.json .
COPY --from=builder /src/yarn.lock .
RUN [ "yarn", "install", "--production", "--frozen-lockfile" ]
ENTRYPOINT [ "node", "main.js" ]
LABEL version="1.0.1"
LABEL description="API for G13 Wall of Shame application"
EXPOSE 8080/tcp
EXPOSE 8080/udp
