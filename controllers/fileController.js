const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const Image = require("../models/Image");

const pathToLink = (path) => {
    do {
        path = path.replace("\\", "/")
    } while (path.indexOf("\\") != -1)

    return path.replace("/var/www", "");
};

const parseFormData = (ctx, folder) => (
    new Promise((resolve, reject) => {
        const form = new formidable({ keepExtensions: true });

        form.on("fileBegin", (formName, file) => {
            const name = [uuid(), file.name.split(".")[1]].join(".");
            const randomPath = path.join(__dirname, "../../static", folder, Math.floor(Math.random() * 100).toString(16).padStart(2, "0"));
            const fullPath = path.join(randomPath, name);

            if (!fs.existsSync(randomPath)) fs.mkdirSync(randomPath, { recursive: true });
            file.name = name;
            file.path = fullPath;
            file.link = pathToLink(fullPath)
        });

        form.parse(ctx.req, (err, fields, files) => {
            if (err) return reject(err);

            resolve({ fields, files: Object.values(files) });
        });
    })
);

const getList = async ctx => {
    const objects = await Image.find();
    ctx.status = 201;
    ctx.body = { success: true, data: objects };
};

const create = async ctx => {
    const { files } = await parseFormData(ctx, "images");

    const object = await Image.create({
        link: files[0].link
    });

    if (!object) ctx.throw(400, "Ошибка при создании картинки");

    ctx.status = 201;
    ctx.body = { success: true, link: files[0].link };
};


module.exports = {
    getList,
    create
};