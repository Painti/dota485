var express = require('express');
var router = express.Router();
var config = require('./../../config/steam');
var request = require('request');

router.get('/', function(req, res, next) {
// let  url = 'http://www.dota2.com/jsfeed/itemdata';
//   request(url, function(err, response, body) {
//     if (!err && response.statusCode < 400)
//     {
//       res.json(JSON.parse(body));
//     }
//     else {
//       if (response) {
//         console.log(response.statusCode);
//       }
//       next(err);
//     }
//   });
});

module.exports = router;
