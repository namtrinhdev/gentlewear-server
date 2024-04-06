var express = require('express');
var router = express.Router();
var multer = require('multer');
var objUpload = multer({dest: './uploads'});
var productCtrl = require('../../controllers/api/product.api.controller');

router.get('/', productCtrl.getAllProductWithPage);
router.get('/search', productCtrl.searchProductByName);
router.get('/filter', productCtrl.filterProducts);
router.get('/pt', productCtrl.getAllProductType);
router.get('/sort', productCtrl.sortProducts);
module.exports = router;         
