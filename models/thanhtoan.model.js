const { Schema, model } = require("mongoose");
let ThanhToanSchema = new Schema(
  {
    cart: [new Schema({
      products: { type: Schema.Types.ObjectId,ref :'productModel', required: true },
      soLuong: { type: Number, required: true },
    }, { _id: false })],
    user: { type: Schema.Types.ObjectId, ref: 'userModel', required: true },
    tongTien: { type: Number, required: true },
    thoiGian: { type: String, required: true},
    trangThai: { type: Number, required: true },// 1: Chờ xác nhận, 2: Chờ lấy hàng, 3: Đang giao, 4: Đã giao, 0: Đã hủy
    statusUpdates: [new Schema({
      status: { type: String, required: true },
      time: { type: String, required: true },
    }, { _id: false })],
    payOptions: { type: Number, required: true} // 0: cash, 1: zalopay
  },
  {
    collection: 'ThanhToan',
  }
);

// Tạo model
const ThanhToanModel = model("ThanhToan", ThanhToanSchema);

module.exports = ThanhToanModel; 