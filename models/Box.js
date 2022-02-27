const { Schema, model } = require("mongoose");

const Box = new Schema({
    image: { type: String, required: true },
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    members: [{
        worker: { type: Schema.Types.ObjectId, ref: "Worker" },
        role: { type: String, required: true },
    }],
    more: [{ type: Schema.Types.ObjectId, ref: "Box" }]
});

module.exports = model("Box", Box);