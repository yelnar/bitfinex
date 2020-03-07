// @ts-ignore
import { expose } from 'comlink'
import { store } from './store/store'
import { webSocket } from './webSocket/webSocket'

const ctx: Worker = self as any

expose({ store, webSocket })
