// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var configDB = require('./config/database');

// configuration ===============================================================
mongoose.connect(configDB.database); // connect to our database

require('./config/passport/routes-passport')(passport); // pass passport for configuration

	// set up our express application
	app.use(morgan('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)

	// use body parser so we can get info from POST and/or URL parameters
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use(session({
	    secret: 'tradeship-api' // session secret
	}));
	// required for passport
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./features/routes')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
