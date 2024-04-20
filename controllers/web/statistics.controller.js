var productModel = require('../../models/product.model');
var ThanhToanModel = require('../../models/ThanhToan.model');
var productTypeModel = require('../../models/productType.model');

exports.getStatisticsPage = async (req, res, next) => {
    let msg = '';
    let dateFilter = req.query.date;
    let productTypes = await productTypeModel.find();
    let productTypeRevenue = [];
    let topSellingProducts = [];
    let totalRevenue = Array(12).fill(0); // Initialize totalRevenue as an array of 12 zeros

    try {
        for (let productType of productTypes) {
            let products = await productModel.find({ productType: productType._id });
            let typeRevenue = 0;

            for (let product of products) {
                let transactions = [];
                if (dateFilter) {
                    let date = new Date(dateFilter);
                    transactions = await ThanhToanModel.find({
                        thoiGian: {
                            $gte: date,
                            $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)
                        },
                        'cart.products': product._id
                    });
                } else {
                    transactions = await ThanhToanModel.find({ 'cart.products': product._id });
                }

                for (let transaction of transactions) {
                    for (let item of transaction.cart) {
                        if (item.products.toString() === product._id.toString()) {
                            let revenue = item.soLuong * product.price;
                            typeRevenue += revenue;
                            let month = new Date(transaction.thoiGian).getMonth(); // Get the month of the transaction
                            totalRevenue[month] += revenue; // Add the revenue to the corresponding month
                        }
                    }
                }
            }

            productTypeRevenue.push({ productType: productType.tenLoai, revenue: typeRevenue });
        }

        productTypeRevenue.sort((a, b) => b.revenue - a.revenue);

        let products = await productModel.find().sort({ quantitySold: -1 }).limit(5);
        for (let product of products) {
            topSellingProducts.push({ productName: product.productName, quantitySold: product.quantitySold });
        }

        msg = 'Lấy danh sách doanh thu thành công';
        res.render('statistics/statistics', { msg: msg, productTypeRevenue: productTypeRevenue, topSellingProducts: topSellingProducts, totalRevenue: totalRevenue });
    } catch (error) {
        msg = error.message; 
        res.render('statistics/statistics', { msg: msg });
    } 
}
