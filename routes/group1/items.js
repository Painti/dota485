var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  url = 'http://www.dota2.com/jsfeed/itemdata';
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
