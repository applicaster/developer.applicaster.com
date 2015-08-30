import _ from "lodash";
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { getFolder } from '../../../shared/utils';
import SectionHeader from '../SectionHeader';

export default class ProductGroup extends Component {

  static propTypes = {
    group: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);
    this.context = context;

  }

  render() {
    let { docType } = this.context.router.getCurrentQuery();
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
            <Link to="page"
              style={show(teaser.type)}
              params={{
                type: getFolder(teaser),
                page: teaser.folder,
              }}
              key={teaser.folder}>
              <h3>{teaser.title}</h3>
              <p style={descStyle}>{teaser.description}</p>
              <p style={platformStyle}>{teaser.type}</p>
            </Link>
          )}
      </div>
    );
  }

}

ProductGroup.contextTypes = {
  router: React.PropTypes.func,
}
