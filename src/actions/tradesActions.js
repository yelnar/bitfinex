import types from './actionTypes';

export function subscribeToTradesChannel() {
  return { type: types.SUBSCRIBE_TRADES_CHANNEL };
}

export function initTrades(trades) {
  return { type: types.INIT_TRADES, trades: trades };
}

export function updateTrades(trade) {
  return { type: types.UPDATE_TRADES, trade: trade };
}
