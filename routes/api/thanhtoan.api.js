var express = require('express');
var router = express.Router();
var thanhToanCtrl = require('../../controllers/api/thanhtoan.api.controller');

router.get('/waitconfirm/:idUser', thanhToanCtrl.getWaitConfirmByIdUser);//lấy tất cả danh sách chờ xác nhận theo idUser
router.get('/waitfood/:idUser', thanhToanCtrl.getWaitForFoodByIdUser);//lấy tất cả danh sách chờ lấy hàng theo idUser
router.get('/delivering/:idUser', thanhToanCtrl.getDeliveringByIdUser);//lấy tất cả danh sách đang giao theo idUser
router.get('/delivered/:idUser', thanhToanCtrl.getDeliveredByIdUser);//lấy tất cả danh sách đang giao theo idUser
router.get('/canceled/:idUser', thanhToanCtrl.getCanceledByIdUser);//lấy tất cả danh sách đang giao theo idUser

router.post('/post', thanhToanCtrl.postRequest);// thêm đơn hang

router.put('/put/:id', thanhToanCtrl.putRequest);//sửa trạng thái đơn hang
module.exports = router; 