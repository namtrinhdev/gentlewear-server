var md = require('../../models/user.model');
var bcrypt = require('bcrypt');

exports.getUserPage = async (req, res, next) => {
    let msg = '';
    if (req.method == 'POST') {
        let objUser = await md.userModel.findOne({ email: req.body.email });
        if (req.body.fullname == '' || req.body.passwd == ''
            || req.body.email == '' || req.body.diaChi == '' || req.body.sdt == '' || req.body.status == '') {
            msg = 'Phải nhập đầy đủ thông tin'
        } else {
            if (objUser == null) {
                let a = req.body;
                console.log(a);
                try {
                    let obj = new md.userModel();
                    let hashedPassword = await bcrypt.hash(req.body.passwd, 10);
                    obj.fullname = req.body.fullname;
                    obj.passwd = hashedPassword;
                    obj.email = req.body.email;
                    obj.avatar = req.body.avatar;
                    obj.diaChi = req.body.diaChi;
                    obj.sdt = req.body.sdt;
                    if (req.body.status == '0') {
                        obj.status = 0;
                    } else if (req.body.status == '1') {
                        obj.status = 1;
                    }
                    await obj.save();
                    msg = 'Thêm user thành công';
                } catch (error) {
                    msg = "loi : " + error.message;
                    console.log(msg);
                }
            } else {
                msg = 'username đã tồn tại, vui lòng chọn 1 username khác';
            }

        }
    }
    res.render('users/user', { msg: msg });
}