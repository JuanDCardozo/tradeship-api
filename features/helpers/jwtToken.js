const jwt = require('jsonwebtoken');
var configAuth = require('../../config/passport/auth-passport');

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

module.exports = {
  // ==================================================================
  // HELPER FUNCTIONS =================================================
  // ==================================================================


  // Generate the Token for the user auth then redirect to client
  generateUserTokenRedirect: function(req, res) {
    const accessToken = generateAccessToken(req.user._id);
    console.log('GenerateUserTokenRedirect(), with token: ' + accessToken);
    res.redirect('http://localhost:4200/home/?accessToken=' + accessToken);

  },

  // Generate the Token for the user auth then send to client
  generateUserTokenSend: function(req, res) {
    const accessToken = generateAccessToken(req.user._id);
    console.log('GenerateUserTokenSend(), with token: ' + accessToken);
    res.send('http://localhost:4200/home/?accessToken=' + accessToken);

  },

  // Authorize an endpoint and return the subject.
  authEndpoint: function(req, res, next) {
    try {
      var decoded = jwt.verify(req.get('Authorization'), configAuth.token.secret);
    } catch (err) {
      console.log("Error: jwtToken could not be verified");
      res.send("Error: jwtToken could not be verified");
    }

    if (decoded.sub != null) {
      req.user_id = decoded.sub;
      next();
    } else {
      res.send("Error: subject is empty");
    }
  }

}
