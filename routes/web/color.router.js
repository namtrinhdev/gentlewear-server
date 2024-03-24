var express = require('express');
var router = express.Router();
var colorCtrl = require('../../controllers/web/color.controller')

router.get('/', colorCtrl.listColor);

router.get('/add', colorCtrl.addColor);
router.post('/add', colorCtrl.addColor);

module.exports = router;
