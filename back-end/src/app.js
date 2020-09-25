const Koa = require('koa');
const config = require('../config');
const routers = require('./routers/index');

const app = new Koa();
app.use(routers.routes()).use(routers.allowedMethods());
app.listen(config.port);
console.log(`the server has started at ${config.port}, enjoy yourself!`);
