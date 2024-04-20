var express = require('express');
var router = express.Router();
var statisticsController = require('../../controllers/web/statistics.controller');

router.get('/', statisticsController.getStatisticsPage);

module.exports = router;
