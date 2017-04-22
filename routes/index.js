var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var t = 'Express'
  if(req.session.displayName != undefined)
    t = req.session.displayName
  res.render('index', { title: t });
});

module.exports = router;
