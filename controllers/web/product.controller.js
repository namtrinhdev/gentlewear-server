var productModel = require('../../models/product.model');
var productTypeModel = require('../../models/productType.model');
var sizeModel = require('../../models/size.model');

exports.getProductPage = async (req, res, next) => {
    let msg = '';
    let list = [];
    let productTypes = [];
    let sizes = [];

    try {
        let filter = {};
        if (req.query.size) {
            filter.size = req.query.size;
        }
        if (req.query.productType) {
            filter.productType = req.query.productType;
        }

        list = await productModel.find(filter).populate('productType').populate('size');
        productTypes = await productTypeModel.find();
        sizes = await sizeModel.find();
        msg = 'Lấy danh sách sản phẩm thành công';
    } catch (error) {
        msg = error.message; 
    } 

    if (req.method == 'POST') {
        if (req.body.action === 'addProduct') {
            let objProduct = await productModel.findOne({ productName: req.body.productName });
            if (req.body.productName == '' || req.body.price == '' || req.body.quantity == '' || req.body.productType == '' || req.body.size == '' || req.body.quantitySold == '' || req.body.image == '' || req.body.mota == '') {
                msg = 'Phải nhập đầy đủ thông tin'
            } else {
                if (objProduct == null) {
                    try {
                        let obj = new productModel();
                        obj.productName = req.body.productName;
                        obj.price = req.body.price;
                        obj.quantity = req.body.quantity;
                        obj.productType = req.body.productType; // Đây là ObjectId của productType
                        obj.size = req.body.size; // Đây là ObjectId của size
                        obj.quantitySold = req.body.quantitySold; // Đặt quantitySold theo yêu cầu
                        obj.image = req.body.image; // Đặt image theo yêu cầu
                        obj.mota = req.body.mota; // Đặt mota theo yêu cầu
                        await obj.save();
                        msg = 'Thêm sản phẩm thành công';
                    } catch (error) {
                        msg = "loi : " + error.message;
                        console.log(msg);
                    }
                } else {
                    msg = 'Tên sản phẩm đã tồn tại, vui lòng chọn 1 tên sản phẩm khác';
                }
            }
        }
         else if (req.body.action === 'addProductType') {
            let objProductType = await productTypeModel.findOne({ tenLoai: req.body.newTenLoai });
            if (req.body.newTenLoai == '') {
                msg = 'Phải nhập đầy đủ thông tin'
            } else {
                if (objProductType == null) {
                    try {
                        let obj = new productTypeModel();
                        obj.tenLoai = req.body.newTenLoai;
                        await obj.save();
                        msg = 'Thêm loại sản phẩm thành công';
                    } catch (error) {
                        msg = "loi : " + error.message;
                        console.log(msg);
                    }
                } else {
                    msg = 'Tên loại sản phẩm đã tồn tại, vui lòng chọn 1 tên loại sản phẩm khác';
                }
            }
        }
    }

    res.render('product/productList', { msg: msg, products: list, productTypes: productTypes, sizes: sizes });
}
