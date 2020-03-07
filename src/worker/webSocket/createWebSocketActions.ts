/**
 * We could use this function instead of exporting actions in a separate file.
 * By this approach we would not pass full webSocket instance to the UI thread, and allow only specific actions.
 */

import { WebSocketClient } from '../utils/connectWebSocket'
import { Channel } from './webSocket'

export const createWebSocketActions = (webSocket: WebSocketClient) => {
  const close = () => {
    webSocket.close()
  }

  const subscribeTrades = () => {
    webSocket.send(
      JSON.stringify({
        event: 'subscribe',
        channel: Channel.trades,
        symbol: 'tBTCUSD',
        freq: 'F0',
      })
    )
  }

  const subscribeBook = () => {
    webSocket.send(
      JSON.stringify({
        event: 'subscribe',
        channel: Channel.book,
        symbol: 'tBTCUSD',
        freq: 'F0',
        prec: 'P1',
      })
    )
  }

  return {
    close,
    subscribeTrades,
    subscribeBook,
  }
}
