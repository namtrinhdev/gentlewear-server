var express = require('express');
var router = express.Router();
var productCtrl = require('../../controllers/web/product.controller');
var checkLogin = require('../../middleware/checklogin');
var multer = require('multer');
var objUpload = multer({dest: './uploads'});

router.get('/', productCtrl.getProductPage);
router.post('/', productCtrl.getProductPage);

router.get('/add', productCtrl.getAddProductPage);
router.post('/add', productCtrl.getAddProductPage);

module.exports = router;
