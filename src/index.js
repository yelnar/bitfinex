/* eslint-disable import/default */

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import ready from 'domready';
import {openWebsocket} from "./websocket/configureWSConnection";
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import configureStore from "./store/configureStore";

const store = configureStore();

ready(() => {
  openWebsocket(store);
  render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
  );
});
