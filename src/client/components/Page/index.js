import React, { Component } from 'react';
import { connect } from 'redux/react';
import request from "superagent";
import { PUBLIC_FOLDER } from '../../../shared/settings';

// Import child components
import Header from '../Header';
import SideMenu from '../SideMenu';

export default class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {content: { __html: ''}};
  }

  componentDidMount() {
    request(`/${this.props.params.type}/${this.props.params.page}/index.html`, (err, res) => {
      this.setState({content: { __html: (res.text)}})
      Prism.highlightAll();
    });
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.state.content} />
    );
  };

}
