import { combineReducers } from 'redux';
import * as types from './constants/ActionTypes';

const initialState = [];

function products(state = initialState, action) {
  switch (action.type) {
  case types.GET_PRODUCTS:
    return action.data;

  default:
    return state;
  }
}

const productsApp = combineReducers({
  products,
});

export default productsApp;
