const koa = require('koa');
const app = module.exports = koa();
const config = require('./config/config')();
const router = require('koa-router')();
const logger = require('koa-logger');

app.use(logger());

require('./routes')(app, router);

if (!module.parent) {
    var port = process.env.PORT || config.port || 10000;
    app.listen(port);
    console.log('Running %s site at: http://localhost:%d', config.mode, port);
}