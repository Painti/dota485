var express = require('express');
var request = require('request');
var router = express.Router();
var request = require('request');
var server = require('../../config/server');
var fs = require('fs');
var path = require('path');



/* GET users listing. */




router.get('/:id/profile_player', function(req, res, next) {
  let url = 'https://api.opendota.com/api/players/' + req.params.id;

  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      res.json(JSON.parse(body));
    }
    else {
      res.json({tracked_until: null});
    }
  });
});

router.get('/hero_stats', function(req, res, next) {
  let url = 'https://api.opendota.com/api/heroStats' ;

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

router.get('/:id/totals', function(req, res, next) {
  let url = 'https://api.opendota.com/api/players/'+req.params.id+'/totals' ;

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
      var data = JSON.parse(body) ;
      let listheroes_url = 'http://' + server.hostname + ':' + server.port + '/data/opendota/heroes';
      let filePath = path.resolve('./data/mods.json');
      let mods_data = fs.readFileSync(filePath);
      let mods_obj = JSON.parse(mods_data);
      request(listheroes_url, function(err, response, listheroes) {
        if (!err && response.statusCode < 400) {
          listheroes = JSON.parse(listheroes);
          for (let i = 0; i < data.length; i++) {
            data[i].heroes_name = listheroes[data[i].hero_id].name.replace('npc_dota_hero_', '');
            data[i].game_mode = mods_obj.mods[data[i].game_mode].name;
          }



          res.json(data);
        } else {
          if (response) {
            console.log(response.statusCode);
          }
          next(err);
        }
      });
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
      var data = JSON.parse(body) ;
      let listheroes_url = 'http://' + server.hostname + ':' + server.port + '/data/opendota/heroes';
      request(listheroes_url, function(err, response, listheroes) {
        if (!err && response.statusCode < 400) {
          listheroes = JSON.parse(listheroes);
          for (let i = 0; i < data.length; i++) {
            data[i].heroes_name = listheroes[data[i].hero_id].name.replace('npc_dota_hero_', '');
          }
          res.json(data);
        } else {
          if (response) {
            console.log(response.statusCode);
          }
          next(err);
        }
      });
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
