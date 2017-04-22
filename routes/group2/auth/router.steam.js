var express = require('express');
var session = require('express-session');
var passport = require('passport');
var router = express.Router();

router.get('/',
  passport.authenticate('steam', {
    failureRedirect: '/fail'
  }),
  function(req, res) {
    res.redirect('/successs1');
  });

router.get('/return',
  // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail
  function(req, res, next) {
    req.url = req.originalUrl;
    next();
  },
  passport.authenticate('steam', {
    failureRedirect: '/fail'
  }),
  function(req, res) {
    req.session.steamid = req.user.id
    req.session.displayName = req.user.displayName;
    res.redirect('/');
  });

module.exports = router;
