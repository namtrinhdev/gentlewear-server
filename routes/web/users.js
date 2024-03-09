var express = require('express');
var router = express.Router();
var userCtrl = require('../../controllers/web/user.controller')
/* GET user page. */
router.get('/', userCtrl.getUserPage);
router.post('/', userCtrl.getUserPage);

module.exports = router;