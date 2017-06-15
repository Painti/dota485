var express = require('express');
var router = express.Router();
var config = require('./../../config/steam');
var request = require('request');
var server = require('../../config/server');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var //url = 'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=' + config.secret;
   url = 'http://www.dota2.com/jsfeed/heropickerdata';
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      res.json(JSON.parse(body)); // ใช้สำหรับ url บน
      // res.send(body); // ใช้สำหรับ url ล่าง
    }
    else {
      if (response) {
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});
router.get('/herostat', function(req, res, next) {
  var //url = 'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=' + config.secret;
   url = 'https://api.opendota.com/api/heroStats';
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

router.get('/herostat/:hero_name', function(req, res, next) {
  let listheroes_url = 'http://' + server.hostname + ':' + server.port + '/data/opendota/heroes';

  request(listheroes_url, function(err, response, listheroes) {
    if (!err && response.statusCode < 400) {
      listheroes = JSON.parse(listheroes);
      let temp = 0;
      let hName ="npc_dota_hero_"+req.params.hero_name;
      for (var i = 0; i < listheroes.length; i++) {
          if(listheroes[i]!=null){
          if(hName == listheroes[i].name){
            temp = listheroes[i].id;
            break;
          }
        }
      }

      url = 'https://api.opendota.com/api/benchmarks?hero_id='+temp;
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
    } else {
      if (response) {
        console.log(response.statusCode);
      }
      next(err);
    }
  });


});

router.get('/detail', function(req, res, next) {
   url = 'http://www.dota2.com/jsfeed/heropediadata?feeds=herodata&l=english&callback=HeropediaDFReceive';
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      let str = body.slice(0, -2).replace("HeropediaDFReceive(",'');
      res.json(JSON.parse(str));
    }
    else {
      if (response) {
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});
router.get('/stat/:hero_name', function(req, res, next) {
   url = 'http://www.dota2.com/jsfeed/heropediadata?feeds=herodata&l=english&callback=HeropediaDFReceive';
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      let str = body.slice(0, -2).replace("HeropediaDFReceive(",'');
      let data = JSON.parse(str);
      let arr = [];
      for (var k in data['herodata']) {
        if(k.search(req.params.hero_name) == 0){
          arr.push(data['herodata'][k]);
        }
      }
      res.json(arr);
    }
    else {
      if (response) {
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

router.get('/skills/:hero_name', function(req, res, next) {
   url = 'http://www.dota2.com/jsfeed/heropediadata?feeds=abilitydata&l=english&callback=HeropediaDFReceive';
  request(url, function(err, response, body) {
    if (!err && response.statusCode < 400) {
      let str = body.slice(0, -2).replace("HeropediaDFReceive(",'');
      let data = JSON.parse(str);
      let arr = [];
      for (var k in data['abilitydata']) {
        if(k.search(req.params.hero_name) == 0){
          arr.push(data['abilitydata'][k]);
        }
      }
      res.json(arr);
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
