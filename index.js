require('dotenv').config();
const debug = require('debug')(`${process.env.APPNAME}:index`);
const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const wss = require ('./wss');
const log = require ('loglevel');
log.setLevel('debug'); // Puedes usar 'trace', 'debug', 'info', 'warn', 'error'

const HTTPPORT = 4000;
const WSSPORT = 9091;

// env
process.env.NODE_ENV = app.get('env');
process.env.DEPLOYMENT_MODE = app.get('env');
log.debug("app.get('env')", app.get('env'));
log.debug('process.env.NODE_ENV', process.env.NODE_ENV);
log.debug('DEPLOYMENT_MODE', process.env.DEPLOYMENT_MODE);


app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({
  limit: '2mb',
  extended: true,
}));
app.use((req, res, next) => {
  res.setTimeout(30000);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// init the websocket server
wss.init(WSSPORT)

// init the http server
server.listen(HTTPPORT, () => {
  log.debug(`${process.env.APPNAME} is running on port: ${HTTPPORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  server.close((err) => {
    if (err) {
      log.debug(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
