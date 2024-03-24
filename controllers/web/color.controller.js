var colorCodeModel = require('../../models/colorCode.model');
var colorModel = require('../../models/color.model');

exports.listColor = async (req, res, next) => {
    let msg = '';
    let list = [];

    try {
        list = await colorModel.find().populate('colorCode');
        msg = 'Lấy danh sách màu thành công';
    } catch (error) {
        msg = error.message; 
    } 

    res.render('color/list', { msg: msg, colors: list });
}

exports.addColor = async (req, res, next) => {
    let msg = '';
    if(req.method == 'POST'){
        console.log(req.body);
        let objC = new colorModel();
        // Make sure colorCode and quantity are provided
        if (!req.body.colorCode || !req.body.quantity) {
            msg = "colorCode and quantity are required";
            res.render('color/add', {msg: msg});
            return;
        }
        objC.colorCode = req.body.colorCode;
        objC.image = req.body.image;
        objC.quantity = req.body.quantity;
    
        try {
            let new_c = await objC.save();
            console.log(new_c);
            msg = "Thêm màu mới thành công";
            res.redirect('/colors');
        } catch (error) {
            msg = error.message;
        } 
    }
    
    res.render('color/add', {msg: msg});
}
