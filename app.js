var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'cs485',
  name: 'authSteam',
  resave: true,
  saveUninitialized: true
}));

var index = require('./routes/index');
app.use('/', index);

// Group1
var heroes = require('./routes/group1/heroes');
app.use('/heroes', heroes);
var items = require('./routes/group1/items');
app.use('/items', items);

// Group2
var users = require('./routes/group2/users');
app.use('/users', users);
var auth = require('./routes/group2/auth/auth');
app.use('/auth', auth);

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
