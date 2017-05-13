var express = require('express');
var router = express.Router();
var request = require('request');
var sync_request = require('sync-request');
var url = require('url');

/* GET users listing. */
router.get('/publicMatches', function(req, res, next) {
  let url_parts = url.parse(req.url, true);
  let low = url_parts.query.low;
  let match_url = 'https://api.opendota.com/api/publicMatches?mmr_ascending=';
  if(low == 'true'){
    match_url += '1';
  }
  request(match_url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      let data = JSON.parse(body);
      let listheroes_url = 'https://api.opendota.com/api/heroes';
      request(listheroes_url, function(err, response, listheroes) {
        if (!err && response.statusCode < 400) {
          listheroes = JSON.parse(listheroes);
          for (let i = 0; i < data.length; i++) {
            let team = [data[i].radiant_team.split(","), data[i].dire_team.split(",")];
            for (let k = 0; k < team.length; k++) {
              for (let j = 0; j < team[k].length; j++) {
                for (let n = 0; n < listheroes.length; n++) {
                  if(listheroes[n].id == team[k][j]){
                    team[k][j] = listheroes[n].name.replace('npc_dota_hero_', '');
                    break;
                  }
                }
              }
            }
            data[i].radiant_team = team[0];
            data[i].dire_team = team[1];
          }
          res.json(data);
        }
        else {
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

router.get('/:field', function(req, res, next) {
  let url = 'https://api.opendota.com/api/' + req.params.field;
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
