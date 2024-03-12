var mdProduct = require('../../models/product.model');
var mdProductType = require('../../models/productType.model');
var mdColor = require('../../models/color.model');
var mdColorCode = require('../../models/colorCode.model');
var mdSize = require('../../models/size.model');
var mdSizeCode = require('../../models/sizeCode.model');
var fs = require('fs');

/////////// I. API PRODUCT  
//get all products with pages
exports.getAllProductWithPage = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 20;
    try {
        let shirts = await mdProduct.find()
        .populate('productType')
        .populate({
            path: 'size',
            populate : 'sizeCode color'
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

        let totalShirts = await mdProduct.countDocuments();
        res.status(200).json({
            page: page,
            pageSize: pageSize,
            totalItems: totalShirts,
            data: shirts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({err : err.message});
    }
}
//search products
exports.searchProduct = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 20;
    let keyword = req.query.keyword;
    try {
        let shirts = await mdProduct.find({ productName : { $regex: new RegExp(keyword, 'i') }})
        .populate('productType')
        .populate({
            path: 'size',
            populate : 'sizeCode color'
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
 
        let totalShirts = shirts.length;
        res.status(200).json({
            page: page,
            pageSize: pageSize,
            totalItems: totalShirts,
            data: shirts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({err : err.message});
    }
}

//filter products by productType
exports.filterProducts = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 20;
    let id = req.query.id;            
    try {
        let shirts = await mdProduct.find({ 'size.color' : { $elemMatch: { _id: id } }})
        .populate('productType')
        .populate({
            path: 'size',
            populate : 'sizeCode color'
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
 
        let totalShirts = shirts.length;
        res.status(200).json({
            page: page,
            pageSize: pageSize,
            totalItems: totalShirts,
            data: shirts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({err : err.message});
    }
}

//sort products by productType
exports.sortProducts = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
        res.status(500).json({err : err.message});
    }
}

/////////// II. API PRODUCT TYPE
//get all productType
exports.getAllProductType = async (req, res) => {
    try {
        let productType = await mdProductType.find();
        res.status(200).json(productType);
    } catch (err) {
        console.log(err);
        res.status(500).json({err : err.message});
    }
}
/////////// III. API COLOR 
/////////// IV. API COLOR CODE
/////////// V. API SIZE 
/////////// VI. API SIZE CODE