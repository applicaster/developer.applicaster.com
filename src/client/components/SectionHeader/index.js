import React, { Component, PropTypes } from 'react';

export default class SectionHeader extends Component {

  static propTypes = {
    title: PropTypes.string,
  };

  render() {

    const sectionHeaderStyle = {
      fontWeight: '300',
      fontSize: '1.5em',
      color: '#666',
      paddingTop: '1em',
      paddingBottom: '1em',
      borderBottom: 'solid 1px #D3D3D3',
      marginBottom: '1em',
    };

    return (
        <h2 style={sectionHeaderStyle} >{ this.props.title }</h2>
    );
  }
}
