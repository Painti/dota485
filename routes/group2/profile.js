var express = require('express');
var request = require('request');
var router = express.Router();
var request = require('request');



/* GET users listing. */




router.get('/:id/profile_player', function(req, res, next) {
  let url = 'https://api.opendota.com/api/players/' + req.params.id;

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


router.get('/:id/recentMatch', function(req, res, next) {
  let url = 'https://api.opendota.com/api/players/'+ req.params.id +'/recentMatches';

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

router.get('/:id/wl', function(req, res, next) {
let url = 'https://api.opendota.com/api/players/'+ req.params.id +'/wl';

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

router.get('/:id/peers', function(req, res, next) {
  let url = 'https://api.opendota.com/api/players/'+ req.params.id +'/peers';

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

router.get('/:id/heroes', function(req, res, next) {
let url = 'https://api.opendota.com/api/players/'+ req.params.id +'/heroes';

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
