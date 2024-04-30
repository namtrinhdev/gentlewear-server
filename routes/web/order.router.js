var express = require('express');
var router = express.Router();
var orderCtrl = require('../../controllers/web/order.controller');

/* GET order management page. */
router.get('/', orderCtrl.getOrderManagementPage);

/* PUT request to update transaction status. */
router.put('/update-status/:id', orderCtrl.updateTransactionStatus);

module.exports = router;
