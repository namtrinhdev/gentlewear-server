var db = require("./db");

var userSchema = new db.mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    sdt: { type: String},
    passwd: { type: String, required: true },
    diaChi: { type: String},
    vaitro:{ type: Number, required: true},// 0 : admin, 1 : user
    avatar:{ type: String}
},  
{
collection: 'users',
}
);

//tao model
let userModel= db.mongoose.model("userModel",userSchema);
module.exports = {userModel};