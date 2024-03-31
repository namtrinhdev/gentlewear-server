// Router
var express = require('express');
var router = express.Router();
var colorCtrl = require('../../controllers/web/color.controller')

router.get('/', colorCtrl.getColorPage);
router.post('/', colorCtrl.getColorPage);

module.exports = router;
