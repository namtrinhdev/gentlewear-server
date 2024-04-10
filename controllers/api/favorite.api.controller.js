var md = require('../../models/favorite.model');
var mdSP = require('../../models/product.model');
var mdUser = require('../../models/user.model');

exports.getFavorites = async (req, res) => {
    try {
        let favorites = await md.find({ user: req.params.idUser })
            .populate({
                path: 'products',
                populate: [{
                    path: 'productType'
                },
                {
                    path: 'size',
                    populate: [{
                        path: 'sizeCode'
                    },
                    {
                        path: 'color',
                        populate: 'colorCode'
                    }]
                }]
            })
            .populate('user');
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json("error", err.message);
    }
}

exports.toggleFavorite = async (req, res) => {
    let objRes = {
        msg: "",
        status: 0
    };
    try {
        let idUser = req.query.idUser;
        let idSp = req.query.idSp;
        let user = await mdUser.userModel.findById(idUser);
        let sp = await mdSP.findById(idProduct);
        let favorite = await md.findOne({ user: idUser });
        if (favorite == null) {
            //tao moi va them vao yeu ds yeu thich
            let favorites = new md();
            favorites.user = user;
            favorites.products = [sp];
            await favorites.save();
            objRes.msg = "Đã thêm vào danh sách yêu thích";
            res.status(200).json(objRes);
        } else {
            let index = await favorite.products.indexOf(idSp);
            if (index === -1) {
                // Nếu sản phẩm chưa tồn tại, thêm vào danh sách
                favorite.products.push(idSp);
                objRes.msg = "Đã thêm vào danh sách yêu thích";
            } else {
                // Nếu sản phẩm đã tồn tại, xóa khỏi danh sách
                favorite.products.splice(index, 1);
                objRes.msg = "Đã xóa khỏi danh sách yêu thích";
            }
            await favorite.save();
            res.status(200).json(objRes);
        }
    } catch (err) {
        res.status(500).json("error", err.message);
    }
}