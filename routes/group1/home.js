var express = require('express');
var router = express.Router();
var config = require('./../../config/steam');
var request = require('request');


router.get('/unique', function(req, res, next) {
   url = 'http://www.dota2.com/jsfeed/uniqueusers?callback=populateUniqueUsers';
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      body = body.replace("populateUniqueUsers(", "");
      body = body.replace(");", "");
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

router.get('/status', function(req, res, next) {
   url = 'https://api.opendota.com/api/status';
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
