// ==================================================================
// user-addAccounts.js handles all the registration and user authentification.
// if the credentials are in the database then return jwt token. If
// it is not it creates a new user and returns a token.
// ==================================================================

module.exports = function(app, passport) {
  // ==================================================================
  // LOCAL ADD ========================================================
  // ==================================================================

  app.post('/connect/local', passport.authenticate('local-signup'));

  // =================================================================
  // FACEBOOK ADD ====================================================
  // =================================================================

  // send to facebook to do the authentication
  app.get('/connect/facebook', passport.authorize('facebook', {
    scope: 'email'
  }));

  // handle the callback after facebook has authorized the user
  app.get('/connect/facebook/callback',
    passport.authorize('facebook'));

  // =================================================================
  // GOOGLE ADD ===	==================================================
  // =================================================================

  // send to google to do the authentication
  app.get('/connect/google', passport.authorize('google', {
    scope: ['profile', 'email']
  }));

  // the callback after google has authorized the user
  app.get('/connect/google/callback',
    passport.authorize('google'));

}
