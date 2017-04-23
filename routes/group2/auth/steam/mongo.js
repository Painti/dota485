var mongoose = require('mongoose')
var mongodb_url = 'mongodb://localhost/';
mongoose.connect(mongodb_url + 'dota');

var userSchema = mongoose.Schema({
  id: { type: String },
  account_id: { type: String },
  displayName: { type: String },
  provider: { type: String },
  photos: [{ value : String }],
  _json: {type: {
    steamid: { type: String},
    communityvisibilitystate: { type: Number},
    profilestate: { type: Number},
    personaname: { type: String},
    lastlogoff: { type: Number},
    commentpermission: { type: Number},
    profileurl: { type: String},
    avatar: { type: String},
    avatarmedium: { type: String},
    avatarfull: { type: String},
    realname: { type: String},
    primaryclanid: { type: String},
    timecreated: { type: Number},
    personastateflags: { type: Number}
  } },
  facebook: {type: {
    facebookid: { type: String},
    username: { type: String},
    photo: { type: String}
  }, defaults: null}
}, {collection: 'users'});

var Users = mongoose.model('Users', userSchema);

module.exports = {
  saveUser: function(newUser) {
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
}
