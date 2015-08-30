import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import './index.scss';

export default class ProductFilter extends Component {

  static propTypes = {
    products: PropTypes.array,
  };

  render() {
    const {products} = this.props;
    return (
      <div className="ProductFilter">
        <h3 className="ProductFilter-h3">Proudct Filter</h3>
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
      </div>
    );
  }

}
