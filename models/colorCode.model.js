const { Schema, model } = require("mongoose");

var colorCodeSchema = new db.mongoose.Schema({
    colorCode: { type: String, required: true },
    nameColor: { type: String, required: true }
},  
{
collection: 'colorCodes',
}
);
colorCodeSchema.set('autoIndex',false);
//tao model
let colorCodeModel= model("colorCodeModel",colorCodeSchema);
module.exports = colorCodeModel;