import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import './index.scss';

export default class ProductFilter extends Component {

  static propTypes = {
    products: PropTypes.array,
  };

  render() {
    const {products} = this.props;
    const docTypes = [ 'Release Notes', 'Technical' ];
    return (
      <div className="ProductFilter">
        <h3 className="ProductFilter-h3">Filter By Proudct</h3>
        <ul>
          <li>
          <Link to="productsList" className="ProductFilter-li u-unstyledLink">
            All Products
          </Link>
          </li>
          {products.map(product =>
            <li key={product.label}>
            <Link to="productsList"
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
          <Link to="productsList" className="ProductFilter-li u-unstyledLink">
            All Types
          </Link>
          </li>
          {docTypes.map(docType =>
            <li key={docType}>
            <Link to="productsList"
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
