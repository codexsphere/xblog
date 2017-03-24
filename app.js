var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
var config = require('./config');
var routes = require('./config/routes');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const env = process.env.NODE_ENV;
if (!env || env == 'development') {
	// app.use(logger('dev'));
	app.set('json spaces', 4);
	app.use(logger('common', {
		stream: {
		  write: (message) => {
		    config.logger.info(message);
		  },
		},
	}));
}



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// Use helmet to secure Express headers
app.use(helmet());
// app.use(helmet.xframe());
// app.use(helmet.xssFilter());
// app.use(helmet.nosniff());
// app.use(helmet.ienoopen());
app.disable('x-powered-by');

// Use cors to prevent hotlink
app.use(cors());
// app.use(cors({
// origin: ['http://localhost:3001'],
// methods: ['GET', 'POST', 'PUT', 'DELETE'],
// allowedHeaders: ['Content-Type', 'Authorization'],
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express SQL session storage
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
//app.use(session({
//	saveUninitialized: true,
//	resave: true,
//	secret: config.sessionSecret,
 //   store: new SequelizeStore(db.sequelize, options, modelName),
 //   proxy: false // if you do SSL outside of node.
//}));

// use passport session
// app.use(passport.initialize());
// app.use(passport.session());

// connect flash for flash messages
// app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
