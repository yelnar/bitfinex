import { StoreActions } from '../store/storeActions'
import { connectWebSocket, WebSocketState } from '../utils/connectWebSocket'
import { webSocketMessageHandler } from './webSocketMessageHandler'
import { store } from '../store/store'
import { WebSocketActions } from './webSocketActions'

export enum Channel {
  trades = 'trades',
  book = 'book',
}

export const webSocket = connectWebSocket({
  url: 'wss://api-pub.bitfinex.com/ws/2',
  onopen: (e: Event, webSocket: WebSocket) => {
    StoreActions.setWebSocketState(store.dispatch)(WebSocketState.Open)
    WebSocketActions.subscribeTrades(webSocket)
    WebSocketActions.subscribeBook(webSocket)
  },
  onclose: () => {
    StoreActions.setWebSocketState(store.dispatch)(WebSocketState.Closed)
  },
  onerror: () => {
    StoreActions.setWebSocketState(store.dispatch)(WebSocketState.Error)
  },
  onmessage: (event: MessageEvent) => {
    webSocketMessageHandler(event)
  },
})
