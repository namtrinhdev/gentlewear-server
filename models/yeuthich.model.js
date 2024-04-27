const { Schema, model } = require("mongoose");
let favoriteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId,ref:'userModel', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'productModel',required: true}],
  },
  {
    collection: 'favorites',
  }
);

// Tạo model
const FavoriteModel = model("favorites", favoriteSchema);

module.exports = FavoriteModel; 