const Box = require("../models/Box");

const getList = async ctx => {
    const objects = await Box.find({}, "image description");
    ctx.body = { success: true, data: objects };
};

const get = async ctx => {
    const { id } = ctx.params;

    const object = await Box.findById(id, "-image")
        .populate({ path: "members.worker", select: "name" })
        .populate({ path: "more", select: "image" });
    if (!object) return ctx.throw(404, "Кейс не найден");

    ctx.body = { success: true, data: object };
};

const create = async ctx => {
    const { image, title, description } = ctx.request.body;

    if (!image || !title || !description) return ctx.throw(400, "Image, Title, Description не переданы");

    const object = await Box.create({
        image,
        title,
        description,
        images: ["1.jpg"],
        members: [{
            worker: "6219f583acefd67eaaab2167",
            role: "Бог"
        }],
        more: ["6219fa7d5f36eb06efb1fd36"]
    });

    if (!object) ctx.throw(400, "Ошибка при создании бокса");

    ctx.status = 201;
    ctx.body = { success: true, data: object };
};

module.exports = {
    getList,
    get,
    create
};