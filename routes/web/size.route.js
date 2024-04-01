var express = require('express');
var router = express.Router();
var sizeCtrl = require('../../controllers/web/size.controller')

router.get('/', sizeCtrl.getSizePage);
router.post('/', sizeCtrl.getSizePage);

module.exports = router;
