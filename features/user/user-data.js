// ==================================================================
// user-addAccounts.js handles all the registration and user authentification.
// if the credentials are in the database then return jwt token. If
// it is not it creates a new user and returns a token.
// ==================================================================
var configAuth = require('../../config/passport/auth-passport');
// load up the user model
var User = require('./user-model');
const jwt = require('jsonwebtoken');
module.exports = function(app, passport) {

  // Returns the users profile data like name, last name, reviews, etc
  // app.get('/profile', passport.authenticate('jwt', {
  //     session: false
  //   }),
  //   function(req, res) {
  //     console.log(req.user)
  //     res.send(req.user);
  //   }
  // );

  app.get('/profile', function(req, res) {
    console.log("in profile before verify")
    console.log(req.get('Authorization'))
    try {
      var decoded = jwt.verify(req.get('Authorization'), configAuth.token.secret);
    } catch (err) {
      console.log("Error In verify")
    }

    User.findById(decoded.sub, function(err, user) {
      if (err) {
        console.log(error)
      }
      if (!user) {
        console.log("No user")
      }
      console.log(user)
      res.send(user)
    });
    // console.log(req.user)
    // res.jsonp({
    //   data: req.user
    // });
  });

  app.post('/profile-update', function(req, res) {
    res.send('/profile/update is not yet implemented');
  });

}
