var { Schema, model } = require("mongoose");
let CartSchema = new Schema(
    {
        colorCode: { type: Schema.Types.ObjectId, ref: 'colorCodeModel', required: true },
        image: { type: String },
        quantity: { type: Number, required: true },
    },
    {
        collection: 'cart',
    }
);

const cartModel = model("cartModel", CartSchema);

module.exports = cartModel; 