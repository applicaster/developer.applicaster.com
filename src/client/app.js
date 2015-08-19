import React from 'react';
import Router from 'react-router';
import { Styles } from 'material-ui';
import { Route, RouteHandler, Redirect } from 'react-router';
import PageHandler from './components/Page';
import MainHandler from './components/Main';
import ProductListHandler from './components/ProductList';
import Home from './components/Home';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as stores from './stores';

import './common/stylesheets/base.scss';
const ThemeManager = new Styles.ThemeManager();
const redux = createRedux(stores);
const App = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  },

  render() {
    return (
      <div>
        <Provider redux={redux}>
          {() =><RouteHandler/>}
        </Provider>
      </div>
    );
  },
});

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="main" path="/released" handler={MainHandler}>
      <Route name="home" path="/home" handler={Home}/>
      <Route name="productsList" path="/products-list" handler={ProductListHandler}/>
      <Route name="page" path="/:type/:page" handler={PageHandler}/>
    </Route>
    <Redirect from="*" to="home"/>
  </Route>
);

Router.run(routes, (Handler, state) => {
  if (window.applicasterDocs.mixpanelEnabled) {
    mixpanel.identify(window.applicasterDocs.userEmail);
    mixpanel.track('Change route', {
      path: state.path,
    });
  }
  React.render(<Handler/>, document.getElementById('react'));
});
