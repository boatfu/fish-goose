const router = require('koa-router')();
const homeController = require('../controllers/home');

router.get('/', homeController);
module.exports = router;