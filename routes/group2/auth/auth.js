var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../../config/database')
var steamUser = require('../../../model/steamuser')


router.get('/steam', passport.authenticate('steam'));

router.get('/steam/callback',
  passport.authenticate('steam', {
    session: false
  }),
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

        res.json({
          success: true,
          token: 'JWT '+token,
          user: user
        });
      }
    });
  });

  router.get('/steam/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.json({user: req.user});
  });

module.exports = router;
