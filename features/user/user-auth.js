const jwt = require('jsonwebtoken');
const configAuth = require('../../config/passport/auth-passport');

module.exports = function(app, passport){
// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

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

// Generate the Token for the user authenticated in the request
function generateUserToken(req, res) {
  console.log('inside generate UserToken');
  console.log(req.user);
    //const accessToken = generateAccessToken(req.user._id);

    res.redirect(302,'http://localhost:4200/home/?accessToken=');
		// res.writeHead(302, {
    //   'Access-Control-Allow-Origin':'*',
    //   'Access-Control-Allow-Headers':'Content-Type,Origin, X-Requested-With, Content-Type, Accept, Authorization, WWW-Authenticate, X-BLURR-DEBUG',
    //   'Access-Control-Request-Method':	'POST,GET,OPTIONS',
    //             'Location': 'http://localhost:4200/home/?accessToken='+accessToken
    //         });
		// res.end();
}

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login', function(req, res) {
			res.json({'HELLO':'WORLD'});
		});

		// process the login form
		app.post('/login', passport.authenticate('local-login', { session: false }),
generateUserToken);

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', generateUserToken);

		// process the signup form
		app.post('/signup',
		passport.authenticate('local-signup', { session: false }),function(req,res){
      console.log(req.user);
      res.redirect("/signup");
    });
	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', {session: false, scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
		passport.authenticate('facebook', { session: false }),
generateUserToken);


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { session: false, scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
		passport.authenticate('google', { session: false }),
generateUserToken);
}
