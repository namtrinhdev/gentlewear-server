var express = require('express');
var router = express.Router();
var multer = require('multer');
var objUpload = multer({dest: './uploads'});
var userCtrl = require('../../controllers/api/user.api.controller');

router.get('/', userCtrl.getAll);
router.post('/login', userCtrl.checkLogin);
router.post('/register', userCtrl.postRegister);
router.put('/:id', userCtrl.changePassword);
router.put('/', userCtrl.changePassword);

module.exports = router;       
 