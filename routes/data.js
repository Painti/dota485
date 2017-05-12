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



module.exports = router;
