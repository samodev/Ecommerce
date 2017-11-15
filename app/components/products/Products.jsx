import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Pagination } from 'react-bootstrap';


import Product from './Product';

export default class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      products: [],
      search: '',
      checkboxState: false,
      currentPage: 1,
      productsPerPage: 3
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
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
    window.scrollTo(0, 200);
  }
  updateSearch(event) {
    this.setState({search: event.target.value})
  }
  sortByPrice() {
    this.setState(prevState => {
      this.state.products.sort((a, b) => (a.price - b.price))
    });
  }
  sortByWeight() {
    this.setState(prevState => {
      this.state.products.sort((a, b) => (a.weight - b.weight))
    });
  }
  sortByTag1() {
    if (this.state.checkboxState != true) {
       this.setState({products: this.state.products.filter(product => product.tag1 == 'samsung'), checkboxState: true});
   } else if (this.state.checkboxState != false ) {
       return axios
                .get('/api/products')
                .then((response) => {
                  this.setState({
                    products: response.data,
                    checkboxState: false
                  });
                });

   }
  }
  sortByTag2() {
    if (this.state.checkboxState != true) {
      this.setState({products: this.state.products.filter(product => product.tag1 == 'apple'), checkboxState: true});
    } else if (this.state.checkboxState != false ) {
      return axios
              .get('/api/products')
              .then((response) => {
                this.setState({
                  products: response.data,
                  checkboxState: false
                });
              });

    }
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  render() {
    const { products, currentPage, productsPerPage } = this.state;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const filter = products.filter((product) => {
      return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
             product.desc.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
             product.tag1.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
             product.tag2.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });
    const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(filter.length / productsPerPage); i++) {
              pageNumbers.push(i);
            };
    const renderPageNumbers = pageNumbers.map(number => {
            if (number == currentPage) {
              return (
                <div key={number} id="active_page_number"> {number} </div>
              );
            } else {
              return (
                <a key={number} id={number} onClick={this.handleClick.bind(this)}>
                  {number}
                </a>
              );
            }
    });
    return (
      <div>
        <div className='float-left'>
          <p>Sort By:</p>
          <p>
            <input type="checkbox" id="price" name="price"
              value="price" onChange={this.sortByPrice.bind(this)}
              defaultChecked={this.state.checkboxState}>
            </input>
            <label htmlFor="price">Price</label>
          </p>
          <p>
            <input type="checkbox" id="weight" name="weight"
              value="weight" onChange={this.sortByWeight.bind(this)}
              defaultChecked={this.state.checkboxState}>
            </input>
            <label htmlFor="weight">Weight</label>
          </p>
        </div>
        <div className="float-right">
          <p>Filter:</p>
          <p>
            <input type="checkbox" id="tag1" name="tag" defaultChecked={this.state.checkboxState} onChange={this.sortByTag1.bind(this)}></input>
            <label htmlFor="tag1">Samsung</label>
          </p>
          <p>
            <input type="checkbox" id="tag2" name="tag" defaultChecked={this.state.checkboxState} onChange={this.sortByTag2.bind(this)}></input>
            <label htmlFor="tag2">Apple</label>
          </p>
        </div>
        <input type="search" id="search" name="search"
         placeholder="Search a product" ref="searchText"
         value={this.state.search}
         onChange={this.updateSearch.bind(this)}
         ></input>
        <div>
          {filter.map((product, key) => {
            return <div key={product._id} className="clearfix products_container">
              <div>
                <Link to={`/products/${product._id}`}>
                  <h2 className="products_title">{product.name}</h2>
                    <div className="image_container">
                      <img src={product.image}  className="float-left products_image"/>
                    </div>
                </Link>
              </div>
              <div className="product_info">
                <div>{product.desc}<br />
                  <div className="product_info2">Tags :  {product.tag1} , {product.tag2}<br />
                                                 Price : {product.price} euros<br />
                                                 Weight : {product.weight} kg<br />
                   <Link to={`/products/${product._id}`}>More information</Link>
                  </div>
                </div>
              </div>
            </div>
          }).slice(indexOfFirstProduct, indexOfLastProduct)}
        </div>
        <div id="page-numbers">
          {renderPageNumbers}
        </div>
      </div>
    );
  }
}
