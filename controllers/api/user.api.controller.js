var md = require('../../models/user.model');
var bcrypt = require('bcrypt');
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
        msg: '',
        status: 0,
        data: {}
    };

    try {

        let passwd = req.body.passwd;
        let user = await md.userModel.findOne({email : req.body.email});        
        console.log(user);
        console.log(passwd);
        //kiem tra user co ton tai hay chua
        if (user == null) {
            // "Email không tồn tại"
            ObjRes.msg = "Email không tồn tại";
            ObjRes.status = 0;
            res.status(201).json(ObjRes);
        } else {
            //true -> check password
            let isPasswdValid = await bcrypt.compare(passwd, user.passwd);
            console.log(isPasswdValid);
            if (isPasswdValid) {
                // "Đăng nhập thành công"
                ObjRes.status = 1;
                ObjRes.msg = "Đăng nhập thành công";
                ObjRes.data = user;
                res.status(200).json(ObjRes);
            } else {
                // "Mật khẩu không chính xác"
                ObjRes.msg = "Mật khẩu không chính xác";
                ObjRes.status = 0;
                res.status(200).json(ObjRes);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err.message });
    }
}

exports.postRegister = async (req, res) => {
    let ObjRes = {
        status: 0,
        data: {},
        msg: ''
    }
    try {
        let user = await md.userModel.findOne({ email: req.body.email });
        //check validate
        if (user) {
            //email already exists
            ObjRes.status = 0;
            ObjRes.msg = "Email already exists"
            res.status(201).json(ObjRes);
        } else {
            //create new account
            let hashedPassword = await bcrypt.hash(req.body.passwd, 10);//Mã hóa mật khẩu
            let obj = new md.userModel();
            obj.fullname = req.body.fullname;
            obj.email = req.body.email;
            obj.passwd = hashedPassword;
            obj.status = 1;// 1: nguoi dung
            obj.isLocked = false;
            obj.avatar = "user.jpg";//avatar mac dinh
            obj.save();

            ObjRes.status = 1;
            ObjRes.msg = "Successfully created"
            let newUser = await md.userModel.findOne({ email: req.body.email });
            ObjRes.data = newUser;
            res.status(201).json(ObjRes);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err.message });
    }
}

//change password
exports.changePassword = async (req, res) => {
    res.status(200).json();
}