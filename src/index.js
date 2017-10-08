import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import ready from 'domready';
import { compose, applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import actions from './actions/actionTypes';
import { subscribeToBooksChannel, subscribeToHistoryChannel, initTrades, updateTrades, initBooks, updateBooks } from "./actions/widgetsActions";
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

let socket = null;
const uri = 'wss://api.bitfinex.com/ws/2';

const webSocketMiddleware = store => next => action => {
  if(socket !== null) {
    switch (action.type) {
      case actions.SUBSCRIBE_ORDER_BOOKS_CHANNEL:
        socket.send(JSON.stringify({
          event: 'subscribe',
          channel: 'book',
          symbol: "tBTCUSD",
          freq: "F0"
        }));
        break;

      case actions.SUBSCRIBE_TRADES_CHANNEL:
        socket.send(JSON.stringify({
          event: 'subscribe',
          channel: 'trades',
          symbol: "tBTCUSD",
          freq: "F0"
        }));
        break;

      case actions.CLOSE:
        if (socket !== null) {
          socket.close();
          socket = null;
        }
        break;
    }
  } else if (action.type === actions.CONNECT) {
    socket = new WebSocket(uri);
    setSocketListeners(socket);
  }

  next(action);
};

const finalCreateStore = compose(
  applyMiddleware(webSocketMiddleware)
)(createStore);

const store = finalCreateStore(rootReducer);

const setSocketListeners = (socket) => {
  let receiveTradesSnapshot = false;
  let receiveBooksSnapshot = false;
  let tradesId = null;
  let booksId = null;

  socket.onopen = () => {
    store.dispatch(subscribeToBooksChannel());
    store.dispatch(subscribeToHistoryChannel());
  };

  socket.onclose = () => {
    console.log('Socket connection closed');
  };

  socket.onmessage = (m) => {
    try {
      let message = JSON.parse(m.data)
      let messageId = message[0];

      if (message[1] === 'hb') return;

      if (receiveTradesSnapshot) {
        receiveTradesSnapshot = false;
        tradesId = messageId;
        store.dispatch(initTrades(message[1]));
      }
      else if (receiveBooksSnapshot) {
        receiveBooksSnapshot = false;
        booksId = messageId;
        store.dispatch(initBooks(message[1]));
      }
      else if (message.event === 'subscribed') {
        if (message.channel === 'trades') {
          receiveTradesSnapshot = true;
        }
        else if (message.channel === 'book') {
          receiveBooksSnapshot = true;
        }
      }
      else if (messageId === tradesId) {
        store.dispatch(updateTrades(message[2]));
      }
      else if (messageId === booksId) {
        store.dispatch(updateBooks(message[1]));
      }

    } catch(e) {
      throw(e);
    }
  };
};

ready(() => {
  socket = new WebSocket(uri);
  setSocketListeners(socket);
  render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
  );
});
