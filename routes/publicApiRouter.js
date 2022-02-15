const Router = require("koa-router");
const caseController = require("../controllers/caseController");

const router = new Router().prefix("/api");

//case
router.get("/case/getList", caseController.getList);
router.get("/case/get/:id", caseController.get);

module.exports = router.routes();