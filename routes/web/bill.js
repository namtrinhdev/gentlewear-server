var express = require('express');
var router = express.Router();
var productCtrl = require('../../controllers/web/biill.controller')

router.get('/', productCtrl.getBill);
router.post('/', productCtrl.getBill);

router.get('/confirmed', productCtrl.getBillConfirmed);
router.post('/confirmed', productCtrl.getBillConfirmed);

router.get('/delivering', productCtrl.getBillDelivering);
router.post('/delivering', productCtrl.getBillDelivering);

router.get('/delivered', productCtrl.getBillDelivered);
router.post('/delivered', productCtrl.getBillDelivered);

router.get('/cance', productCtrl.getBillCance);
router.post('/cance', productCtrl.getBillCance);

module.exports = router;
