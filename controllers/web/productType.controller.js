// controllers/productType.controller.js
var md = require('../../models/productType.model');

exports.getProductTypePage = async (req, res, next) => {
    let msg = '';
    let list = [];

    try {
        list = await md.find();
        msg = 'Lấy danh sách loại sản phẩm thành công';
    } catch (error) {
        msg = error.message; 
    } 

    if (req.method == 'POST') {
        let objProductType = await md.findOne({ tenLoai: req.body.tenLoai });
        if (req.body.tenLoai == '') {
            msg = 'Phải nhập đầy đủ thông tin'
        } else {
            if (objProductType == null) {
                try {
                    let obj = new md();
                    obj.tenLoai = req.body.tenLoai;
                    await obj.save();
                    msg = 'Thêm loại sản phẩm thành công';
                    res.redirect("/productType");
                } catch (error) {
                    msg = "loi : " + error.message;
                    console.log(msg);
                }
            } else {
                msg = 'Loại sản phẩm đã tồn tại, vui lòng chọn 1 loại sản phẩm khác';
            }
        }
    }

    res.render('product/productTypeList', { msg: msg, productTypes: list });
}
