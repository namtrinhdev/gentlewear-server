var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//web
var indexRouter = require('./routes/web/index');
var usersRouter = require('./routes/web/users');
var loginRouter = require('./routes/web/login.router');
var colorCodeRouter = require('./routes/web/colorcode.router');
var colorRouter = require('./routes/web/color.router');
var sizeRouter = require('./routes/web/size.route');
var productRouter = require('./routes/web/product.route');
//api
var apiUserRouter = require("./routes/api/users.api");
var apiProductRouter = require("./routes/api/products.api");
var apiThanhToanRouter = require("./routes/api/thanhtoan.api");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//web
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/color', colorRouter);
app.use('/colorCode', colorCodeRouter);
app.use('/size', sizeRouter);
app.use('/product', productRouter);
//api
app.use('/api/users',apiUserRouter);
app.use('/api/products',apiProductRouter);
app.use('/api/orders',apiThanhToanRouter);


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