import React from 'react';
import Router, { Route, DefaultRoute, Redirect } from 'react-router';
import { reduxRouteComponent } from 'redux-react-router';
import HomeLayout from 'components/layouts/home_layout';
import Layout from 'components/layouts/layout';

export default function (App, store) {
  return (
    <Route component={reduxRouteComponent(store)}>
      <Route name="app" path="/" handler={App} >
          <Route name="layout" path="/" handler={Layout} >
            <DefaultRoute handler={HomeLayout} />
          </Route>
      </Route>
    </Route>
  )
}
