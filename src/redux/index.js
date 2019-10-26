import { applyMiddleware, combineReducers, compose, createStore, } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'
import * as api from '../api'

export const initialLoadState = {
  loading: false,
  loaded: false,
  error: null,
}

const composeEnhancers = __DEV__ ?
  global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

const store = createStore(
  combineReducers(reducers),
  {},
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
)

export default store
