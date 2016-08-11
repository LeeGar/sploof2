import React from 'react';
import { Route } from 'react-router';
import TodoApp from '../containers/TodoApp';
import ChildContainer from '../containers/ChildContainers';

export default (
  <Route component={TodoApp}>
    <Route path="/"
      components={ ChildContainer } />

  </Route>
)