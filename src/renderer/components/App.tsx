import React, { useEffect, useState } from 'react'
import { useStore } from '../storeContext'
import { StoreActions } from '../../worker/store/storeActions'
import { WebSocketState } from '../../worker/utils/connectWebSocket'
import { WebSocketActions } from '../../worker/webSocket/webSocketActions'
import { useWebSocket } from '../webSocketContext'

export const App: React.FC = () => {
  const { getState, subscribe, dispatch } = useStore()
  const webSocket = useWebSocket()

  const [state, setState] = useState(() => getState())

  useEffect(() => {
    const unsubscribe = subscribe(state => {
      setState(state)
    })

    return unsubscribe
  })

  return (
    <>
      <div>WebSocket State: {state.webSocketState}</div>
      <div>Trades Model: {JSON.stringify(state.tradesModel, undefined, 2)}</div>
      <div>Books Model: {JSON.stringify(state.booksModel, undefined, 2)}</div>
      <div>
        <button onClick={() => WebSocketActions.close(webSocket)}>Close</button>
      </div>
    </>
  )
}
