var express = require('express');
var router = express.Router();

var auth_steam = require('./auth-steam');
var auth_facebook = require('./auth-facebook');

router.use('/steam', auth_steam);
router.use('/facebook', auth_facebook);

module.exports = router;
