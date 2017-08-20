// ====================================================================
// user-addAccounts.js handles all the registration and user authentification.
// if the credentials are in the database then return jwt token. If
// it is not it creates a new user and returns a token.
// ====================================================================

module.exports = function(app, passport) {

  // ==================================================================
  // HOME ROUTE =======================================================
  // ==================================================================

  // Show Message and data about how to use tradeshi-api
  app.get('/', function(req, res) {
    var message = 'Welcome to Tradeship-api!';
    res.send(message);
  });

  // ==================================================================
  // FEATURE ROUTES ===================================================
  // ==================================================================

  // User features: Authenticate, add, unlink and edit account
  require('./user/user-routes')(app, passport);

  // Product features: Connect aws S3 store images and make product post
  require('./product/product-routes')(app);

  // // Trade features:
  // require('./trade/trade-routes')(app);
  //
  // // Ship features:
  // require('./ship/ship-routes')(app);
  //
  // // Match features:
  // require('./match/match-routes')(app);
  //
  // // Feed features:
  // require('./feed/feed-routes')(app);
  //
  // // Barter features:
  //   require('./barter/barter-routes')(app);
}
