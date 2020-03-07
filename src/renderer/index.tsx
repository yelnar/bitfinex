import React from 'react'
import ReactDOM from 'react-dom'
// @ts-ignore
import { wrap } from 'comlink'

import * as Worker from 'worker-loader!./../worker/main.worker'
import { App } from './components/App'

import './styles/index.css'
import { workerStoreWrapper } from './utils/workerStoreWrapper'
import { StoreProvider } from './storeContext'
import { WebSocketProvider } from './webSocketContext'

const render = async () => {
  const worker = wrap(new (Worker as any)())
  const workerStore = await workerStoreWrapper(worker.store)
  const workerWebSocket = worker.webSocket

  ReactDOM.render(
    <WebSocketProvider value={workerWebSocket}>
      <StoreProvider value={workerStore}>
        <App />
      </StoreProvider>
    </WebSocketProvider>,
    document.getElementById('root')
  )
}

render()
