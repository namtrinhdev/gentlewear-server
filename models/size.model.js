var { Schema, model } = require("mongoose");

let SizeSchema = new Schema(
    {
        sizeCode: { type: String, ref: 'sizeCodeModel', required: true },
        color: [{ type: Schema.Types.ObjectId, ref:'colorModel', required: true }],
        quantity: { type: Number, required: true },
    },
    {
        collection: 'sizes',
    }
);

const sizeModel = model("sizeModel", SizeSchema);

module.exports = sizeModel; 
