var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('heroes');
});

var test = require('./test');
router.use('/test', test);

module.exports = router;
