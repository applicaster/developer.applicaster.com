import _ from "lodash";
import React, { Component, PropTypes } from 'react';
import Router, { Link }  from 'react-router';
import Qs from 'qs/dist/qs.js';
import { getFolder } from '../../../shared/utils';
import SectionHeader from '../SectionHeader';
import { DOCS_FOLDER } from '../../../shared/settings';

export default React.createClass({

  render() {
    const { docType } = Qs.parse(location.search.substring(1))
    const {label, teasers} = this.props.group;
    const platformStyle = {
      fontSize: '0.8em',
      color: '#D93E97',
    };

    const descStyle = {
      fontSize: '18px',
    };

    const show = (type) => {
      let showItem = true;
      showItem = (docType) ? (type === docType) : true;
      return {
        display: (showItem) ? 'block' : 'none',
        marginTop: '1em',
        marginBottom: '2em',
        borderBottom: 'solid 1px #ccc',
        paddingBottom: '1em',
        textDecoration: 'none',
      };
    };

    const showGroup = (teasers) => {
      let showItem = true;
      if (docType) {
        showItem = _.reduce(teasers, (doShow, teaser) => {
          return doShow || (teaser.type === docType)
        }, false);
      }
      return {display: (showItem) ? 'block' : 'none',};
    }

    return (
      <div style={showGroup(teasers)}>
        <SectionHeader title={label} />
          {teasers.map(teaser =>
            <Link to={`/${DOCS_FOLDER}/${getFolder(teaser)}/${teaser.folder}`}
              style={show(teaser.type)}
              key={teaser.folder}>
              <h3>{teaser.title}</h3>
              <p style={descStyle}>{teaser.description}</p>
              <p style={platformStyle}>{teaser.type}</p>
            </Link>
          )}
      </div>
    );
  }

})
