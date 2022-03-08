const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require('@koa/cors');
const mongoose = require("mongoose");

const PORT = 5000;

const router = require("./routes");

const app = new koa();
app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

const start = async() => {
    try {
        await mongoose.connect("mongodb+srv://root:root@cluster0.kt9pk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        app.listen(PORT, () => console.log(`Server has been started on port ${ PORT }`))
    } catch (e) { console.log(e); };
};
start();