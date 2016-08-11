import React, { Component } from 'react';
import { render } from 'react-dom';
import Immutable from 'immutable';
import { Router, Route, RouterContext, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../app/utils/configureStore';
import routes from '../app/routes';

let state = null;
if (window.$REDUX_STATE) {
  state = window.$REDUX_STATE;

  // Load up state defaults to immutable
}

const store = configureStore(state);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.root')
);