var express = require('express');
var router = express.Router();
var productCtrl = require('../../controllers/web/biill.controller')

router.get('/', productCtrl.getBill);
router.post('/', productCtrl.getBill);

module.exports = router;
