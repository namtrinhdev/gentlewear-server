var express = require('express');
var router = express.Router();
var sizeCtrl = require('../../controllers/web/size.controller')

router.get('/', sizeCtrl.listSize);

router.get('/add', sizeCtrl.addSize);

router.post('/add', sizeCtrl.addSize);

module.exports = router;
