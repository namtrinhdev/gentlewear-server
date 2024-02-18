var md = require('../../models/user.model');

exports.getAll = async (req, res) => {
    try {
        let list = await md.userModel.find();
        res.status(200).json(list);
    } catch (err) {
        console.log(err);
        res.status(500).json("Xảy ra lỗi khi lấy dữ liệu users");
    }
}
exports.checkLogin = async (req, res) => {
    let ObjRes = {
        status: 0,
        msg: ""
    }
    try {
        let username = req.body.username;
        let passwd = req.body.passwd;
        let user = await md.userModel.findOne(username);
        //kiem tra user co ton tai hay chua
        if (user.length > 0) {
            //true -> check password
            let isPasswdValid = await bcrypt.compare(passwd, user.passwd);
            if (isPasswdValid) {
                ObjRes.msg = "Đăng nhập thành công"
                ObjRes.status = 1;
                res.status(200).json(ObjRes);
            } else {
                ObjRes.msg = "Mật khẩu không chính xác"
                ObjRes.status = 0;
                res.status(200).json(ObjRes);
            }
        } else {
            ObjRes.msg = "Username không tồn tại"
            ObjRes.status = 0;
            res.status(403).json(ObjRes);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Xảy ra lỗi khi lấy dữ liệu users");
    }
}

exports.postRegister = async (req, res) => {
    try{
        let user = req.body;
        let validate = true;
        //check validate
        if(validate){
                                                              
        }
    }catch(err){

    }
}