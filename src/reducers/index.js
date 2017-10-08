import { combineReducers } from 'redux';
import trades from './tradesWidgetReducer';
import books from './booksWidgetReducer';

const rootReducer = combineReducers({
  trades,
  books
});

export default rootReducer;
