import React, { Component } from 'react';
import Router, { RouteHandler } from 'react-router';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import * as reducers from 'reducers';
import { routerStateReducer } from 'redux-react-router';

import promiseMiddleware from 'redux-promise';
import apiMiddleware from 'middlewares/apiMiddleware';
import logger from 'redux-logger';
import 'styles/app';

function setMiddleware() {
  if (__DEV__) {
    return applyMiddleware(apiMiddleware, promiseMiddleware, logger);
  }else {
    return applyMiddleware(apiMiddleware, promiseMiddleware);
  }
}


const reducer = combineReducers({
  router: routerStateReducer,
  ...reducers,
});
const finalCreateStore = compose(
  setMiddleware(),
  createStore
);
const store = finalCreateStore(reducer, {});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <RouteHandler />}
      </Provider>
    )
  }
}

Router.run(Routes(App, store), Router.HistoryLocation, (Handler) => React.render(<Handler/>, document.getElementById('app')))
