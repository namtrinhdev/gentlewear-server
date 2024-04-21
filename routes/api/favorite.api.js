var express = require('express');
var router = express.Router();
var favoriteCtrl = require('../../controllers/api/favorite.api.controller');

router.get('/', favoriteCtrl.getFavorites);
router.post('/toggle', favoriteCtrl.toggleFavorite);
router.post('/check', favoriteCtrl.checkFavorite);
module.exports = router;         
