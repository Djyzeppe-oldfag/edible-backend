const { Schema, model } = require("mongoose");

const Worker = new Schema({
    image: { type: String, required: true },
    role: { type: String, required: true },
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    boxes: [{
        box: { type: Schema.Types.ObjectId, ref: "Box" },
        role: { type: String }
    }]
});

module.exports = model("Worker", Worker);