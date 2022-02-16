import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
// import { Routes } from 'react-router';
import UserTable from './ContactTable';

const AppRoutes = () => {
  return (
    <Switch>
      <Route
        component={UserTable}
        path="/home"
        exact
      />
      <Redirect from="/" to="/home" />
    </Switch>
  )
}

export default AppRoutes