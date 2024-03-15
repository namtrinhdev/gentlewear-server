const md = require('../../models/size.model');

exports.getAll = async (req, res, next) => {
    let msg = '';
    let list = [];

    try {
        list = await md.Size.find();
        msg = 'Lấy ds thành công';
        
    } catch (error) {
        msg = error.message; 
    } 

    res.render('Size/listSizeView', { msg: msg, size: list });
}

exports.addSize = async (req, res, next) => {
    let msg = '';
    if(req.method == 'POST'){
        console.log(req.body);
        let objS = new md.Size();
        objS.sizeCode = req.body.sizeCode;
        objS.color = req.body.color;
        objS.quantity = req.body.quantity;
    
        try {
            let new_s = await objS.save();
            console.log(new_s);
            msg = "Thêm mới thành công";
            res.redirect('/sizes');
        } catch (error) {
            msg = error.message;
        } 
    }
    
    res.render('addSizeView', {msg: msg});
}

exports.updateSize = async (req, res, next) => {
    let msg = '';
    let id = req.params.id; 
    let objS = await md.Size.findById(id);

    if(req.method == 'POST'){
        console.log(req.body);
        objS.sizeCode = req.body.sizeCode;
        objS.color = req.body.color;
        objS.quantity = req.body.quantity;

        try {
            await md.Size.findByIdAndUpdate(id, objS);
            msg = "Cập nhật thành công";
            res.redirect('/sizes');
        } catch (error) {
            msg = error.message;
        } 
    }
    res.render('editSizeView', {msg: msg, objS: objS});
}

exports.deleteSize = async (req, res, next) => {
    let msg = '';
    let id = req.params.id; 
    let objS = await md.Size.findById(id);

    if(objS == null){
        msg = "Không tìm thấy size";
        res.render('deleteSizeView', { msg: msg });
    }

    if(req.method =='POST'){
        try {
            await md.Size.findByIdAndDelete(id);
            res.redirect('/sizes');
        } catch (error) {
            msg = error.message;
        }
    }

    res.render('deleteSizeView', { msg: msg, objS: objS });
}
