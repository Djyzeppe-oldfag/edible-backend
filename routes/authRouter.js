const Router = require("koa-router");
const controller = require("../controllers/authController");

const router = new Router().prefix("/auth");

router.post("/login", controller.login);
router.post("/registration", controller.registration);

module.exports = router.routes();