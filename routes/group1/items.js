var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('./../../config/steam');


/* GET users listing. */
router.get('/', function(req, res, next) {
let  url = 'http://api.steampowered.com/IEconDOTA2_570/GetGameItems/v1?key='+config.secret;
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      res.json(JSON.parse(body));
    }
    else {
      if (response) {
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

router.get('/detail', function(req, res, next) {
let  url = 'http://www.dota2.com/jsfeed/itemdata';
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      res.json(JSON.parse(body));
    }
    else {
      if (response) {
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

module.exports = router;
