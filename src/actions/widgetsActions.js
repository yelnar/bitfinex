import types from './actionTypes';

export function subscribeToBooksChannel() {
  return { type: types.SUBSCRIBE_ORDER_BOOKS_CHANNEL };
}

export function updateBooks(book) {
  return { type: types.UPDATE_BOOKS, book: book };
}

export function initBooks(books) {
  return { type: types.INIT_BOOKS, books: books };
}

export function subscribeToHistoryChannel() {
  return { type: types.SUBSCRIBE_TRADES_CHANNEL };
}

export function updateTrades(trade) {
  return { type: types.UPDATE_TRADES, trade: trade };
}

export function initTrades(trades) {
  return { type: types.INIT_TRADES, trades: trades };
}

export function closeConnection() {
  return { type: types.CLOSE };
}

export function reConnect() {
  return { type: types.CONNECT };
}
