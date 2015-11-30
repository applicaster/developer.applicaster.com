import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ProductGroup from '../ProductGroup';

import './index.scss';

class ProductList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { products } = this.props;
    const {query} = this.props.location
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

function select(state) {
  return {
    products: state.products
  }
}

export default connect(select)(ProductList)
