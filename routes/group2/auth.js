var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('./auth/passport.steam');
var routerSteam = require('./auth/router.steam');

router.use(passport.initialize());
router.use(passport.session());

router.use('/steam', routerSteam);

module.exports = router;
