var mongoose = require('mongoose')
var config = require('../config/database')
mongoose.connect(config.url);

var userSchema = mongoose.Schema({
  id: { type: String },
  account_id: { type: String },
  displayName: { type: String },
  _json: {type: {
    communityvisibilitystate: { type: Number },
    profilestate: { type: Number },
    lastlogoff: { type: Number },
    commentpermission: { type: Number },
    profileurl: { type: String },
    avatar: { type: String },
    avatarmedium: { type: String },
    avatarfull: { type: String },
    realname: { type: String },
    primaryclanid: { type: String },
    timecreated: { type: Number },
    personastateflags: { type: Number }
  }},
  facebook: {type: {
    id: { type: String },
    username: { type: String },
    photo: { type: String }
  }, defaults: null}
}, {collection: 'users'});

var Users = module.exports = mongoose.model('Users', userSchema);

module.exports.getUserById =  function(id, callback) {
    Users.findOne({ id: id }, callback);
  }

module.exports.saveUser =  function(newUser) {
    Users.findOne({
      id: newUser.id
    }, function (err, user) {
      if (!user) {
        var person = new Users(newUser);
        person.save(function(err) {
          if (err) return console.error(err);
          console.log(newUser.id + ' is a new User! System is saving on db.');
        });
      } else {
        console.log(newUser.id + ' logging in!');
      }
    });
  }

  module.exports.updateUser =  function(st_user, fb_user, callback) {
    var fb = {};
    fb.id = fb_user.id;
    fb.username = fb_user.displayName;
    fb.photo = fb_user.photos[0].value;

    // Users.findOneAndUpdate({id: st_user.id}, { $set: fb },{upsert: true}, callback);

    Users.findOne({
      id: st_user.id
    }, function (err, user) {
      user.facebook = fb;
      user.save(callback)
    });
  }
