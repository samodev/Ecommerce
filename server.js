var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var keys = require('./config/Keys');
var bodyParser = require("body-parser");
var Product = require('./server/Schema');

var app = express();
var router = express.Router();
const PORT = process.env.PORT || 3000;

mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/api', router);

app.use( (req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('https://' + req.hostname + req.url);
  } else {
    next();
  }
});

router.get('/', (req, res) => {
  res.json({ message: 'Not a lot of products !' });
});

app.use(express.static('./public'));

app.all('/*', (req, res) => {
  res.sendFile(__dirname+'/public/index.html')
});

var productsRoute = router.route('/products');

// ADD PRODUCT
productsRoute.post((req, res) => {
  var product = new Product();

  product.image    = req.body.image;
  product.image2   = req.body.image3;
  product.image3   = req.body.image2;
  product.name     = req.body.name;
  product.price    = req.body.price;
  product.weight   = req.body.weight;
  product.tag1     = req.body.tag1;
  product.tag2     = req.body.tag2;
  product.desc     = req.body.desc;

  product.save((err) => {
    if (err) {
      return res.send(err);
    }
    res.json({message: 'Product added !', data: product });
  });
});

var productsRoutePaginate = router.route('/products/:page');


//GET ALL PRODUCT
productsRoute.get((req,res, next) => {
  var perPage = 3
  var page = req.params.page || 1

  Product.find((err, products) => {
    if (err) {
      return res.send(err);
    }
    res.json(products);
  });
});

var productRoute = router.route('/products/:product_id');

// GET ONE PRODUCT
productRoute.get((req,res) => {
  Product.findById(req.params.product_id, (err, product) => {
    if(err) {
      return res.send(err);
    }
    res.json(product);
  });
});

// PUT PRODUCT
productRoute.put((req, res) => {
  Product.findById(req.params.product_id, (err, product) => {

    product.image    = req.body.image;
    product.image2   = req.body.image2;
    product.image3   = req.body.image3;
    product.name     = req.body.name;
    product.price    = req.body.price;
    product.weight   = req.body.weight;
    product.tag1     = req.body.tag1;
    product.tag2     = req.body.tag2;
    product.desc     = req.body.desc;

    product.save((err) => {
      if(err) {
        return  res.send(err);
      }
      res.json(product);
    });
  });
});

//REMOVE PRODUCT
productRoute.delete((req,res) => {
  Product.findByIdAndRemove(req.params.product_id, (err) => {
    if(err) {
      return res.send(err);
    }
    res.json({message: 'Product removed !'});
  });
});

app.listen(PORT, () => {
  console.log('Express server is up on port ' + PORT);
});
