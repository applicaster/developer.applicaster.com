import React, { Component } from 'react'; 
import { DefaultRoute, Link, Route, RouteHandler, Redirect } from 'react-router';
import { getFolder } from '../../../shared/utils';

export default class ProductGroup extends Component {

  render() {
    const {label, teasers} = this.props.group;
    let aStyle = {
      marginTop: "1em",
      marginBottom:"2em",
      borderBottom:"solid 1px #ccc",
      paddingBottom:"1em",
      textDecoration: "none",
      display: "block"
    };

    let labelStyle = {
      fontFamily: "sans-serif",
      fontWeight: "300",
      fontSize: "1.5em",
      color: "#666",
      lineHeight: "3em",
      borderBottom: "solid 1px #D3D3D3",
      marginBottom: "1em"
    };

    let platformStyle = {
      fontSize: "0.8em",
      color: "#D93E97"
    }

    let descStyle ={
      fontSize: "18px"
    };

    return (
      <div>
        <h5 style={labelStyle}>{label}</h5>
          {teasers.map(teaser =>
            <Link to="page"
                  params={{
                    type: getFolder(teaser),
                    page: teaser.folder
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
  };

}

