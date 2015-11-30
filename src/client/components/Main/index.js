import React, { Component } from 'react';

// Import child components
import Header from '../Header';
import SideMenu from '../SideMenu';

import './index.scss';

export default class Main extends Component {

  render() {
    return (
      <div>
        <Header/>
        <SideMenu/>
        <div className="Content SideMenu-asideSideMenu">
          <div className="Content-inner">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}
