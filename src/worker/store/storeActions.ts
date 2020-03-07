import { Dispatch } from '../utils/createStore'
import { WebSocketState } from '../utils/connectWebSocket'
import { Book, Trade } from '../webSocket/webSocketMessageHandler'

export type StoreAction =
  | {
      type: 'setWebSocketState'
      payload: WebSocketState
    }
  | {
      type: 'setTradesSnapshot'
      payload?: Trade[]
    }
  | {
      type: 'setBooksSnapshot'
      payload?: Book[]
    }

const setWebSocketState = (dispatch: Dispatch<StoreAction>) => (
  payload: WebSocketState
) => dispatch({ type: 'setWebSocketState', payload })

const setTradesSnapshot = (dispatch: Dispatch<StoreAction>) => (
  payload: Trade[]
) => dispatch({ type: 'setTradesSnapshot', payload })

const setBooksSnapshot = (dispatch: Dispatch<StoreAction>) => (
  payload: Book[]
) => dispatch({ type: 'setBooksSnapshot', payload })

export const StoreActions = {
  setWebSocketState,
  setTradesSnapshot,
  setBooksSnapshot,
}
