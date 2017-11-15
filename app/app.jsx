var React = require('react');
var ReactDOM = require('react-dom');
var {Route, BrowserRouter, Switch} = require('react-router-dom');
var Main = require('Main').default;

import Product from './components/products/Product';
import ProductsList from './admin/components/ProductsList';
import AddProducts from './admin/components/AddProducts';
import EditProducts from './admin/components/EditProducts';

// Load foundation
require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
$(document).foundation();

require('style-loader!css-loader!sass-loader!applicationStyles')




var routes = (
  <BrowserRouter>
    <Switch>
      <Route path={"/products/:id"} component={Product}></Route>
      <Route path={"/admin/products/:id/edit"} component={EditProducts}></Route>
      <Route path={"/admin/products/new"} component={AddProducts}></Route>
      <Route path={"/admin/products/"} component={ProductsList}></Route>

      <Route path="/" component={Main}></Route>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  routes,
  document.getElementById('app')
);
