var express = require('express');
var router = express.Router();
var passport = require('passport');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var config = require('../../config/database')
var steamUser = require('../../model/steamuser')

router.get('/', passport.authenticate('steam'));

router.get('/callback',
  passport.authenticate('steam', {
    // successRedirect : 'http://localhost:4200/login'
    successRedirect : '/'
    // successRedirect : 'http://localhost:3000/auth/steam/authenticate'
  }));

router.get('/authenticate',
  cors({ origin: 'http://localhost:4200', credentials: true}),
  isLoggedIn,
  function(req, res) {
    steamUser.getUserById(req.user.id, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({
          success: false,
          msg: 'User not found'
        });
      } else {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 86400 // 1 day
        });
        req.session.usersteam = user;
        req.logout();
        res.json({
          success: true,
          token: 'JWT '+token,
          user: user
        });
      }
    });
  });

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.json({success: false, msg: 'User not found'});
  }
};

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
  res.json({user: req.user});
});

module.exports = router;
