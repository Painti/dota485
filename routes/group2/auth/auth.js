var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('./steam/passport');
var routerSteam = require('./steam/router');

router.use(passport.initialize());
router.use(passport.session());

router.use('/steam', routerSteam);

module.exports = router;
