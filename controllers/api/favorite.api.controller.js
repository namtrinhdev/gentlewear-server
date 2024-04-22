var md = require('../../models/yeuthich.model');
var mdUser = require('../../models/user.model');
var mdProduct = require('../../models/product.model');

exports.getFavorites = async (req, res) => {
    try {
        let list = await md.find({ user: req.query.idUser })
            .populate({
                path: 'products',
                populate: [{
                    path: 'size',
                    populate: [
                        { path: 'sizeCode' },
                        {
                            path: 'color',
                            populate: 'colorCode'
                        }]
                },
                { path: 'productType' }]
            })
            .populate('user');
        res.status(200).json(list);
    } catch (err) {
        res.status(err.status).json("error", err);
    }
}

exports.toggleFavorite = async (req, res) => {
    let objRes = {
        msg: '',
        status: 0
    };
    try {
        let favorite = await md.findOne({ user: req.query.idUser });
        if (favorite == null) {
            let product = await mdProduct.findById(req.query.idSp);
            let user = await mdUser.userModel.findById(req.query.idUser);
            let obj = new md();
            obj.user = user;
            obj.products = [product];
            await obj.save();
            objRes.msg = 'Đã thêm vào danh sách yêu thích';
            objRes.status = 0;
        } else {
            let index = favorite.products.indexOf(req.query.idSp);
            if (index == -1) {
                favorite.products.push(req.query.idSp);
                objRes.msg = 'Đã thêm vào danh sách yêu thích';
                objRes.status = 0;
            } else {
                objRes.msg = 'Đã xóa khỏi danh sách yêu thích';
                favorite.products.splice(index, 1);
                objRes.status = 1;
            }
            await favorite.save();
        }
        res.status(200).json(objRes);
    } catch (err) {
        res.status(404).json(err.message);
    }
}

exports.checkFavorite = async (req, res) => {
    try {
        let favorite = await md.findOne({ products: req.query.idSp });
        if (favorite == null) {
            res.status(200).json({
                msg: 'not favorite',
                status: 1
            });
        } else {
            res.status(200).json({
                msg: 'is favorite',
                status: 0
            });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}