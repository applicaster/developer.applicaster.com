import React, { Component, PropTypes } from 'react';
import request from 'superagent';

export default class Page extends Component {

  static propTypes = {
    params: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {content: { __html: ''}};
  }

  componentDidMount() {
    request(`/${this.props.params.type}/${this.props.params.page}/index.html`, (err, res) => {
      this.setState({content: { __html: (res.text)}});
      Prism.highlightAll();
    });
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.state.content} />
    );
  }

}
