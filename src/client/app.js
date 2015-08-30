import React from 'react';
import Router from 'react-router';
import { Styles } from 'material-ui';
import { Route, RouteHandler, Redirect } from 'react-router';
import PageHandler from './components/Page';
import MainHandler from './components/Main';
import ProductListHandler from './components/ProductList';
import Home from './components/Home';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import productsApp from './reducers';
import thunk from 'redux-thunk';
import * as ProductsActions from './actions/ProductsActions';
import { DOCS_FOLDER } from '../shared/settings';

import './common/stylesheets/base.scss';
const ThemeManager = new Styles.ThemeManager();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(productsApp);
const actions = bindActionCreators(ProductsActions, store.dispatch);
actions.getProducts();


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
        <Provider store={store}>
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
      <Route name="page" path={`/${DOCS_FOLDER}/:type/:page`} handler={PageHandler}/>
    </Route>
    <Redirect from="*" to="home"/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  if (window.applicasterDocs.mixpanelEnabled) {
    mixpanel.identify(window.applicasterDocs.userEmail);
    mixpanel.track('Change route', {
      path: state.path,
    });
  }
  React.render(<Handler/>, document.getElementById('react'));
});
