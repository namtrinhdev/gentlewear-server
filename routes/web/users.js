var express = require('express');
var router = express.Router();
var userCtrl = require('../../controllers/web/user.controller');
var checkLogin = require('../../middleware/checklogin');
var multer = require('multer');
var objUpload = multer({dest: './uploads'});

/* GET user page. */
router.get('/', userCtrl.getUserPage);
router.post('/', userCtrl.getUserPage);

/* GET all users. */
router.get('/list', userCtrl.getAllUsers);

/* Lock a user. */
router.get('/lock/:id', userCtrl.lockUser);
router.post('/lock/:id', userCtrl.lockUser);

module.exports = router;
