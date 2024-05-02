var express = require('express');
var router = express.Router();
var tkContr = require('../../controllers/web/statistics.controller');

/* GET home page. */
router.get('/', tkContr.getStatisticsPage);

module.exports = router;
