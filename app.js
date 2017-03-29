var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
var config = require('./config');
var routes = require('./routes');

var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: process.env.CLIENT_ID || '242733366198823',
    clientSecret: process.env.CLIENT_SECRET || 'eb2e4ee348ed11134015c92143349f19',
    callbackURL: 'http://localhost:3000/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

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

var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
var db = require('./db')
var session = require('express-session');
// initalize sequelize with session store
var SequelizeStore = require('connect-session-sequelize')(session.Store);
app.use(session({
  secret: 'keyboard cat',
			saveUninitialized: true,
  store: new SequelizeStore({
    db: db.sequelize
  }),
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  proxy: true // if you do SSL outside of node.
}))
// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// connect flash for flash messages
// app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
//routes here
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
