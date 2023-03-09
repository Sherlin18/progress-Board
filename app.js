var createError   = require('http-errors');
var express       = require('express');
var session       = require('express-session');
var MongoDBStore  = require('connect-mongodb-session')(session);
var path          = require('path');
var cookieParser  = require('cookie-parser');
var nunjucks      = require('nunjucks');
// var commaFilter   = require('nunjucks-comma-filter');
var config        = require('./config');
// const favicon     = require('express-favicon');

var db            = require('./lib/db');
var indexRouter   = require('./routes/index');

var app = express();

var store = new MongoDBStore({
  uri: config.mongodb,
  collection: 'session'
});

//store error
store.on('error', function(error) {
  console.log(error);
});

// view engine setup
var env = nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app,
  noCache: config.debug,
  trimBlocks: true
});
app.set('view engine', 'html');

// env.addFilter('comma', commaFilter);

// app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(
  {
    secret: 'rainbow',
    resave: false,
    saveUninitialized: true,
    store: store
  }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;