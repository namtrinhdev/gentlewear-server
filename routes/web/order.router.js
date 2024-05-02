var express = require('express');
var router = express.Router();
var orderCtrl = require('../../controllers/web/order.controller');

router.get('/', orderCtrl.getOrderManagementPage);

router.post('/update-status', orderCtrl.updateOrderStatus);



module.exports = router;