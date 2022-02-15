const { Schema, model } = require("mongoose");

const Image = new Schema({
    link: { type: String, unique: true, required: true }
});

module.exports = model("Image", Image);