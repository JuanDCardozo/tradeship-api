
// load up the user model
var User       		= require('../../features/user/user-model');
var configAuth = require('./auth-passport');

module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    require('./local-passport')(passport, User);
    require('./google-passport')(passport, User, configAuth);
    require('./facebook-passport')(passport, User, configAuth);

};
