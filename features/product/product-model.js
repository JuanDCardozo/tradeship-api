
var mongoose = require('mongoose');


// define the schema for our user model
var productSchema = mongoose.Schema({

    title: String,
    description: String,
    interests: String,
    keywords: {type: Array, default:[]},
    category: String,
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    img:  { data: Buffer, contentType: String },
});
// create the model for users and expose it to our app
module.exports = mongoose.model('Product', productSchema);
