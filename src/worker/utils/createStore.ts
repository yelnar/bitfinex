export type Reducer<State, Action> = (state: State, action: Action) => State

export type Dispatch<Action> = (action: Action) => void

export type Subscriber<State> = (state: State) => void

export type Store<State, Action> = {
  getState: () => State
  dispatch: Dispatch<Action>
  subscribe: (fn: Subscriber<State>) => () => void
}

export const createStore = <State, Action>(
  reducer: Reducer<State, Action>,
  initialState: State
): Store<State, Action> => {
  console.log('Create Store!!!')
  const _ = {
    state: initialState,
    reducer: reducer,
    subscribers: new Set() as Set<Subscriber<State>>,
  }

  const getState = () => {
    return _.state
  }

  const subscribe = (fn: Subscriber<State>) => {
    _.subscribers.add(fn)
    return () => {
      _.subscribers.delete(fn)
    }
  }

  const dispatch = (action: Action) => {
    _.state = _.reducer(_.state, action)
    _.subscribers.forEach(fn => fn(_.state))
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}
