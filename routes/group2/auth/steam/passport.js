var config = require('../../../../config');
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;
var mongo = require('./mongo');

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
      profile.identifier = id;
      profile.account_id = config.convertSteam64to32(profile.id)
      mongo.saveUser(profile);
      return done(null, profile);
    });
  }
));

module.exports = passport;
