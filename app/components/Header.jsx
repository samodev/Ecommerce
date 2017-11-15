import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    const img = 'http://localhost:3000/img/logo.png'; // c'est moche, mais le chemin relatif fonctionne pas sur toutes les pages
    return (
      <div className="top-bar">
        <img src={img} alt="Keley" />
        <div className="top-bar-left">
          <ul className="menu">
            <li>
              <Link to="/" className="active-link">Products</Link>
            </li>
            <li>
              <Link to="/admin/products/" className="active-link">Back-office</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
            <ul className="menu">
              <li className="menu-text">
                Created By <a href="https://github.com/samodev" target="_blank">Stéphane Amoudi</a>
              </li>
            </ul>
          </div>
      </div>
    );
  }
}
