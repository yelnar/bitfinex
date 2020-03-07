import React from 'react'
import { StoreAction } from '../worker/store/storeActions'
import { StoreState } from '../worker/store/store'
import { Store } from '../worker/utils/createStore'

const StoreContext = React.createContext({} as Store<StoreState, StoreAction>)

export const StoreProvider: React.FC<{
  value: Store<StoreState, StoreAction>
}> = ({ value, children }) => {
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const storeContext = React.useContext(StoreContext)

  if (storeContext === undefined) {
    throw new Error(`useStore must be used within the StoreProvider`)
  }

  return storeContext
}
