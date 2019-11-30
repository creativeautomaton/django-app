import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import auth from './auth'
import country from './country'
import error from './error'
import modal from './modal'
import tripReport from './tripReport'
import stripe from './stripe/index.js'
import user from './user'


const reducer = combineReducers({
  auth, country, error, modal, tripReport, user,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let middleware = applyMiddleware(thunk)

// We only want the logger running in development.
if (process.env.NODE_ENV === 'development') {
  middleware = applyMiddleware(thunk, createLogger({ collapsed: true, errorTransformer: true}))
}

const enhancer = composeEnhancers(middleware)

const store = createStore(reducer, enhancer)

export default store
