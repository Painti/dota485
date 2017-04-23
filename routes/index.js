var express = require('express');
var config = require('../config');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.steam = req.session.steam
  res.locals.steam.id32 = config.convertSteam64to32(req.session.steam.id)
  res.render('index', {
    title: 'Dota485'
  });
});

module.exports = router;
