var express = require('express');
var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');
var session = require('express-session');

// Connect To Database
mongoose.connect(config.url);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.url);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

var app = express();

// Middleware
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true
}));

// Middleware Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


// Group1
var heroes = require('./routes/group1/heroes');
app.use('/heroes', heroes);
var items = require('./routes/group1/items');
app.use('/items', items);
var mmr = require('./routes/group1/mmr');
app.use('/mmr', mmr);

// Group2
<<<<<<< HEAD
var users = require('./routes/group2/users');
app.use('/users', users);
// var auth = require('./routes/group2/auth/auth');
// app.use('/auth', auth);
=======
var auth = require('./routes/group2/auth');
app.use('/auth', auth);
>>>>>>> 48b06fe9f4a1bfcfaca5527f0bf20bfef67f0784

app.use('/', function(req, res){
  res.send('End piont');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.url = req.url;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
