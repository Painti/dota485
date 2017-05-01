var express = require('express');
var router = express.Router();
var passport = require('passport');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var config = require('../../config/database')
var facebookUser = require('../../model/facebookuser')
var request = require("request")
var LocalStorage = require('node-localstorage')

router.post('/', passport.authenticate('facebook'), function(req, res) {

});

router.get('/callback',
  passport.authenticate('facebook', {
    // successRedirect : 'http://localhost:4200/profile/setting'
    // successRedirect : 'http://localhost:3000/auth/facebook/authenticate',
    failureRedirect : '/fail'
  }),function(req, res) {
    res.redirect('http://localhost:3000/auth/facebook/authenticate');
  });

router.get('/authenticate',
  // cors({ origin: 'http://localhost:4200', credentials: true}),
  isLoggedIn,
  function(req, res) {
    res.json({
      fb : req.user
    });
  });

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.json({success: false, msg: 'User not found'});
  }
};

module.exports = router;
