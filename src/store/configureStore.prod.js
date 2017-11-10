import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import webSocketMiddleware from '../websocket/configureWSMiddleware';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(webSocketMiddleware)
  );
}
