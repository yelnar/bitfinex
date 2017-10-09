import types from './actionTypes';

export function subscribeToBooksChannel() {
  return { type: types.SUBSCRIBE_BOOKS_CHANNEL };
}

export function updateBooksBids(books) {
  return { type: types.UPDATE_BOOKS_BIDS, books: books };
}

export function updateBooksAsks(books) {
  return { type: types.UPDATE_BOOKS_ASKS, books: books };
}

export function initBooksBids(books) {
  return { type: types.INIT_BOOKS_BIDS, books: books };
}

export function initBooksAsks(books) {
  return { type: types.INIT_BOOKS_ASKS, books: books };
}
