//const passport = require('passport');
//const passportJwt = require('passport-jwt');

// module.exports = function(passport, User, configAuth) {
//   var jwtOptions = {}
//   jwtOptions.jwtFromRequest = passportJwt.ExtractJwt.fromHeader("authorization");
//   jwtOptions.secretOrKey = configAuth.token.secret;
//
//   passport.use(new passportJwt.Strategy(jwtOptions, function(jwt_payload, done) {
//     console.log('IN PASSPORT-JWT!!!');
//     User.findOne({
//       '_id': jwt_payload.sub
//     }, function(err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         done(null, user);
//       } else {
//         done(null, false);
//         // or you could create a new account
//       }
//     });
//   }));
// }
var JwtBearerStrategy = require('passport-http-bearer')
module.exports = function(passport, User, configAuth) {


  passport.use(new JwtBearerStrategy(
    configAuth.token.secret,
    function(token, done) {
      console.log("Inside jwt bearer passport")
      User.findById(token.sub, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user, token);
      });
    }
  ));

}
