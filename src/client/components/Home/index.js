import React, { Component } from 'react';
import SectionHeader from '../SectionHeader';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router';
import officeImage from 'file!./office.jpg';


export default class Home extends Component {

  render() {
    return (
      <div>
      <SectionHeader title="Welcome To Applicaster's Developer Portal" />
      <p style={{paddingBottom: '10px'}}>Find out about Applicaster's SDKs, release notes and other product related technical documentation.</p>
      <Link to="productsList">
        <RaisedButton label="Browse our docs" primary={true} />
      </Link>
      <img className="Typography--img" src={officeImage} />
      </div>
    );
  }
}
