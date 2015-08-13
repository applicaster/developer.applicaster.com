import * as types from '../constants/ActionTypes';

const initialState = [];

export default function products(state = initialState, action) {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return action.data;

    default:
      return state;
  }
}
