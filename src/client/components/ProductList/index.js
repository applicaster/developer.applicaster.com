import React, { Component } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import * as ProductsActions from '../../actions/ProductsActions';

// Import child components
import Header from '../Header';
import SideMenu from '../SideMenu';
import ProductGroup from '../ProductGroup';
import ProductFilter from '../ProductFilter'

import './index.scss';

@connect(state => ({ products: state.products }))
export default class ProductList extends Component {

  constructor(props) {
    super(props);
    const { dispatch} = this.props;
    const actions = bindActionCreators(ProductsActions, dispatch);
    actions.getProducts();
  }

  render() {
    const {products, query, dispatch} = this.props;
    let show = (label) => {
      let showItem = (query.product) ? (label === query.product) : true;
      return {
        display: (showItem) ? 'block' : 'none'
      }
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
  };

}
