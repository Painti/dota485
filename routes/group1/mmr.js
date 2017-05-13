var express = require('express');
var router = express.Router();
var config = require('./../../config/steam');
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var url = 'http://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=europe';
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      
      res.send(body);
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
