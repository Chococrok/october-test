# october-test

## How to start

create a .env file containing the mandatory enVariables, for example:

```bash
SERVER_HOST="localhost"
SERVER_PORT=3003
CONTEXT_ROOT="/api/v1"
CONFIGURATION_FILE=
```

install the dependencies:

```bash
npm i
```

build the project: 

```bash
npm run build
```

run the project:

```bash
npm start
```

go to ```http://$SERVER_HOST:$SERVER_PORT$CONTEXT_ROOT/companies?name=october```
