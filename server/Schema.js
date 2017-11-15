var mongoose = require('mongoose');

var product = new mongoose.Schema({
          image: {type: String, required : true},
          image2: {type: String, required : true},
          image3: {type: String, required : true},
          name: {type: String, required : true},
          price: {type: Number, required : true},
          weight: {type: Number, required : true},
          tag1: {type: String, required : true},
          tag2: {type: String, required : true},
          desc: {type: String, required : true}
});

module.exports = mongoose.model('Product', product);
