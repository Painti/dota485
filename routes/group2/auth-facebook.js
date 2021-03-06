var express = require('express');
var router = express.Router();
var passport = require('passport');
var cors = require('cors');
var config = require('../../config/database')
var steamuser = require('../../model/steamuser')
var server = require('../../config/server');

router.get('/', passport.authenticate('facebook'));

router.get('/callback',
  passport.authenticate('facebook', {
    failureRedirect : '/fail'
  }),function(req, res) {
    res.redirect(server.angular + '/profile/setting/link-facebook');
  });

router.get('/authenticate',
  cors({ origin: server.angular , credentials: true}),
  isLoggedIn,
  function(req, res) {
    steamuser.updateUser(req.session.usersteam, req.user, function(err){
      req.logout();
      if (err) {
        res.json({success : false});
      }
      res.json({success : true});
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
