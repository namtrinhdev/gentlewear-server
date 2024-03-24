var sizeModel = require('../../models/size.model');

exports.listSize = async (req, res, next) => {
    let msg = '';
    let list = [];

    try {
        list = await sizeModel.find();
        msg = 'Lấy danh sách size thành công';
    } catch (error) {
        msg = error.message; 
    } 

    res.render('Size/list', { msg: msg, sizes: list });
}

exports.addSize = async (req, res, next) => {
    let msg = '';
    if(req.method == 'POST'){
        console.log(req.body);
        let objS = new sizeModel();
        objS.sizeCode = req.body.sizeCode;
        objS.color = req.body.color;
        objS.quantity = req.body.quantity;
    
        try {
            let new_s = await objS.save();
            console.log(new_s);
            msg = "Thêm size mới thành công";
            res.redirect('/size');
        } catch (error) {
            msg = error.message;
        } 
    }
    
    res.render('Size/add', {msg: msg});
}
