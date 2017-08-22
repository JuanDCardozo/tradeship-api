const passport = require('passport');
const passportJwt = require('passport-jwt');

module.exports = function(passport, User, configAuth){

passport.use(new passportJwt.Strategy( {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
    secretOrKey: configAuth.token.secret,
    issuer: configAuth.token.issuer,
    audience: configAuth.token.audience
},function(jwt_payload, done) {
    console.log('IN PASSPORT-JWT!!!');
    User.findOne({'facebook.id': jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}));
}
