import types from '../actions/actionTypes';

export default function booksBidsReducer(state = [], action) {
  switch (action.type) {

    case types.INIT_BOOKS_BIDS:
      return action.books;

    case types.UPDATE_BOOKS_BIDS:
      // if (!action.book || !Array.isArray(action.book)) return state;
      // return [action.book, ...state].slice(0, 50);
      return action.books;

    default:
      return state;
  }
}
