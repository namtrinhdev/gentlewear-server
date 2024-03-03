var bcrypt = require('bcrypt');
var md = require('../../models/user.model');

exports.getLoginPage = (req, res, next) => {
    res.render('login', { msg: '' });
}

exports.postLoginPage = async (req, res, next) => {
    let msg = '';
    if (req.body.email === 'admin@gmail.com' && req.body.passwd === 'admin') {
        msg = 'Đăng nhập thành công';
        res.redirect('/users');
    } else {
        let objUser = await md.userModel.findOne({ email: req.body.email });
        if (objUser) {
            const match = await bcrypt.compare(req.body.passwd, objUser.passwd);
            if (match && objUser.status === 0) {
                msg = 'Đăng nhập thành công';
                res.render('users/user', { msg: msg });
            } else {
                msg = 'Email hoặc mật khẩu không đúng hoặc bạn không có quyền truy cập';
                res.redirect('/users');
            }
        } else {
            msg = 'Email hoặc mật khẩu không đúng';
            res.render('login', { msg: msg });
        }
    }
}
