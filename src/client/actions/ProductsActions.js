import request from 'superagent';
import * as types from '../constants/ActionTypes';
import { TOC_JSON } from '../../shared/settings';

export function getProducts() {
  return dispatch => {
    request(`/${TOC_JSON}`, (err, res) => {
      dispatch({ type: types.GET_PRODUCTS, data: res.body});
    });
  };
}
