import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import Header from '../Header';

export default class Product extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      product: []
    };
  }
  componentDidMount() {
    var id = this.props.match.params.id
    axios
      .get(`/api/products/${id}`)
      .then((response) => {
        this.setState({
          product: response.data
        });
      });
  }
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true

    };
    var product = this.state.product;
    return (
      <div>
        <Header />
        <div className='grid-x align-center'>
          <div className="cell small-centered medium-6 large-6">
            <div className="clearfix button_center">
              <Link to='/'><button className="button">Back to List of products</button></Link>
            </div>
            <h1 className="product_name">{product.name}</h1>
            <div className="image_container">
              <Slider className="image_container" {...settings}>
                <div className="image_container"><img src={product.image} className=' products_image'/></div>
                <div className="image_container"><img src={product.image2} className=' products_image'/></div>
                <div className="image_container"><img src={product.image3} className=' products_image'/></div>
              </Slider>
            </div>

            <div className="product_details">
              <div>
                {product.desc}
                  <div className="product_info2">
                    Price : {product.price} euros<br />
                    Weight : {product.weight} kg
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
