# hermes-ts

Chop Tr's personal playground

## About

This is a personal playground I build to test out new things I'm learning.
Using: Vue, Vuex, Typescript, Firebase, AutoML, etc.

## Status

[![CircleCI](https://circleci.com/gh/trchopan/hermes-ts.svg?style=svg)](https://circleci.com/gh/trchopan/hermes-ts)

## How to

- Create a [Firebase](https://console.firebase.google.com) project
- Get the Firebase webapp initialize info from the Project Settings and paste
  into firebase.conf.js

### Serve devployment enviroment

```
npm install
npm run test:unit
npm run serve
```

### Deploy

Require [Firebase CLI](https://firebase.google.com/docs/cli/)

```
npm run deploy
```
or
```
firebase deploy --only hosting
```