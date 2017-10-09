import { combineReducers } from 'redux';
import trades from './tradesReducer';
import booksBids from './booksBidsReducer';
import booksAsks from './booksAsksReducer';

const rootReducer = combineReducers({
  trades,
  booksBids,
  booksAsks
});

export default rootReducer;
