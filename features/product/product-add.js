
module.exports = function(app, Product) {

	// local -----------------------------------
	app.get('/product/add', function(req, res) {
    res.send("You are in the route to product/add");
	});

	/*app.post('/product/upload-img', function(req, res) {

	});*/

  app.post('/product/add', function(req, res) {
    //Make asynchronous
    process.nextTick(function() {
        var newProduct = new Product();

        // Fill out the product information
        newProduct.title = req.body.title;
        newProduct.description = req.body.description;
        newProduct.interests  = req.body.interests;
				newProduct.keywords.push(req.body.keywords);
        newProduct.category  = req.body.category;
        newProduct.userID  = req.user;


        newProduct.save(function(err) {
            if (err){
                throw err;
            }

        	res.redirect('/product/add');
					});
				});
			});
		}
