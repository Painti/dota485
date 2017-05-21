var express = require('express');
var router = express.Router();

//Group 1
var heroes = require('./group1/heroes');
router.use('/heroes', heroes);
var items = require('./group1/items');
router.use('/items', items);
var mmr = require('./group1/mmr');
router.use('/mmr', mmr);
var quiz = require('./group1/quiz');
router.use('/quiz', quiz);

//Gruop 2
var opendota = require('./group2/opendota');
router.use('/opendota', opendota);

var profile = require('./group2/profile');
router.use('/profile', profile);

module.exports = router;
