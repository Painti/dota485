var config = require('../../config');
var express = require('express');
var router = express.Router();
var session = require('express-session');
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;
var mongoose = require('mongoose');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: 'http://' + config.hostname + ':' + config.port + '/auth/steam/return',
    realm: 'http://' + config.hostname + ':' + config.port + '/',
    apiKey: config.st_key
  },
  function(id, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function() {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = id;
      return done(null, profile);
    });
  }
));

router.use(passport.initialize());
router.use(passport.session());

router.get('/steam',
  passport.authenticate('steam', {
    failureRedirect: '/fail'
  }),
  function(req, res) {
    res.redirect('/successs');
  });

router.get('/steam/return',
  // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail
  function(req, res, next) {
    req.url = req.originalUrl;
    next();
  },
  passport.authenticate('steam', {
    failureRedirect: '/fail'
  }),
  function(req, res) {
    res.redirect('/successs');
  });

module.exports = router;
