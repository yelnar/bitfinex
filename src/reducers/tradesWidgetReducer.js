import types from '../actions/actionTypes';

export default function tradesWidgetReducer(state = [], action) {
  switch (action.type) {

    case types.INIT_TRADES:
      return action.trades;

    case types.UPDATE_TRADES:
      if (!action.trade || !Array.isArray(action.trade)) return state;
      return [action.trade, ...state].slice(0, 30);

    default:
      return state;
  }
}
