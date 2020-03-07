/**
 * TODO: Create typings.
 */

import { Channel } from './webSocket'
import { StoreActions } from '../store/storeActions'
import { store } from '../store/store'

export type Trade = {
  id: number
  mts: number
  amount: number
  price: number
}

export type Book = {
  price: number
  count: number
  amount: number
}

const chanIdMap = {} as {
  [Channel.trades]?: number
  [Channel.book]?: number
}

export const webSocketMessageHandler = (e: MessageEvent) => {
  const data = parseData(e)

  if (!data) {
    return
  }

  if (!Array.isArray(data)) {
    handleResponse(data)
    return
  }

  const chanId = data[0]

  if (chanId === chanIdMap[Channel.trades]) {
    if (isSnapshot(data)) {
      const trades = data[1]
      handleTradesSnapshot(trades)
    } else {
      handleTradesUpdate(data[1])
    }
  } else if (chanId === chanIdMap[Channel.book]) {
    if (isSnapshot(data)) {
      const books = data[1]
      handleBooksSnapshot(books)
    } else {
      handleBooksUpdate(data[1])
    }
  }

  return
}

const parseData = (event: MessageEvent) => {
  let data

  try {
    data = JSON.parse(event.data)
  } catch (e) {
    console.error('Error while parsing message from websocket', e)
  }

  return data
}

const handleResponse = (data: any) => {
  const { event, channel, chanId } = data

  if (event !== 'subscribed') {
    return
  }

  if (channel === Channel.trades) {
    chanIdMap[Channel.trades] = chanId
  } else if (channel === Channel.book) {
    chanIdMap[Channel.book] = chanId
  }
}

const handleTradesSnapshot = (trades: Trade[]) => {
  StoreActions.setTradesSnapshot(store.dispatch)(trades)
}

const handleTradesUpdate = (data: Trade) => {}

const handleBooksSnapshot = (books: Book[]) => {
  StoreActions.setBooksSnapshot(store.dispatch)(books)
}

const handleBooksUpdate = (data: Book) => {}

const isSnapshot = (data: any) => {
  const body = data[data.length - 1]
  return Array.isArray(body[0])
}
