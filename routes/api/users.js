var express = require('express');
var router = express.Router();
var userCtrl = require('../../controllers/api/user.api.controller');

router.get('/', userCtrl.getAll);

module.exports = router;
