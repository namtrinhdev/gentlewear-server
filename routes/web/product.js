var express = require('express');
var router = express.Router();
var productCtrl = require('../../controllers/web/product.controller')

router.get('/', productCtrl.getProductPage);
router.post('/', productCtrl.getProductPage);

router.get('/add', productCtrl.getAddProductPage);
router.post('/add', productCtrl.getAddProductPage);

module.exports = router;
