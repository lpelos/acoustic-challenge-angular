# Acoustic Code Challenge in Angular

This is a code challenge made for [Acoustic](https://acoustic.co/) which
consists in a SPA application that consumes Acoustic Content APIs and renders
the content returned using Angular.

![Demo](https://raw.githubusercontent.com/lpelos/acoustic-challenge-angular/master/src/assets/images/demo.gif)

To be able to run these projects locally, it's highly recommended that you use
docker. If you don't have docker installed see:
https://docs.docker.com/engine/installation.

If you don't want to use docker for some reason, try and prepare your local
development environment in accordance to the technologies and versions
present in the `Dockerfile.dev` and see the how to run them in the
`docker-compose.yml`.

## Build Docker Image

```
$ docker-compose build
```

## Dev Server

```
$ docker-compose up app
```

Open your browser on http://localhost:4200/

## Build App

### Dev

```
$ docker-compose run --rm app npm run build
```

### Prod

```
$ docker-compose run --rm app npm run build:prod
```

## Tests

### Headless (Docker)

```
$ docker-compose run --rm app npm run test:headless
```

### On Chrome (Local)

In order to be able to run the application tests on Chrome you will need to
have Chrome installed and a local development environment configured.

My suggestion would be [installing nvm](https://github.com/nvm-sh/nvm#installation-and-update)
and then installing the same versions of `node` and `angular-cli` that are used
in the applications's `Dockerfile`.

```
$ nvm install <NODE VESION>
$ npm i -g @angular/cli@<ANGULAR CLI VERSION>
```

and then run the test locally.

```
$ npm run test:chrome
```

## Logs

```
$ docker-compose logs
```

## Further help

### Angular

To get help on the Angular CLI use `docker-compose run --rm app ng help` or go check out the
[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
