var mdUser = require('../../models/user.model');

//1 get ds chờ xác nhận
exports.getWaitConfirmByIdUser = async (req, res) => {
    try {
        let list = await md.find({ 'trangThai': 1, user: req.params.idUser })
            .populate({
                path: 'cart.products',
                populate: [
                    {
                        path: 'size', populate: [
                            { path: 'color', populate: { path: 'colorCode' } },
                            { path: 'sizeCode' }
                        ]
                    },
                    { path: 'productType' }
                ]
            })
            .populate('user')
            .populate('statusUpdates')
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
    }
}
//2 get ds chờ lấy hàng
exports.getWaitForFoodByIdUser = async (req, res) => {
    try {
        let list = await md.find({ 'trangThai': 2, user: req.params.idUser })
            .populate({
                path: 'cart.products',
                populate: [
                    {
                        path: 'size', populate: [
                            { path: 'color', populate: { path: 'colorCode' } },
                            { path: 'sizeCode' }
                        ]
                    },
                    { path: 'productType' }
                ]
            })
            .populate('user')
            .populate('statusUpdates')
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
    }
}
//3 get ds đang giao
exports.getDeliveringByIdUser = async (req, res) => {
    try {
        let list = await md.find({ 'trangThai': 3, user: req.params.idUser })
            .populate({
                path: 'cart.products',
                populate: [
                    {
                        path: 'size', populate: [
                            { path: 'color', populate: { path: 'colorCode' } },
                            { path: 'sizeCode' }
                        ]
                    },
                    { path: 'productType' }
                ]
            })
            .populate('user')
            .populate('statusUpdates')
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
    }
}
//4 get ds đã giao
exports.getDeliveredByIdUser = async (req, res) => {
    try {
        let list = await md.find({ 'trangThai': 4, user: req.params.idUser })
            .populate({
                path: 'cart.products',
                populate: [
                    {
                        path: 'size', populate: [
                            { path: 'color', populate: { path: 'colorCode' } },
                            { path: 'sizeCode' }
                        ]
                    },
                    { path: 'productType' }
                ]
            })
            .populate('user')
            .populate('statusUpdates')
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
    }
}

//0 get ds đã hủy
exports.getCanceledByIdUser = async (req, res) => {
    try {
        let list = await md.find({ 'trangThai': 0, user: req.params.idUser })
            .populate({
                path: 'cart.products',
                populate: [
                    {
                        path: 'size', populate: [
                            { path: 'color', populate: { path: 'colorCode' } },
                            { path: 'sizeCode' }
                        ]
                    },
                    { path: 'productType' }
                ]
            })
            .populate('user')
            .populate('statusUpdates')
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
    }
}

//post thanh toan
exports.postRequest = async (req, res) => {
    let objRes = {
        msg: "",
        status: 0
    }
    try {
        let users = await mdUser.userModel.findById(req.body.user);
        let obj = new md;
        obj.cart = req.body.cart;
        obj.user = req.body.user;
        obj.tongTien = req.body.tongTien;
        obj.thoiGian = req.body.thoiGian;
        obj.trangThai = 1;
        obj.statusUpdates = [{
            status: "Chờ xác nhận",
            time: req.body.thoiGian
        }];
        obj.payOptions = req.body.payOptions;
        await obj.save();
        objRes.msg = "Đặt hàng thành công";
        objRes.status = 1;
        res.status(200).json(objRes);
    } catch (error) {
        console.log(error.message);
        objRes.msg = "Xảy ra lỗi tại máy chủ";
        res.status(error.statusCode).json(objRes);
    }
}

//put trang thai thanh toan
exports.putRequest = async (req, res) => {
    let objRes = {
        msg: ""
    };
    try {
        //id, vaitro, time, trangthaicu//
        let thanhtoan = await md.findById(req.params.id);
        let stt = req.body.trangThai;
        let objThanhToanUpdate = {};
        objThanhToanUpdate.thoiGian = req.body.thoiGian;
        if (stt == 1) {
            //user: cho phep huy don
            objThanhToanUpdate.trangThai = 0;
            objThanhToanUpdate.$push = {
                statusUpdates: {
                    status: 'Đã hủy',
                    time: req.body.thoiGian
                }
            };
        }
        await md.findByIdAndUpdate(req.params.id, objThanhToanUpdate);
        objRes.msg = "Đã sửa";
        res.status(200).json(objRes);

    } catch (error) {
        console.log(error);
        res.status(error.status).json("error", error);
    }
}