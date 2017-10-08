import types from '../actions/actionTypes';

export default function booksWidgetReducer(state = [], action) {
  switch (action.type) {

    case types.INIT_BOOKS:
      return action.books;

    case types.UPDATE_BOOKS:
      if (!action.book || !Array.isArray(action.book)) return state;
      return [action.book, ...state].slice(0, 50);

    default:
      return state;
  }
}
