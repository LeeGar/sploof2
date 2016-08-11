import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import promiseMiddleware from '../../utils/PromiseMiddleware';
import combinedReducers from '../reducers';

const logger = createLogger();

const enhancer = compose(
  applyMiddleware(promiseMiddleware, logger)
)

export default function configureStore(initialState=undefined) {
  const store = createStore(combinedReducers, initialState, enhancer);


  return store;
}
