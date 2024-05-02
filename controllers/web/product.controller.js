var md = require('../../models/product.model');
var mdPT = require('../../models/productType.model');
var mdSize = require('../../models/size.model');
var mdColor = require('../../models/color.model');
var mdSizeCode = require('../../models/sizeCode.model');
var mdColorCode = require('../../models/colorCode.model');
var fs = require('fs');


exports.getProductPage = async (req, res, next) => {
    let list;
    let listPT;
    let listSize;
    let listColor;
    let listSizeEdit;
    try {
        //list producttype
        listPT = await mdPT.find();
        //list size
        listSize = await mdSizeCode.find();
        //list color
        listColor = await mdColorCode.find();
        //list product
        list = await md.find()
            .populate('productType')
            .populate({
                path: 'size',
                populate: [
                    { path: 'sizeCode' }
                    , {
                        path: 'color',
                        populate: 'colorCode'
                    }]
            }).sort({_id: -1});
        if (req.method == 'POST') {

            if (req.body.search != null) {
                console.log(req.body.search);
                let key = req.body.search;
                list = await md.find({
                    $or: [{ $expr: { $regexMatch: { input: { $toString: "$_id" }, regex: key } } },
                    { $expr: { $regexMatch: { input: { $toString: "$productName" }, regex: key } } }
                    ]
                }).populate('productType')
                    .populate({
                        path: 'size',
                        populate: [
                            { path: 'sizeCode' }
                            , {
                                path: 'color',
                                populate: 'colorCode'
                            }]
                    }).sort({_id:-1});
            } else {
                list = await md.find()
                    .populate('productType')
                    .populate({
                        path: 'size',
                        populate: [
                            { path: 'sizeCode' }
                            , {
                                path: 'color',
                                populate: 'colorCode'
                            }]
                    }).sort({_id:-1});
            }
            //them sp
            let validate = true;
            let productName = req.body.productName;
            let price = req.body.price;
            let quantity = req.body.quantity;
            let mota = req.body.mota;

            if (productName === '' || price === '' || quantity === '' || mota === '' || req.file.path == null
                || req.body.productType == null || req.body.sizeCode == null || req.body.colorCode == null) {
                validate = false;
            }
            if (validate) {
                console.log("in here");
                let currentTime = new Date();
                let time = formatDateTime(currentTime);
                fs.rename(req.file.path,
                    "./public/uploads/" + time + req.file.originalname,
                    (err) => {
                        if (err) {
                            console.log("err :" + err.message);
                        } else {
                            console.log("url : http://localhost:3000/uploads/" + time + req.file.originalname);
                        }
                    }
                );
                let image = time + req.file.originalname;
                let sp = new md();
                let size = new mdSize();
                let color = new mdColor();
                //product
                let PT = await mdPT.findOne({ tenLoai: req.body.productType });
                sp.productName = productName;
                sp.productType = PT;
                sp.price = price;
                sp.quantity = quantity;
                sp.mota = mota;
                sp.quantitySold = 0;
                sp.isStopSelling = false;
                //size
                let sCode = await mdSizeCode.findOne({ sizeCode: req.body.sizeCode });
                size.sizeCode = sCode;
                size.quantity = quantity;
                //color
                let cCode = await mdColorCode.findOne({ colorCode: req.body.colorCode });
                console.log("in here :" + req.body.colorCode + ', ' + cCode);
                color.colorCode = cCode._id;
                color.image = image;
                color.quantity = quantity;

                await color.save();
                color = await mdColor.find({ image: image });
                size.color = color;
                await size.save();
                size = await mdSize.find({ color: color });
                sp.size = size;
                await sp.save();
                list = await md.find().populate('productType')
                    .populate({
                        path: 'size',
                        populate: [
                            { path: 'sizeCode' }
                            , {
                                path: 'color',
                                populate: 'colorCode'
                            }]
                    }).sort({_id:-1});
            }

            //edit sp
            listSizeEdit = await mdSize.findbyId(req.body.sizeId);
        }


    } catch (err) {
        console.log(err.message);
    }
    res.render('product/productPage', { list: list, listPT: listPT, listSize: listSize, listColor: listColor, listSizeEdit: listSizeEdit});
}


function formatDateTime(date) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}