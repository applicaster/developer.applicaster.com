import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import ProductFilter from '../ProductFilter';
import './index.scss';
import '../../common/stylesheets/utils.scss';

class SideMenu extends Component {

  render() {
    const { products } = this.props;
    console.log('products1', products);
    return (
      <div className="SideMenu">
        <div id="menu">
          <ProductFilter products={products}/>
        </div>
        <div className="TocifyWrapper tocify-wrapper">
          <div className="tocify" id="toc"></div>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    products: state.products
  }
}

export default connect(select)(SideMenu)
