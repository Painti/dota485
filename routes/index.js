var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.steam = req.session.steam
  res.render('index', {
    title: 'Dota485'
  });
});


module.exports = router;
