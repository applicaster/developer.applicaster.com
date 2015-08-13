import { connect } from 'redux/react';
import React, { Component } from 'react';

import ProductFilter from '../ProductFilter';

import './index.scss';
import '../../common/stylesheets/utils.scss';

@connect(state => ({ products: state.products }))
export default class SideMenu extends Component {

  render() {
    const { products } = this.props;
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
