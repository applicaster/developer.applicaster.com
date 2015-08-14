import React, { Component, PropTypes } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import * as ProductsActions from '../../actions/ProductsActions';

// Import child components
import ProductGroup from '../ProductGroup';

import './index.scss';

@connect(state => ({ products: state.products }))
export default class ProductList extends Component {

  static propTypes = {
    products: PropTypes.array,
    query: PropTypes.object,
    dispatch: PropTypes.object,
  }

  constructor(props) {
    super(props);
    const { dispatch} = this.props;
    const actions = bindActionCreators(ProductsActions, dispatch);
    actions.getProducts();
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
