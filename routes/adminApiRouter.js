const Router = require("koa-router");
const caseController = require("../controllers/caseController");
const fileController = require("../controllers/fileController");

const router = new Router().prefix("/api");

//case
router.post("/case/create", caseController.create);
router.put("/case/:id", caseController.update);
router.delete("/case/:id", caseController.remove);

//file
router.get("/file/getList", fileController.getList);
router.post("/file/create", fileController.create);

module.exports = router.routes();