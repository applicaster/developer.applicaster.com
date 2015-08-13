import React, { Component } from 'react';
import { connect } from 'redux/react';

// Import child components
import Header from '../Header';
import SideMenu from '../SideMenu';
import { RouteHandler } from 'react-router';

import './index.scss';

export default class Page extends Component {

  render() {
    return (
      <div>
        <Header/>
        <SideMenu/>
        <div className="Content">
          <div className="Content-inner">
            <RouteHandler/>
            <div className="Copywrite">© 2015 Applicaster LTD. All rights reserved.</div>
          </div>
        </div>
      </div>
    );
  };

}

