var express = require('express');
var router = express.Router();

/* GET users listing. */




router.get('/profile_player', function(req, res, next) {
  let url = 'https://api.opendota.com/api/players/193605174';

  request(api_profile, function(err, response, body) {
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

router.get('/recentMatch', function(req, res, next) {
  let url = 'https://api.opendota.com/api/players/193605174/recentMatches';

  request(api_profile, function(err, response, body) {
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

  request(api_profile, function(err, response, body) {
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

  request(api_profile, function(err, response, body) {
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

  request(api_profile, function(err, response, body) {
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
