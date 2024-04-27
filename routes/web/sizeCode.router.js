var express = require('express');
var router = express.Router();
var sizeCodeCtrl = require('../../controllers/web/sizeCode.controller');
var checkLogin = require('../../middleware/checklogin');

router.get('/', sizeCodeCtrl.getSizeCodePage);
router.post('/', sizeCodeCtrl.getSizeCodePage);

module.exports = router;
