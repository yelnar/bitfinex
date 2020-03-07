import { createStore } from '../utils/createStore'
import { storeReducer } from './storeReducer'
import { WebSocketState } from '../utils/connectWebSocket'
import { StoreAction } from './storeActions'
import { Book, Trade } from '../webSocket/webSocketMessageHandler'

export type StoreState = {
  webSocketState: WebSocketState
  tradesModel: {
    [key: number]: Trade
  }
  booksModel: {
    [key: number]: Book
  }
}

export const store = createStore<StoreState, StoreAction>(storeReducer, {
  webSocketState: WebSocketState.Initial,
  tradesModel: {},
  booksModel: {},
})
