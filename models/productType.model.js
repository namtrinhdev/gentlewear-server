var { model } = require("mongoose");

var productTypeSchema = new db.mongoose.Schema({
    tenLoai: { type: String, required: true }
},  
{
collection: 'productTypes',
}
);
//tao model
let productTypeModel= model("productTypeModel",productTypeSchema);
module.exports = productTypeModel;