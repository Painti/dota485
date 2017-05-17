var express = require('express');
var request = require('request');
var router = express.Router();
var request = require('request');



/* GET users listing. */




router.get('/profile_player', function(req, res, next) {
  let url = 'https://api.opendota.com/api/players/193605174';

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

<<<<<<< HEAD

=======
>>>>>>> f67f8e512c16f9e0c1f00023833075145a9eb688
router.get('/recentMatch', function(req, res, next) {
  let url = 'https://api.opendota.com/api/players/193605174/recentMatches';

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

router.get('/wl', function(req, res, next) {
let url = 'https://api.opendota.com/api/players/193605174/wl';

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

router.get('/peers', function(req, res, next) {
  let url = 'https://api.opendota.com/api/players/193605174/peers';

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

router.get('/heroes', function(req, res, next) {
let url = 'https://api.opendota.com/api/players/193605174/heroes';

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
<<<<<<< HEAD

=======
>>>>>>> f67f8e512c16f9e0c1f00023833075145a9eb688



module.exports = router;
