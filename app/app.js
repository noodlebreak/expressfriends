// Module imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config({path: __dirname + '../.env'})

var indexRouter = require('./routes/index'),
	usersRouter = require('./routes/users'),
    middlewares = require('./middlewares');

var app = express();

// Setup middlewares
middlewares.init(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Setup routes
app.use('/', indexRouter);
app.get('/api/?$', function(req, res){
	res.render('api_usage', {});
})
app.use('/api/users', usersRouter);

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
