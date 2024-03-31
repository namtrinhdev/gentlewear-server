var express = require('express');
var router = express.Router();
var productCtrl = require('../../controllers/web/product.controller')

router.get('/', productCtrl.getProductPage);
router.post('/', productCtrl.getProductPage);

module.exports = router;
