import React from 'react';
import Router from 'react-router';
import { render } from 'react-dom'
import { Styles } from 'material-ui';
import { Route, RouteHandler, Redirect, IndexRoute} from 'react-router';
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
import createBrowserHistory from 'history/lib/createBrowserHistory'

import './common/stylesheets/base.scss';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(productsApp);
const actions = bindActionCreators(ProductsActions, store.dispatch);
actions.getProducts();

const App = React.createClass({

  render(){
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

});

render((
  <div>
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
          <Route component={MainHandler}>
            <IndexRoute component={Home} />
            <Route path="/home" component={Home}/>
            <Route path="/products-list" component={ProductListHandler}/>
            <Route path={`/${DOCS_FOLDER}/:type/:page`} component={PageHandler}/>
            <Redirect from="*" to="/home"/>
         </Route>
       </Route>
      </Router>
    </Provider>
  </div>
)
  , document.getElementById('react'));
