# hermes-ts

## Project

Chop Tr's personal playground

## Status

[![CircleCI](https://circleci.com/gh/trchopan/hermes.svg?style=svg)](https://circleci.com/gh/trchopan/hermes)

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