// ====================================================================
// user-addAccounts.js handles all the registration and user authentification.
// if the credentials are in the database then return jwt token. If
// it is not it creates a new user and returns a token.
// ====================================================================


// ====================================================================
// SETUP ==============================================================
// ====================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var configDB = require('./config/database');


// ====================================================================
// CONFIGURATION  =====================================================
// ====================================================================

// connect to our database
mongoose.connect(configDB.database);

// pass passport for configuration
require('./config/passport/routes-passport')(passport);

// log every request to the console
app.use(morgan('dev'));

// read cookies (needed for auth)
app.use(cookieParser());

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//setup passport for authentication
app.use(passport.initialize());

// ====================================================================
// ROUTES  ============================================================
// ====================================================================

// load our routes and pass in our app and fully configured passport
require('./features/routes')(app, passport);


// ====================================================================
// LAUNCH  ============================================================
// ====================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
