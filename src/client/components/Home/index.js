import React, { Component, PropTypes } from 'react';
import SectionHeader from '../SectionHeader';
import { RaisedButton, Snackbar } from 'material-ui';
import { Link } from 'react-router';
import officeImage from 'file!./office.jpg';

export default class Home extends Component {

  static propTypes = {
    query: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.query.err) {
      setTimeout(() =>
        this.refs.snackbar.show(),
        1000
      );
    }
  }

  render() {
    return (
      <div>
      <SectionHeader title="Welcome To Applicaster's Developer Portal" />
      <p style={{paddingBottom: '10px'}}>Find out about Applicaster's SDKs, release notes and other product related technical documentation.</p>
      <Link to="productsList">
      <RaisedButton label="Browse our docs" primary={true} />
      </Link>
      <img className="Typography--img" src={officeImage} />
      <Snackbar
        style={{fontSize: '12px'}}
        ref="snackbar"
        autoHideDuration={5000}
        message="Error 401 - Unauthorized Access"/>
      </div>
    );
  }
}
