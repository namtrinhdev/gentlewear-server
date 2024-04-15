var express = require('express');
var router = express.Router();
var sizeCodeCtrl = require('../../controllers/web/sizeCode.controller')

router.get('/', sizeCodeCtrl.getSizeCodePage);
router.post('/', sizeCodeCtrl.getSizeCodePage);

module.exports = router;
