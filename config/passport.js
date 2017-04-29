var server = require('./server');
var steam = require('./steam');
var SteamStrategy = require('passport-steam').Strategy;
var steamuser = require('../model/steamuser');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./database');


module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  // Passport JWT
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload)
    steamuser.getUserById(jwt_payload._doc.id, (err, user) => {
      if(err){
        return done(err, false);
      }
      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));


  // Passport Steam
  passport.use(new SteamStrategy({
      returnURL: 'http://' + server.hostname + ':' + server.port + '/auth/steam/callback',
      realm: 'http://' + server.hostname + ':' + server.port + '/',
      apiKey: steam.secret
    },
    function(id, profile, done) {
      process.nextTick(function() {
        profile.identifier = id;
        profile.account_id = steam.convertSteam64to32(profile.id)
        steamuser.saveUser(profile);
        return done(null, profile);
      });
    }
  ));
}
