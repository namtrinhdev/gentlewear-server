var { Schema, model } = require("mongoose");

let favoriteSchema = new Schema(
    {
        user : {type : Schema.Types.ObjectId, ref: 'userModel', required: true},
        products: [{type : Schema.Types.ObjectId, ref: 'productModel', required: true}]
    },
    {
        collection: 'favorites',
    }
);

const favoriteModel = model("favoriteModel", favoriteSchema);
module.exports = favoriteModel; 
