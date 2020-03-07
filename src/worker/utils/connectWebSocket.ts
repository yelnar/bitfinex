export enum WebSocketState {
  Initial = 'Initial',
  Open = 'Open',
  Closed = 'Closed',
  Error = 'Error',
}

export type WebSocketClient = {
  send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void
  close: () => void
}

export const connectWebSocket = ({
  url,
  onopen,
  onerror,
  onclose,
  onmessage,
}: {
  url: string
  onopen?: (e: Event, webSocket: WebSocket) => void
  onerror?: (e: Event, webSocket: WebSocket) => void
  onclose?: () => void
  onmessage?: (e: MessageEvent) => void
}): WebSocketClient => {
  let state = WebSocketState.Initial
  const webSocket = new WebSocket(url)

  webSocket.onerror = (e: Event) => {
    console.error('WebSocket error on connect', e)
    state = WebSocketState.Error
    onerror && onerror(e, webSocket)
  }

  webSocket.onopen = (e: Event) => {
    console.log('WebSocket connected')
    state = WebSocketState.Open
    onopen && onopen(e, webSocket)
  }

  webSocket.onclose = () => {
    console.log('Websocket connection closed')
    state = WebSocketState.Closed
    onclose && onclose()
  }

  webSocket.onmessage = (e: MessageEvent) => {
    console.log('Websocket message received')
    onopen && onmessage(e)
  }

  const send = (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
    if (state !== WebSocketState.Open) {
      console.error("Couldn't send message. WebSocket connection is not open.")
      return
    }
    webSocket.send(data)
  }

  const close = () => {
    webSocket.close()
  }

  return {
    send,
    close,
  }
}
