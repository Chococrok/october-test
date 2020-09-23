
import express from 'express';
import {GLOBAL_CONFIGURATION} from './configuration'

console.log('Starting server with configuration', GLOBAL_CONFIGURATION);

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(GLOBAL_CONFIGURATION.PORT, () => {
  console.log(`Example app listening at http://${GLOBAL_CONFIGURATION.HOST}:${GLOBAL_CONFIGURATION.PORT}`)
})

