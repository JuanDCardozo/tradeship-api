// ==================================================================
// user-auth.js handles all the registration and user authentification.
// if the credentials are in the database then return jwt token. If
// it is not it creates a new user and returns a token.
// ==================================================================

const jwt = require('jsonwebtoken');
const configAuth = require('../../config/passport/auth-passport');

module.exports = function(app, passport) {
  // ==================================================================
  // HELPER FUNCTIONS =================================================
  // ==================================================================

  // Generate an Access Token for the given User ID
  function generateAccessToken(userId) {
    const expiresIn = '1 hour';
    const audience = configAuth.token.audience;
    const issuer = configAuth.token.issuer;
    const secret = configAuth.token.secret;

    const token = jwt.sign({}, secret, {
      expiresIn: expiresIn,
      audience: audience,
      issuer: issuer,
      subject: userId.toString()
    });

    return token;
  }

  // Generate the Token for the user auth then redirect to client
  function generateUserTokenRedirect(req, res) {
    const accessToken = generateAccessToken(req.user._id);
    console.log('GenerateUserTokenRedirect(), with token: ' + accessToken);
    res.redirect('http://localhost:4200/home/?accessToken=' + accessToken);

  }

  // Generate the Token for the user auth then send to client
  function generateUserTokenSend(req, res) {
    const accessToken = generateAccessToken(req.user._id);
    console.log('GenerateUserTokenSend(), with token: ' + accessToken);
    res.send('http://localhost:4200/home/?accessToken=' + accessToken);

  }

  // ==================================================================
  // LOCAL SIGNUP-LOGIN  ==============================================
  // ==================================================================


  // process the login form
  app.post('/login', passport.authenticate('local-login', {
      session: false
    }),
    generateUserTokenSend);

  // process the signup form
  app.post('/signup',
    passport.authenticate('local-signup', {
      session: false
    }),
    generateUserTokenSend);

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
    generateUserTokenRedirect);


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
    generateUserTokenRedirect);
}
