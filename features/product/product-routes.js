var Product = require('./product-model.js');

module.exports = function(app){
  require('./product-add')(app, Product);

}
