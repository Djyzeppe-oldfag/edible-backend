const Worker = require("../models/Worker");
const Box = require("../models/Box");

const getList = async ctx => {
    const object = await Worker.find();
    ctx.body = { success: true, data: object };
};

const get = async ctx => {
    const { id } = ctx.params;

    const object = await Worker.findById(id).populate({ path: "boxes.box", select: "image description" });
    if (!object) return ctx.throw(404, "Работник не найден");

    ctx.body = { success: true, data: object };
};

const create = async ctx => {
    const { image, role, name, description } = ctx.request.body;

    if (!image || !role || !name || !description) return ctx.throw(400, "Image, Role, Title, Description не переданы");

    const object = await Worker.create({
        image,
        role,
        name,
        description,
        boxes: [{ box: "6219f2d9500f92bed76fdfca", role: "Бог" }]
    });
    if (!object) ctx.throw(400, "Ошибка при создании работника");

    ctx.status = 201;
    ctx.body = { success: true, data: object };
};

module.exports = {
    getList,
    get,
    create
};