
module.exports = function(app, passport) {


// normal routes =====================================================

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

// features routes ==================================================
// User features: Authenticate, add, unlink and edit account
require('./user/user-routes')(app, passport);

// Product features: Connect aws S3 store images and make product post
require('./product/product-routes')(app);

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
}
