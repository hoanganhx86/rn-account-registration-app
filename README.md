# React native and nodejs authentication demo

[![react-native version](https://img.shields.io/badge/react--native-0.64.1-green.svg?style=flat-square)](https://github.com/facebook/react-native/releases)
[![Typescript version](https://img.shields.io/badge/typesctipt-3.8.3-green.svg?style=flat-square)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html)

## Functions

- Register user account
- Use SendGrid to send email with confirmation code to the user
- Implement unit and integration tests at [here](src/__tests__)

## Backend

- Repo: https://github.com/hoanganhx86/nodejs-jwt-authentication-sample

- Deployed to heroku at: https://nodejs-auth1.herokuapp.com/

## Demo

![App Demo](demo.gif)

## Prerequisites

### Install dependencies

Run those commands to install all the dependencies needed

    yarn install
    yarn pod:install

## Ready for development

At the root folder of project

### Run iOS app

    yarn ios

### Run Android app

First need to start an emulator

    yarn android

## Testing

To run all the tests

    yarn test

![Test results](test-results.png)

## Github workflow

Will run linting check code quality and run all the tests automatically
