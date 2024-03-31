var sizeModel = require('../../models/size.model');
var sizeCodeModel = require('../../models/sizeCode.model');
var colorModel = require('../../models/color.model');

exports.getSizePage = async (req, res, next) => {
    let msg = '';
    let list = [];
    let sizeCodes = [];
    let colors = [];

    try {
        list = await sizeModel.find().populate('sizeCode').populate('color');
        sizeCodes = await sizeCodeModel.find();
        colors = await colorModel.find();
        msg = 'Lấy danh sách size thành công';
    } catch (error) {
        msg = error.message; 
    } 

    if (req.method == 'POST') {
        if (req.body.action === 'addSize') {
            let objSize = await sizeModel.findOne({ sizeCode: req.body.sizeCode });
            if (req.body.sizeCode == '' || req.body.quantity == '' || req.body.color == '') {
                msg = 'Phải nhập đầy đủ thông tin'
            } else {
                if (objSize == null) {
                    try {
                        let obj = new sizeModel();
                        obj.sizeCode = req.body.sizeCode;
                        obj.color = req.body.color;
                        obj.quantity = req.body.quantity;
                        await obj.save();
                        msg = 'Thêm size thành công';
                    } catch (error) {
                        msg = "loi : " + error.message;
                        console.log(msg);
                    }
                } else {
                    msg = 'Mã size đã tồn tại, vui lòng chọn 1 mã size khác';
                }
            }
        } else if (req.body.action === 'addSizeCode') {
            let objSizeCode = await sizeCodeModel.findOne({ sizeCode: req.body.newSizeCode });
            if (req.body.newSizeCode == '') {
                msg = 'Phải nhập đầy đủ thông tin'
            } else {
                if (objSizeCode == null) {
                    try {
                        let obj = new sizeCodeModel();
                        obj.sizeCode = req.body.newSizeCode;
                        await obj.save();
                        msg = 'Thêm mã size thành công';
                    } catch (error) {
                        msg = "loi : " + error.message;
                        console.log(msg);
                    }
                } else {
                    msg = 'Mã size đã tồn tại, vui lòng chọn 1 mã size khác';
                }
            }
        }
    }

    res.render('size/sizeList', { msg: msg, sizes: list, sizeCodes: sizeCodes, colors: colors });
}
