import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { getFolder } from '../../../shared/utils';
import SectionHeader from '../SectionHeader';

export default class ProductGroup extends Component {

  static propTypes = {
    group: PropTypes.object,
  }

  render() {
    const {label, teasers} = this.props.group;
    const aStyle = {
      marginTop: '1em',
      marginBottom: '2em',
      borderBottom: 'solid 1px #ccc',
      paddingBottom: '1em',
      textDecoration: 'none',
      display: 'block',
    };

    const platformStyle = {
      fontSize: '0.8em',
      color: '#D93E97',
    };

    const descStyle = {
      fontSize: '18px',
    };

    return (
      <div>
        <SectionHeader title={label} />
          {teasers.map(teaser =>
            <Link to="page"
                  params={{
                    type: getFolder(teaser),
                    page: teaser.folder,
                  }}
                  key={teaser.folder}
                  style={aStyle}>
              <h3>{teaser.title}</h3>
              <p style={descStyle}>{teaser.description}</p>
              <p style={platformStyle}>{teaser.type}</p>

            </Link>
          )}
      </div>
    );
  }

}

