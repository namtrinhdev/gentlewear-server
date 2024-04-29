var md = require('../../models/product.model');
var mdPT = require('../../models/productType.model');

exports.getAddProductPage = async (req, res, next) => {
    let list = [];
    res.render('product/addProduct',{row : list});
}

exports.getProductPage = async (req, res, next) => {
    let list;
    let listPT;
    try {
        //list producttype
        listPT = await mdPT.find();
        //list product
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
    res.render('product/productPage',{list: list, listPT: listPT});
} 