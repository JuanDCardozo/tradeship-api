// ==================================================================
// user-auth.js handles all the registration and user authentification.
// if the credentials are in the database then return jwt token. If
// it is not it creates a new user and returns a token.
// ==================================================================

module.exports = function(app, passport, jwtToken) {

  // ==================================================================
  // LOCAL SIGNUP-LOGIN  ==============================================
  // ==================================================================

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
      session: false
    }),
    jwtToken.generateUserTokenSend);

  // process the signup form
  app.post('/signup',
    passport.authenticate('local-signup', {
      session: false
    }),
    jwtToken.generateUserTokenSend);

  // =================================================================
  // FACEBOOK LOGIN ==================================================
  // =================================================================

  // send to facebook to do the authentication
  app.get('/auth/facebook', passport.authenticate('facebook', {
    session: false,
    scope: 'email'
  }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      session: false
    }),
    jwtToken.generateUserTokenRedirect);


  // ================================================================
  // GOOGLE LOGIN  ==================================================
  // ================================================================

  // send to google to do the authentication
  app.get('/auth/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
  }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      session: false
    }),
    jwtToken.generateUserTokenRedirect);
}
