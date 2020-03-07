import { WebSocketClient } from '../utils/connectWebSocket'

const subscribeTrades = (webSocket: WebSocketClient) => {
  webSocket.send(
    JSON.stringify({
      event: 'subscribe',
      channel: 'trades',
      symbol: 'tBTCUSD',
      freq: 'F0',
    })
  )
}

const subscribeBook = (webSocket: WebSocketClient) => {
  webSocket.send(
    JSON.stringify({
      event: 'subscribe',
      channel: 'book',
      symbol: 'tBTCUSD',
      freq: 'F0',
      prec: 'P1',
    })
  )
}

const close = (webSocket: WebSocketClient) => {
  webSocket.close()
}

export const WebSocketActions = {
  subscribeTrades,
  subscribeBook,
  close,
}
