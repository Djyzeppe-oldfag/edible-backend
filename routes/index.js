const Router = require("koa-router");

const JwtParser = require('../middlewares/JwtParser');

const authRouter = require("./authRouter");
const publicApiRouter = require("./publicApiRouter");
const adminApiRouter = require("./adminApiRouter");

const router = new Router();

router.use(authRouter);
router.use(publicApiRouter);
router.use(adminApiRouter);
router.use(JwtParser); // Фильтрует запросы без токена

module.exports = router;