
module.exports = function(app, passport) {


// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.send('Welcome to Tradeship-api!');
	});

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.json({user : req.user });
	});

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
});

require('./user/user-auth')(app,passport);
require('./user/user-addAccounts')(app,passport);
require('./user/user-unlinkAccounts')(app,passport);

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
}
