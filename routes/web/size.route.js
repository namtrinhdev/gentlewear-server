var express = require('express');
var router = express.Router();
var sizeController = require('../../controllers/web/size.controller');

// Lấy danh sách tất cả Size
router.get('/', sizeController.getAll);

// Thêm Size mới
router.post('/add', sizeController.addSize);

// Cập nhật Size
router.post('/edit/:id', sizeController.updateSize);

// Xóa Size
router.post('/delete/:id', sizeController.deleteSize);

module.exports = router;
