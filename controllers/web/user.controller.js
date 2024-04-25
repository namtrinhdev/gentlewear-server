var mongoose = require('mongoose');
var md = require('../../models/user.model');
var bcrypt = require('bcrypt');
var ThanhToanModel = require('../../models/thanhtoan.model');

exports.getAllUsers = async (req, res, next) => {
    let msg = '';
    let list = [];

    let search = req.query.search || '';

    try {
        let searchQuery = {};
        if (search) {
            let regex = new RegExp(search, 'i');
            searchQuery = {
                $or: [
                    { fullname: regex },
                    { email: regex },
                    { diaChi: regex },
                    { sdt: regex }
                ]
            };
        }

        list = await md.userModel.aggregate([
            {
                $match: searchQuery
            },
            {
                $lookup: {
                    from: "ThanhToanModel",
                    localField: "_id",
                    foreignField: "user",
                    as: "orders"
                }
            },
            {
                $addFields: {
                    orderCount: { $size: "$orders" }
                }
            },
            {
                $sort: { orderCount: -1 }
            }
        ]).exec();

        if(list.isLocked){
            msg = 'Mở khóa'
        }else{
            msg = 'Khóa'
        }
    } catch (error) {
        msg = error.message; 
    } 

    let page = parseInt(req.query.page) || 1;
    let perPage = 50;
    let start = (page - 1) * perPage;
    let end = page * perPage;

    res.render('users/list', { msg: msg, users: list.slice(start, end), page: page, search: search });
}

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

exports.lockUser = async (req, res, next) => {
    let msg = '';
    let id = req.params.id; 
    let objU = await md.userModel.findById(id);

    if(objU == null){
        msg = "Không tìm thấy người dùng";
        res.render('users/list', { msg: msg });
    }

    if(req.method =='POST'){
        try {
            let data = {};
            if(objU.isLocked){
                objU.isLocked = false;
            }else{
                objU.isLocked = true;
            }
            data = objU;
            await md.userModel.findByIdAndUpdate(id, data);
            res.redirect('/users/list');
        } catch (error) {
            msg = error.message;
        }
    }

    res.render('users/list', { msg: msg, user: objU });
}

exports.getPurchaseHistory = async (req, res) => {
    const userId = req.params.id;
    const transactions = await ThanhToanModel.find({ user: userId }).populate({
        path: 'cart.products',
        populate: {
            path: 'size',
            model: 'sizeModel',
            populate: {
                path: 'sizeCode',
                model: 'sizeCodeModel'
            }
        }
    });
    res.render('users/purchase-history', { transactions: transactions });
};


