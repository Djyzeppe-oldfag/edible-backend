const { sendMail } = require("./mailController");

const create = async ctx => {
    try {
        const { text } = ctx.request.body;
        await sendMail(text);
        ctx.body = { success: true };
    } catch (err) {
        ctx.throw(400, err.message);
    };
};

module.exports = {
    create
};