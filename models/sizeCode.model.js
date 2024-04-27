var { Schema, model } = require("mongoose");

var sizeCodeSchema = new Schema({
    sizeCode: { type: String, required: true }
},  
{
collection: 'sizeCodes',
}
);
sizeCodeSchema.set('autoIndex',false);
//tao model
let sizeCodeModel= model("sizeCodeModel",sizeCodeSchema);
module.exports = sizeCodeModel;