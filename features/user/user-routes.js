module.exports = function(app, passport, jwtToken) {

  //
  require('./user-auth')(app, passport, jwtToken);

  //
  require('./user-addAccounts')(app, passport, jwtToken);

  //
  require('./user-unlinkAccounts')(app, passport, jwtToken);

  //
  require('./user-data')(app, passport, jwtToken);
}
