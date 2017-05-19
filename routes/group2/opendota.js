var express = require('express');
var router = express.Router();
var request = require('request');
var url = require('url');
var server = require('../../config/server');
var fs = require('fs');
var path = require('path');


router.get('/getreq/:id', function(req, res, next) {
  let url = 'https://api.opendota.com/api/request/' + req.params.id;
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      res.json(JSON.parse(body));
    } else {
      res.json({
        state: 'failed'
      });
    }
  });
});

router.get('/postreq/:id', function(req, res, next) {
  let url = 'https://api.opendota.com/api/request/' + req.params.id;
  request.post({
      url: url
    },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return err;
      }
      res.json(JSON.parse(body));
    });
});

router.get('/matches/:id', function(req, res, next) {
  let url = 'https://api.opendota.com/api/matches/' + req.params.id;
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      let match = JSON.parse(body);
      let listheroes_url = 'http://' + server.hostname + ':' + server.port + '/data/opendota/heroes';
      request(listheroes_url, function(err, response, listheroes) {
        if (!err && response.statusCode < 400) {
          listheroes = JSON.parse(listheroes);
          for (let i = 0; i < match.players.length; i++) {
            match.players[i].hero_name = listheroes[match.players[i].hero_id].name.replace('npc_dota_hero_', '');
          }
          if(match.game_mode == 0){
            match.game_mode = null;
          } else {
            let filePath = path.resolve('./data/mods.json');
            let mods_data = fs.readFileSync(filePath);
            let mods_obj = JSON.parse(mods_data);
            match.game_mode = mods_obj.mods[match.game_mode].name;
          }
          res.json(match);
        } else {
          if (response) {
            console.log(response.statusCode);
          }
          next(err);
        }
      });
    } else {
      if (response) {
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

router.get('/heroes', function(req, res, next) {
  let url = 'https://api.opendota.com/api/heroes';
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      let heroes = JSON.parse(body);
      let new_heroes = [];
      for (var i = 0; i < heroes.length; i++) {
        new_heroes[heroes[i].id] = heroes[i];
      }
      res.json(new_heroes);
    } else {
      if (response) {
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

router.get('/publicMatches', function(req, res, next) {
  let url_parts = url.parse(req.url, true);
  let low = url_parts.query.low;
  let match_url = 'https://api.opendota.com/api/publicMatches?mmr_ascending=';
  if (low == 'true') {
    match_url += '1';
  }
  request(match_url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      let data = JSON.parse(body);
      let listheroes_url = 'http://' + server.hostname + ':' + server.port + '/data/opendota/heroes';
      request(listheroes_url, function(err, response, listheroes) {
        if (!err && response.statusCode < 400) {
          listheroes = JSON.parse(listheroes);
          for (let i = 0; i < data.length; i++) {
            let team = [data[i].radiant_team.split(","), data[i].dire_team.split(",")];
            for (let k = 0; k < team.length; k++) {
              for (let j = 0; j < team[k].length; j++) {
                team[k][j] = listheroes[parseInt(team[k][j])].name.replace('npc_dota_hero_', '');
              }
            }
            data[i].radiant_team = team[0];
            data[i].dire_team = team[1];
          }
          res.json(data);
        } else {
          if (response) {
            console.log(response.statusCode);
          }
          next(err);
        }
      });
    } else {
      if (response) {
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

router.get('/:field', function(req, res, next) {
  let url = 'https://api.opendota.com/api/' + req.params.field;
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      res.json(JSON.parse(body));
    } else {
      if (response) {
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

module.exports = router;
