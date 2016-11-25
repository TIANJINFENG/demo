var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');

var leanengine = require('leanengine')
var routes = require('./routes/index');
var users = require('./routes/users');
var gTestData = require("./gTestData.js")
console.log(gTestData)
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use("/",express.static('public'));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});
//X-Requested-With,
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'blog.fens.me',
  resave: true, saveUninitialized: false,
  cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())


//app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.redirect('/www/index.html');
});

io.on('connection', function (socket) {
  // var strUrl = "http://www.baidu.com";
  // docking_data(strUrl,function(data){
  //
  // })
  var a = []
  setInterval(function () {
    //socket.on('cityName', function(city){
    // if(city == city){
      io.emit('new', gTestData);
    // }
    //});

  }, 1000)
});


routes(app);
server.listen(3000);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
