var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser =require('body-parser');
var logger = require('morgan');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var session=require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jobsRouter =require('./routes/jobs');
//var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


//Ajax
var monk = require('monk');
var db = monk('localhost:27017/jobsearch');

app.post('/ajaxcall',function(req,res){
  console.log(req.body.email);
  var collection = db.get('users');
  collection.findOne({email:req.body.email},function(err,user){
    console.log(user);
    if(user==null)
      res.send("true");
    else
      res.send("false");
  })
})

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))

//Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Message Middleware
app.use(flash());

//Global Vars
app.use(function (req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
})

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/jobs',jobsRouter);
//app.use('/api/login',loginRouter);

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

app.listen(3001);
module.exports = app;
