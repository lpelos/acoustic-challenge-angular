# Acoustic Code Challenge in Angular

This is a code challenge made for [Acoustic](https://acoustic.co/) which
consists in a SPA application that consumes Acoustic Content APIs and renders
the content returned using Angular.

To be able to run these projects locally, it's highly recommended that you use
docker. If you don't have docker installed see:
https://docs.docker.com/engine/installation.

If you don't want to use docker for some reason, try and prepare your local
development environment in accordance to the technologies and versions
present in the `Dockerfile.dev` and see the how to run them in the
`docker-compose.yml`.

## Build Image

```
docker-compose build
```

## Dev Server

```
docker-compose up
```

## Build

```
docker-compose run --rm app npm run build
```

## Tests

**TODO** reference: https://github.com/angular/angular-cli/issues/2013#issuecomment-245467961

## Logs

```
docker-compose logs
```

## Further help

### Angular

To get help on the Angular CLI use `docker-compose run --rm app ng help` or go check out the
[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
