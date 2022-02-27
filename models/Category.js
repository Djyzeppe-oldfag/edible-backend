const { Schema, model } = require("mongoose");

const Category = new Schema({
    image: { type: String, required: true },
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    boxes: [{ type: Schema.Types.ObjectId, ref: "Box" }]
});

module.exports = model("Category", Category);