import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import child components
import ProductGroup from '../ProductGroup';

import './index.scss';

@connect(state => ({ products: state.products }))
export default class ProductList extends Component {

  static propTypes = {
    products: PropTypes.array,
    query: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { products, query } = this.props;
    const show = (label) => {
      const showItem = (query.product) ? (label === query.product) : true;
      return {
        display: (showItem) ? 'block' : 'none',
      };
    };
    return (
      <div>
        {products.map(group =>
          <div key={group.label}
              style={show(group.label)}>
            <ProductGroup group={group} />
          </div>
        )}
      </div>
    );
  }
}
