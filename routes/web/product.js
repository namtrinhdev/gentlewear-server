var express = require('express');
var router = express.Router();
var productCtrl = require('../../controllers/web/product.controller');
var checkLogin = require('../../middleware/checklogin');
var multer = require('multer');
var objUpload = multer({dest: './uploads'});

router.get('/', productCtrl.getProductPage);
router.post('/',objUpload.single("image"), productCtrl.getProductPage);


module.exports = router;
