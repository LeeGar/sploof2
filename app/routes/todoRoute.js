import React from 'react';
import { Route } from 'react-router';
import ParentApp from '../containers/ParentApp';
import TodoApp from '../containers/TodoApp';

export default (
    <Route component={ParentApp}>
      <Route path="/"
           component={ TodoApp } />

    </Route>
)