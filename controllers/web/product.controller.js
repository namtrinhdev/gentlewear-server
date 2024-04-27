var md = require('../../models/product.model');

exports.getAddProductPage = async (req, res, next) => {
    console.log("a");
    let list = [];
    res.render('product/addProduct',{row : list});
}

exports.getProductPage = async (req, res, next) => {
    let list;
    try {
        list = await md.find().populate('productType')
        .populate({
            path: 'size',
            populate: [
                { path: 'sizeCode' }
                , {
                    path: 'color',
                    populate: 'colorCode'
                }]
        });
    } catch (err) {
        console.log(err.message);
    }
    res.render('product/productPage',{list: list});
} 