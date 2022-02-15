const { Schema, model } = require("mongoose");

const Case = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }]
});

module.exports = model("Case", Case);