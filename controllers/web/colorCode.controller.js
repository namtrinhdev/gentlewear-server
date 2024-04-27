var md = require('../../models/colorCode.model');

exports.getColorCodePage = async (req, res, next) => {
    let msg = '';
    let list = [];

    try {
        list = await md.find();
        msg = 'Lấy danh sách mã màu thành công';
    } catch (error) {
        msg = error.message; 
    } 

    if (req.method == 'POST') {
        let objColorCode = await md.findOne({ colorCode: req.body.colorCode });
        if (req.body.colorCode == '' || req.body.nameColor == '') {
            msg = 'Phải nhập đầy đủ thông tin'
        } else {
            if (objColorCode == null) {
                let a = req.body;
                console.log(a);
                try {
                    let obj = new md();
                    obj.colorCode = req.body.colorCode;
                    obj.nameColor = req.body.nameColor;
                    await obj.save();
                    msg = 'Thêm mã màu thành công';
                } catch (error) {
                    msg = "loi : " + error.message;
                    console.log(msg);
                }
            } else {
                msg = 'Mã màu đã tồn tại, vui lòng chọn 1 mã màu khác';
            }
        }
    }

    res.render('color/colorCodeList', { msg: msg, colorCodes: list });
}
