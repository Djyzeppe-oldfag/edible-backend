const Router = require("koa-router");

const publicApiRouter = require("./publicApiRouter");

const router = new Router();

router.use(publicApiRouter);

module.exports = router;