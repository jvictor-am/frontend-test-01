import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import NewWidget from './pages/NewWidget';
import EditWidget from './pages/EditWidget';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route exact path="/new-widget">
        <NewWidget />
      </Route>
      <Route exact path="/widget/:id?">
        <EditWidget />
      </Route>
    </Switch>
  );
}
