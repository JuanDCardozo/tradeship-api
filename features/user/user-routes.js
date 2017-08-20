module.exports = function(app, passport) {

  //
  require('./user-auth')(app, passport);

  //
  require('./user-addAccounts')(app, passport);

  //
  require('./user-unlinkAccounts')(app, passport);

  //
  require('./user-data')(app, passport);
}
