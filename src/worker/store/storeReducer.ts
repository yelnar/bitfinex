import { StoreState } from './store'
import { StoreAction } from './storeActions'
import { Reducer } from '../utils/createStore'

export const storeReducer: Reducer<StoreState, StoreAction> = (
  state,
  action
) => {
  console.log('Reducer Action', action.type, action.payload)
  let newState = state

  switch (action.type) {
    case 'setWebSocketState': {
      newState = {
        ...state,
        webSocketState: action.payload,
      }
      break
    }
    case 'setTradesSnapshot': {
      newState = {
        ...state,
        tradesModel: action.payload.reduce((model, trade) => {
          return { ...model, [trade.id]: trade }
        }, state.tradesModel),
      }
      break
    }
    case 'setBooksSnapshot': {
      newState = {
        ...state,
        booksModel: action.payload.reduce((model, book) => {
          return { ...model, [book.price]: book }
        }, state.booksModel),
      }
      break
    }
    default: {
      console.error(`Unsupported action type ${action['type']} in storeReducer`)
    }
  }

  return newState
}
