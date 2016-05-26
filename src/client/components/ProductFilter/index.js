import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import './index.scss';

export default class ProductFilter extends Component {

  render() {
    const {products} = this.props || [];
    const docTypes = [ 'Release Notes', 'Technical', 'Analytics' ];
    return (
      <div className="ProductFilter">
        <h3 className="ProductFilter-h3">Filter By Proudct</h3>
        <ul>
          <li>
          <Link to="/products-list" className="ProductFilter-li u-unstyledLink">
            All Products
          </Link>
          </li>
          {products.map(product =>
            <li key={product.label}>
            <Link to="/products-list"
                  query={{product: product.label}}
                  className="ProductFilter-li u-unstyledLink">
              {product.label}
            </Link>
            </li>
          )}
        </ul>
        <h3 className="ProductFilter-h3">Filter By Document Type</h3>
        <ul>
          <li>
          <Link to="/products-list" className="ProductFilter-li u-unstyledLink">
            All Types
          </Link>
          </li>
          {docTypes.map(docType =>
            <li key={docType}>
            <Link to="/products-list"
                  query={{docType: docType}}
                  className="ProductFilter-li u-unstyledLink">
              {docType}
            </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }

}
