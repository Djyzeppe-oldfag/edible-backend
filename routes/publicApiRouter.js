const Router = require("koa-router");
const boxController = require("../controllers/boxController");
const workerController = require("../controllers/workerController");
const categoryController = require("../controllers/categoryController");
const supportController = require("../controllers/supportController");

const router = new Router().prefix("/api");

//case
router.get("/box/getList", boxController.getList);
router.get("/box/get/:id", boxController.get);
router.post("/box/create", boxController.create);

//worker
router.get("/worker/getList", workerController.getList);
router.get("/worker/get/:id", workerController.get);
router.post("/worker/create", workerController.create);

//category
router.get("/category/getList", categoryController.getList);
router.get("/category/get/:id", categoryController.get);
router.post("/category/create", categoryController.create);

//support
router.post("/support/create", supportController.create);


module.exports = router.routes();