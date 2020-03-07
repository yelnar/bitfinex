import React from 'react'
import { WebSocketClient } from '../worker/utils/connectWebSocket'

const WebSocketContext = React.createContext({} as WebSocketClient)

export const WebSocketProvider: React.FC<{
  value: WebSocketClient
}> = ({ value, children }) => {
  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  const webSocketContext = React.useContext(WebSocketContext)

  if (webSocketContext === undefined) {
    throw new Error(`useWebSocket must be used within the WebSocketProvider`)
  }

  return webSocketContext
}
