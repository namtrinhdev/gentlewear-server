// Controller
var md = require('../../models/color.model');
var colorCodeModel = require('../../models/colorCode.model');

exports.getColorPage = async (req, res, next) => {
    let msg = '';
    let list = [];
    let colorCodes = [];

    try {
        list = await md.find().populate('colorCode');
        colorCodes = await colorCodeModel.find();
        msg = 'Lấy danh sách màu thành công';
    } catch (error) {
        msg = error.message; 
    } 

    if (req.method == 'POST') {
        let objColor = await md.findOne({ colorCode: req.body.colorCode });
        if (req.body.colorCode == '' || req.body.quantity == '' || !req.body.image) {
            msg = 'Phải nhập đầy đủ thông tin'
        } else {
            if (objColor == null) {
                let a = req.body;
                console.log(a);
                try {
                    let obj = new md();
                    obj.colorCode = req.body.colorCode;
                    obj.image = req.body.image; // Lưu đường dẫn hình ảnh
                    obj.quantity = req.body.quantity;
                    await obj.save();
                    msg = 'Thêm màu thành công';
                } catch (error) {
                    msg = "loi : " + error.message;
                    console.log(msg);
                }
            } else {
                msg = 'Mã màu đã tồn tại, vui lòng chọn 1 mã màu khác';
            }
        }
    }

    res.render('color/colorList', { msg: msg, colors: list, colorCodes: colorCodes });
}
