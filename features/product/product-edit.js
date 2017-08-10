module.exports = function(app) {

	// local -----------------------------------
	app.get('/product/add', function(req, res) {
    res.send("You are in the route to product/add");
	});

	/*app.post('/product/upload-img', function(req, res) {

	}*/

  app.post('/product/edit', function(req, res) {
    //Make asynchronous
    process.nextTick(function() {
      Product.find({ 'Product.ObjectId' : req.body.id }, function(err, product) {


        // Fill out the product information
        product.title = req.body.title;
        product.description = req.body.description;
        product.interests  = req.body.interests;
				product.keywords.push(req.body.keywords);
        product.category  = req.body.category;
        product.userID  = req.user;


        product.save(function(err) {
            if (err){
                throw err;
            }

            // if successful, return the new product
            return done(null, product);
        }
    }

  });
