// load up the user model
var User = require('../../features/user/user-model');
var configAuth = require('./auth-passport');

module.exports = function(passport) {
  require('./local-passport')(passport, User);
  require('./google-passport')(passport, User, configAuth);
  require('./facebook-passport')(passport, User, configAuth);

};
