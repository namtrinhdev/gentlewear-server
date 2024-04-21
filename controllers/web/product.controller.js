var md = require('../../models/product.model');

exports.getAddProductPage = async (req, res, next) => {
    console.log("a");
    let list = [];
    res.render('product/addProduct',{row : list});
}

exports.getProductPage = async (req, res, next) => {
    console.log("a");
    let list = [];
    res.render('product/productPage');
}