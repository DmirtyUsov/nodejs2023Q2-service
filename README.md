# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Install Docker Engine](https://docs.docker.com/engine/install/)
## Download

```
git clone git@github.com:DmirtyUsov/nodejs2023Q2-service.git
git checkout part2
```

## Install NPM modules

```
npm install
```

## Rename '.env.example' file

```
mv .env.example .env
```
## Run application

```
docker compose up -d
```
First time will download two images from [GitHub](https://hub.docker.com/repositories/dimausov) (115 and 90 MB)   
**Wait 15 seconds**  

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```
## Stop application
```
docker compose stop
```
## Scan for vulnerabilities
```
npm run scan
```
## For future Parts
To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
