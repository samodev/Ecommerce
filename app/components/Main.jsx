import React from 'react';

import Header from './Header';
import Products from './products/Products'

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="grid-x align-center">
          <div className="cell small-centered medium-6 large-6">
            <Products />
          </div>
        </div>
      </div>
    );
  }
}
