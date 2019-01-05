# hermes-ts

Chop Tr's personal playground

## About

This is a personal playground I build to test out new things I'm learning.
Using: Vue, Vuex, Typescript, Firebase, AutoML, etc.

## Status

[![CircleCI](https://circleci.com/gh/trchopan/hermes-ts.svg?style=svg)](https://circleci.com/gh/trchopan/hermes-ts)

## How to

- Create a [Firebase](https://console.firebase.google.com) project
- Get the Firebase webapp initialize info from the Project Settings and paste into firebase.conf.js
- Project need to be upgrade to Paid Plan as it will request external source for reCaptcha
- Recaptcha client key is in `.env`
- ReCaptcha server secret key is in `functions/src/secrets.ts`

### Client
```
npm install
npm run test:unit
npm run serve
```
### Server
```
cd functions
npm run serve
```