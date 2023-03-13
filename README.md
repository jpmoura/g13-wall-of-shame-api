# G13 Wall of Shame API
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=g13-wall-of-shame-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=g13-wall-of-shame-api)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=g13-wall-of-shame-api&metric=bugs)](https://sonarcloud.io/dashboard?id=g13-wall-of-shame-api)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=g13-wall-of-shame-api&metric=code_smells)](https://sonarcloud.io/dashboard?id=g13-wall-of-shame-api)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=g13-wall-of-shame-api&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=g13-wall-of-shame-api)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=g13-wall-of-shame-api&metric=sqale_index)](https://sonarcloud.io/dashboard?id=g13-wall-of-shame-api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=g13-wall-of-shame-api&metric=coverage)](https://sonarcloud.io/dashboard?id=g13-wall-of-shame-api)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Description

This is a REST API created with [NestJS Framework](https://github.com/nestjs/nest) with TypeScript for an application hosted on Heroku that help me keep track all my friend's mistakes.

A Swagger interface is provided in `APP_HOST\swagger` where `APP_HOST` is the host address for the application.

## Installation

To install all packages required simply run:

```sh
yarn
```

## Build

To build a production ready version just run:

```sh
yarn build
```

Also, there is a [`Dockerfile`](./Dockerfile) if you rather run this as a container than a standalone app.

## Running the app

To run this app you could use the following commands:

```sh
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

Also, it's expected that you provide an `.env` file with the following structure:

```env
DATABASE_CS=MONGO_DB_CONNECTION_STRING
PORT=APP_PORT
SONAR_TOKEN=YOUR_SONAR_TOKEN
SONAR_HOST=YOUR_SONAR_HOST
```

For your convenience there is a `.env.example` in this repository following this structure.

## Test

At this moment there are only end-to-end tests but at the same time the app is 100% covered (lines and branches). To run the tests execute the following command:

```sh
# e2e tests
yarn test:e2e
```

## TODO

1. Unit tests

## License

G13 Wall of Shame API is [MIT licensed](https://github.com/jpmoura/g13-wall-of-shame-api/blob/master/LICENSE).
