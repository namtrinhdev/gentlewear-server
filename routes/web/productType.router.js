var express = require('express');
var router = express.Router();
var productTypeCtrl = require('../../controllers/web/productType.controller');
var checkLogin = require('../../middleware/checklogin');

router.get('/', productTypeCtrl.getProductTypePage);
router.post('/', productTypeCtrl.getProductTypePage);

module.exports = router;
