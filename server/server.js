import express from 'express';
import path from 'path';
import React from 'react';

import { renderToString } from 'react-dom/server';
import { Router, RouterContext, match } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import promiseMiddleware from '../utils/promiseMiddleware';
import fetchComponentData from '../utils/fetchComponentData';

import routes from '../app/routes';
import combinedReducers from '../app/reducers';

const finalCreateStore = applyMiddleware(promiseMiddleware)(createStore);

const app = express();
const webpack = require('webpack');
const config = require('../webpack.dev.config.js');

const compiler = webpack(config);

function injectHtmlAndReduxState(html, initialState) {
  return `
  <!doctype html>
  <html lang="utf-8">
    <head>
    <title>Page Title</title>
    </head>
    <body>
      <div class="root">${html}</div>
      <script>window.$REDUX_STATE = ${initialState}</script>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
  `
}

function universalRender(store, renderProps, res) {
  fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
    .then(() => {
      const initView = renderToString((
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      ))

      let currentState = JSON.stringify(store.getState());
      let page = injectHtmlAndReduxState(initView, currentState);
      return page;
    })
    .then(page => res.status(200).send(page))
    .catch(err => res.end(err.message));
}



app.use((req, res, next) => {
  const store = finalCreateStore(combinedReducers);
  const location = req.url;

  match({routes, location}, (err, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (err) {
      console.error(`Internal Server Error - ${err}`);
      res.status(500);
      // Rehydrate the client
    } else if (renderProps) {
      universalRender(store, renderProps, res);
    } else {
      res.status(404).send('Not Found');
    }

  });
});

// global error catcher, need four arguments
app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
  console.log('uncaughtException: ', evt);
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

