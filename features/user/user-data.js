// ==================================================================
// user-addAccounts.js handles all the registration and user authentification.
// if the credentials are in the database then return jwt token. If
// it is not it creates a new user and returns a token.
// ==================================================================

// load up the user model
var User = require('./user-model');


module.exports = function(app, passport, jwtToken) {

  app.get('/profile', jwtToken.authEndpoint, function(req, res) {

    User.findById(req.user_id, function(err, user) {
      if (err) {
        console.log(error)
      }
      if (!user) {
        console.log("No user");
        res.send("No User");
      }
      console.log(user);
      res.send(user);
    });

  });

  app.post('/profile-update', function(req, res) {
    res.send('/profile/update is not yet implemented');
  });

}
