var express = require('express');
var router = express.Router();
var colorCodeCtrl = require('../../controllers/web/colorCode.controller')


router.get('/', colorCodeCtrl.getColorCodePage);
router.post('/', colorCodeCtrl.getColorCodePage);


module.exports = router;