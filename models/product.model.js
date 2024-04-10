var { Schema, model } = require("mongoose");

let productSchema = new Schema(
    {
        productName: { type: String,required: true},
        price: { type: Number,required: true},
        quantity: { type: Number,required: true},
        productType: { type: Schema.Types.ObjectId, ref: 'productTypeModel', required: true },
        size: [{ type: Schema.Types.ObjectId, ref:'sizeModel', required: true }],
        quantitySold: { type: Number, required: true },
        mota:{ type: String,required: true}
    },
    {
        collection: 'products',
    }
);

const productModel = model("productModel", productSchema);
module.exports = productModel; 
