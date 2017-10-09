import actionTypes from '../actions/actionTypes';
import { socket, openWebsocket, closeWebsocket }from './configureWSConnection';

const webSocketMiddleware = store => next => action => {
  if (socket !== null) {
    switch (action.type) {
      case actionTypes.SUBSCRIBE_BOOKS_CHANNEL:
        socket.send(JSON.stringify({
          event: 'subscribe',
          channel: 'book',
          symbol: "tBTCUSD",
          freq: "F0",
          prec: "P1"
        }));
        break;

      case actionTypes.SUBSCRIBE_TRADES_CHANNEL:
        socket.send(JSON.stringify({
          event: 'subscribe',
          channel: 'trades',
          symbol: "tBTCUSD",
          freq: "F0"
        }));
        break;

      case actionTypes.CLOSE:
        closeWebsocket();
        break;
    }
  }
  else if (action.type === actionTypes.CONNECT) {
    openWebsocket(store);
  }

  next(action);
};

export default webSocketMiddleware;
