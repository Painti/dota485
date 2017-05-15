var express = require('express');
var router = express.Router();

//Group 1
var heroes = require('./group1/heroes');
router.use('/heroes', heroes);
var items = require('./group1/items');
router.use('/items', items);
var mmr = require('./group1/mmr');
router.use('/mmr', mmr);


//Gruop 2
var opendota = require('./group2/opendota');
router.use('/opendota', opendota);


var hero_player = require('./group2/hero_player');
router.use('/hero_player', hero_player);
var recentMatch = require('./group2/recentMatch');
router.use('/recentMatch', recentMatch);
var wl = require('./group2/winAndLose');
router.use('/wl', wl);
var profile = require('./group2/profile');
router.use('/profile', profile);
var peer = require('./group2/peer');
router.use('/peer', peer);

module.exports = router;
