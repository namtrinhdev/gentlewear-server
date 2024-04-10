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
    let pageSize = parseInt(req.query.pageSize) || 10;
    try {
        let shirts = await mdProduct.find()
            .populate('productType')
            .populate({
                path: 'size',
                populate: [{
                    path: 'sizeCode'
                },
                {
                    path: 'color',
                    populate: 'colorCode'
                }]
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
        res.status(500).json({ err: err.message });
    }
}
//search products
exports.searchProductByName = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 10;
    let keyword = req.query.keyword;

    try {
        // Sử dụng $regex để tạo biểu thức chính quy tìm kiếm theo từ khóa
        let shirts = await mdProduct.find({ productName: { $regex: new RegExp(keyword, 'i') } })
            .populate('productType')
            .populate({
                path: 'size',
                populate: [{
                    path: 'sizeCode'
                },
                {
                    path: 'color',
                    populate: 'colorCode'
                }]
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
        res.status(500).json({ err: err.message });
    }
}
// Filter products by productType
exports.filterProducts = async (req, res) => {
    try {
        let _id = req.query._id; // Lấy ID của loại sản phẩm từ tham số truy vấn

        // Tìm các sản phẩm thuộc loại sản phẩm đã chỉ định
        let products = await mdProduct.find({ productType: _id })
            .populate('productType') // Lấy thông tin về loại sản phẩm
            .populate({ // Lấy thông tin về kích thước và màu sắc
                path: 'size',
                populate: [{ path: 'sizeCode' }, { path: 'color' }]
            });

        // Kiểm tra xem có sản phẩm nào được tìm thấy không
        if (products.length > 0) {
            // Nếu có sản phẩm, trả về danh sách sản phẩm
            res.status(200).json(products);
        } else {
            // Nếu không có sản phẩm được tìm thấy, trả về mã lỗi 404
            res.status(404).json({ message: "No products found for the specified product type." });
        }
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        console.log(error.message);
        res.status(500).json({ error: "Failed to filter products" });
    }
}


//sort products by productType
exports.sortProducts = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 10;
    let sortBy = req.query.sortBy; // Sorting criteria: "name_asc", "price_asc", "price_desc"

    try {
        let sortQuery = {};

        switch (sortBy) {
            case "name_asc":
                sortQuery = { productName: 1 }; // Sort by product name ascending
                break;
            case "price_asc":
                sortQuery = { price: 1 }; // Sort by price ascending
                break;
            case "price_desc":
                sortQuery = { price: -1 }; // Sort by price descending
                break;
            default:
                sortQuery = { productName: 1 }; // Default sorting by product name ascending
                break;
        }

        let shirts = await mdProduct.find()
            .populate('productType')
            .populate({
                path: 'size',
                populate: [{
                    path: 'sizeCode'
                },
                {
                    path: 'color',
                    populate: 'colorCode'
                }]
            })
            .sort(sortQuery) // Apply sorting query
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
        res.status(500).json({ err: err.message });
    }
}

/////////// II. API PRODUCT TYPE
//get all productType
exports.getAllProductType = async (req, res) => {
    try {
        let productTypes = await mdProductType.find();
        res.status(200).json(productTypes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
