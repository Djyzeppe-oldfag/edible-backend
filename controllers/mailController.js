const mailer = require('../mailer');

const sendMail = async(text) => {
    const message = {
        from: "sunset-assistant@edibleworks.ru",
        to: "odjyzeppe@mail.ru",
        subject: "Потенциальный клиент хочет связаться",
        text
    };
    return await mailer.sendMail(message);
};


module.exports = {
    sendMail
};