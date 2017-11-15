import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

export default class ProductsList extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      products: [],
      product: []
    };
  }
  componentDidMount() {
    axios
      .get('/api/products')
      .then((response) => {
        this.setState({
          products: response.data
        });
      });
}
handleDelete(_id) {

  if(confirm(`Are you sure you want to delete this product?`)) {
  axios
    .delete(`/api/products/${_id}`, {
        params: { id: _id }})
    .then((response) => {
      this.setState({
        products: this.state.products.filter(product => product._id !== _id)
      });
    });
  }
}
componentWillUnmount() {
  this.unmounted = true;
}

render() {
  return (
    <div>
      <Header />
      <div className="clearfix button_center">
        <Link to='/admin/products/new'>
          <button className="button"> Add Product</button>
        </Link>
      </div>
      <div className="grid-x align-center">
        {this.state.products.map((product, key) => {
          return <div key={product._id} className="products_container">
                  <Link to={`/admin/products/${product._id}/edit`}>
                    <h2 className="products_title">{product.name}</h2>
                  </Link>
                  <div className="products_title">
                    <Link to={`/admin/products/${product._id}/edit`}>
                      <button className="button">Edit {product.name}</button>
                    </Link>
                    <br/>
                    <button onClick={this.handleDelete.bind(this, product._id)} className="button alert">Delete {product.name}</button>
                  </div>
                  <div >
                    <img className="products_image" src={product.image} />
                  </div>
                 </div>
        })}
      </div>
    </div>
  );
}
}
