var express = require('express');
var session = require('express-session');
var passport = require('passport');
var router = express.Router();

router.get('/',
  passport.authenticate('steam', {
    failureRedirect: '/fail'
  }));

router.get('/return',
  passport.authenticate('steam', {
    failureRedirect: '/fail',
    session: true
  }),
  function(req, res) {
    req.session.steam = req.user
    res.redirect('/');
  });

module.exports = router;
