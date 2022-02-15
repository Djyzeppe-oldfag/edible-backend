const Case = require("../models/Case");

const getList = async ctx => {
    const objects = await Case.find({}, "-images");
    ctx.body = {
        success: true,
        data: objects
    };
};

const get = async ctx => {
    const { id } = ctx.params;

    const object = await Case.findById(id);
    if (!object) return ctx.throw(404, "Кейс не найден");

    ctx.body = { success: true, data: object };
};

const create = async ctx => {
    const { image, title, description, ...rest } = ctx.request.body;

    if (!image || !title || !description) return ctx.throw(400, "Image и description не передан");

    const object = await Case.create({ image, title, description, ...rest });
    if (!object) ctx.throw(400, "Ошибка при создании case");

    ctx.status = 201;
    ctx.body = { success: true, data: object };
};

const update = async ctx => {
    const { id } = ctx.params;
    const data = ctx.request.body;

    const result = await Case.findByIdAndUpdate(id, data);

    ctx.body = { success: !!result };
};

const remove = async ctx => {
    const { id } = ctx.params;

    const result = await Case.findByIdAndRemove(id);

    ctx.body = { success: !!result };
};

module.exports = {
    getList,
    get,
    create,
    update,
    remove
};