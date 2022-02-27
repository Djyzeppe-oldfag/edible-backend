const Category = require("../models/Category");

const getList = async ctx => {
    const object = await Category.find({}, "-boxes -description");
    ctx.body = { success: true, data: object };
};

const get = async ctx => {
    const { id } = ctx.params;

    const object = await Category.findById(id)
        .populate({ path: "boxes", select: "image description" })
    if (!object) return ctx.throw(404, "Категория не найдена");

    ctx.body = { success: true, data: object };
};

const create = async ctx => {
    const { image, title } = ctx.request.body;

    if (!image || !title) return ctx.throw(400, "Image, Title не переданы");

    const object = await Category.create({
        image,
        title,
        boxes: ["6219fa7d5f36eb06efb1fd36"]
    });

    if (!object) ctx.throw(400, "Ошибка при создании категории");

    ctx.status = 201;
    ctx.body = { success: true, data: object };
};

module.exports = {
    getList,
    get,
    create
};