const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id) => {
    return jwt.sign({ id }, "secret", { expiresIn: "1h" });
};

const login = async ctx => {
    try {
        const { username, password } = ctx.request.body;
        const user = await User.findOne({ username });

        if (!user) return ctx.throw(400, `Пользователь ${ username } не найден`);
        if (!bcrypt.compareSync(password, user.password)) return ctx.throw(400, "Пароль введен неверно");

        ctx.body = {
            success: true,
            token: generateJwt(user._id)
        };
    } catch (err) {
        console.log(err);
        ctx.throw(400, "Ошибка авторизации");
    };
};

const registration = async ctx => {
    try {
        const { username, password } = ctx.request.body;
        const candidate = await User.findOne({ username });

        if (candidate) return ctx.throw(400, `Пользователь с таким ${ username } уже существует`);

        const hash = await bcrypt.hashSync(password, 7);

        const user = new User({ username, password: hash });
        await user.save();

        ctx.status = 201;
        ctx.body = {
            success: true
        };
    } catch (err) {
        console.log(err);
        ctx.throw(400, "Ошибка регистрации");
    };
};

module.exports = {
    login,
    registration
};