import types from '../actions/actionTypes';

export default function booksAsksReducer(state = [], action) {
  switch (action.type) {

    case types.INIT_BOOKS_ASKS:
      return action.books;

    case types.UPDATE_BOOKS_ASKS:
      // if (!action.book || !Array.isArray(action.book)) return state;
      // return [action.book, ...state].slice(0, 50);
      return action.books;

    default:
      return state;
  }
}
