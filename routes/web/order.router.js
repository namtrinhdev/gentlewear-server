var express = require('express');
var router = express.Router();
var orderCtrl = require('../../controllers/web/order.controller');

/* GET order management page. */
router.get('/', orderCtrl.getOrderManagementPage);

module.exports = router;
