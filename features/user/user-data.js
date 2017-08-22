// ==================================================================
// user-addAccounts.js handles all the registration and user authentification.
// if the credentials are in the database then return jwt token. If
// it is not it creates a new user and returns a token.
// ==================================================================

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

  app.get('/profile', passport.authenticate('jwt', {
      session: false
    }),
    function(req, res) {
      res.send('It Worked!');
    }
  );

  app.post('/profile-update', function(req, res) {
    res.send('/profile/update is not yet implemented');
  });

}
