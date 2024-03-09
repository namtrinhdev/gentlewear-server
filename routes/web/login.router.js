var express = require('express');
var router = express.Router();
var loginCtrl = require('../../controllers/web/login.controller')

router.get('/', loginCtrl.getLoginPage);
router.post('/', loginCtrl.postLoginPage);

module.exports = router;
