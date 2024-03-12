var { Schema, model } = require("mongoose");
let ColorSchema = new Schema(
    {
        colorCode: { type: String, ref: 'colorCodeModel', required: true },
        image: { type: String },
        quantity: { type: Number, required: true },
    },
    {
        collection: 'colors',
    }
);

const colorModel = model("colorModel", ColorSchema);

module.exports = colorModel; 