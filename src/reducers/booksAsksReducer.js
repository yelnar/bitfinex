import types from '../actions/actionTypes';

export default function booksAsksReducer(state = {}, action) {
  switch (action.type) {

    case types.INIT_BOOKS_ASKS:
      return Object.assign({}, state, action.books);

    case types.UPDATE_BOOKS_ASKS:
      // if (!action.book || !Array.isArray(action.book)) return state;
      // return [action.book, ...state].slice(0, 50);
      return Object.assign({}, state, action.books);

    default:
      return state;
  }
}
