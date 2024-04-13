// controllers/sizeCode.controller.js
var md = require('../../models/sizeCode.model');

exports.getSizeCodePage = async (req, res, next) => {
    let msg = '';
    let list = [];

    try {
        list = await md.find();
        msg = 'Lấy danh sách mã kích cỡ thành công';
    } catch (error) {
        msg = error.message; 
    } 

    if (req.method == 'POST') {
        let objSizeCode = await md.findOne({ sizeCode: req.body.sizeCode });
        if (req.body.sizeCode == '') {
            msg = 'Phải nhập đầy đủ thông tin'
        } else {
            if (objSizeCode == null) {
                try {
                    let obj = new md();
                    obj.sizeCode = req.body.sizeCode;
                    await obj.save();
                    msg = 'Thêm mã kích cỡ thành công';
                } catch (error) {
                    msg = "loi : " + error.message;
                    console.log(msg);
                }
            } else {
                msg = 'Mã kích cỡ đã tồn tại, vui lòng chọn 1 mã kích cỡ khác';
            }
        }
    }

    res.render('size/sizeCodeList', { msg: msg, sizeCodes: list });
}
