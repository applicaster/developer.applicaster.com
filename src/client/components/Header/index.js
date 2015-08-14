import React, { Component } from 'react';
import './index.scss';
import '../../common/stylesheets/utils.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="Header u-posFixed">
          <span className="Header-mainTitle">
            <a className="u-unstyledLink Header-logo" href="/">
              <span className="Header-text">Developer</span>
            </a>
          </span>
          <div className="Header-border"></div>
        </div>
    );
  }
}

