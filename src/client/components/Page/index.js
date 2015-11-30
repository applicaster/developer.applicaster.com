import React, { Component, PropTypes } from 'react';
import request from 'superagent';

export default class Page extends Component {

  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.state = {content: { __html: ''}};
  }

  componentDidMount() {
    this.setState({copyStyle: { display: 'none'}});
    request(`/${this.props.params.type}/${this.props.params.page}/index.html`, (err, res) => {
      if (err) {
        console.log('ERROR',err);
      } else {
        this.setState({content: { __html: (res.text)}});
        Prism.highlightAll();
        this.setState({copyStyle: { display: 'block'}});
      }
    });
  }

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={this.state.content} />
        <div style={this.state.copyStyle} className="Copywrite">© 2015 Applicaster LTD. All rights reserved.</div>
      </div>
    );
  }

}

Page.contextTypes = {
  router: React.PropTypes.func,
};
