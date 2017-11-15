import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import Header from '../../components/Header';

export default class AddProducts extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fireRedirect: false
    }
  }
  onSubmit(e) {
    e.preventDefault();
    var imageText = this.refs.image.value;
    var image2Text = this.refs.image2.value;
    var image3Text = this.refs.image3.value;
    var nameText = this.refs.name.value;
    var descText = this.refs.desc.value;
    var priceText = this.refs.price.value;
    var weightText = this.refs.weight.value;
    var tag1Text = this.refs.tag1.value;
    var tag2Text = this.refs.tag2.value;

    var re = /^[0-9]*$/;


    if (imageText == '' || image2Text == '' || image3Text == '' || nameText == '' || descText == '' || priceText == ''
        || weightText == '' || tag1Text == '' || tag2Text == '') {
          alert('All fields are required.');
        } else if (!re.test(priceText) || !re.test(weightText)) {
          alert('Price and Weight must be numbers.');
        } else {
          axios
            .post('/api/products/', {
              image: imageText,
              image2: image2Text,
              image3: image3Text,
              name: nameText,
              desc: descText,
              price: priceText,
              weight: weightText,
              tag1: tag1Text,
              tag2: tag2Text
            })
            .then((response) => {
              this.setState({ fireRedirect : true })
            });
        }
  }
  render() {
    const { from } = this.props.location.state || '/';
    const { fireRedirect } = this.state;

    return (
      <div>
        <Header />
        <div className="clearfix button_center">
          <Link to='/admin/products'>
            <button className="button">Back to list of Products</button>
          </Link>
        </div>
        <div className="grid-x align-center">
          <form onSubmit={this.onSubmit.bind(this)}>
            <h2>Add a Product : </h2>
            <h6>(*) Required Field</h6>
            Image (*) : <input type="text" name="pic"  ref="image" placeholder="http://"></input>
            Image 2 (*) : <input type="text" name="pic"  ref="image2" placeholder="http://"></input>
            Image 3 (*) : <input type="text" name="pic"  ref="image3" placeholder="http://"></input>
            Name (*) : <input type="text" id="name" ref="name"></input>
            Description (*) : <textarea rows="4" cols="50" id="desc" ref="desc"></textarea>
            Price (*) : <input type="text" id="price" ref="price"></input>
            Weight (*) : <input type="text" id="weight" ref="weight"></input>
            Tag 1 (*) : <input type="text" id="tag1" ref="tag1"></input>
            Tag 2 (*) : <input type="text" id="tag2" ref="tag2"></input>
            <button type="submit" className="button success">Submit</button>
          </form>

          {fireRedirect && (
            <Redirect to={from || '/admin/products/'}/>
          )}

        </div>
      </div>
    );
  }
}
