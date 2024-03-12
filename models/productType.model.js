var {Schema, model } = require("mongoose");

var productTypeSchema = new Schema({
    tenLoai: { type: String, required: true }
},  
{
collection: 'productTypes',
}
);
//tao model
let productTypeModel= model("productTypeModel",productTypeSchema);
module.exports = productTypeModel;