// @ts-ignore
import { proxy } from 'comlink'
import { StoreState } from '../../worker/store/store'
import { StoreAction } from '../../worker/store/storeActions'
import { Store, Subscriber } from '../../worker/utils/createStore'

export const workerStoreWrapper = async (
  workerStore: Store<StoreState, StoreAction>
) => {
  const subscribers = new Set() as Set<Subscriber<StoreState>>

  let latestState = await workerStore.getState()
  workerStore.subscribe(
    proxy(async () => {
      latestState = await workerStore.getState()
      subscribers.forEach(fn => fn(latestState))
    })
  )

  return {
    dispatch: (action: StoreAction) => workerStore.dispatch(action),
    getState: () => latestState,
    subscribe(fn: Subscriber<StoreState>) {
      subscribers.add(fn)
      return () => subscribers.delete(fn)
    },
  }
}
