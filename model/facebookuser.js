var mongoose = require('mongoose')
var config = require('../config/database')
mongoose.connect(config.url);

var userSchema = mongoose.Schema({
  facebookid: { type: String },
  username: { type: String },
  photo: { type: String }
});

var FbUsers = module.exports = mongoose.model('FbUsers', userSchema);
