import { types } from "./actionTypes"
import Immutable, { Map } from "immutable"
/*
import {
  combineReducers
} from 'redux-immutable';
*/

const initialExchangeState = Map({
  pairs: [],
  coin: "BTC",
  currency: "UAH",
  value: 0,
  result: 0
})

const setter = (state, key, { payload }) => {
  state.set(key, payload)
}

const pairsActionMapper = Object.create(null)
pairsActionMapper[types.LOAD_PAIRS] = setter

const pairsReducer = (state, action) => {
  const handler = pairsActionMapper[action.type]
  handler && handler(state, "pairs", action)
}

const coinActionMapper = Object.create(null)
coinActionMapper[types.SET_COIN] = setter

const coinReducer = (state, action) => {
  const handler = coinActionMapper[action.type]
  handler && handler(state, "coin", action)
}

const currencyActionMapper = Object.create(null)
currencyActionMapper[types.SET_CURRENCY] = setter

const currencyReducer = (state, action) => {
  const handler = currencyActionMapper[action.type]
  handler && handler(state, "currency", action)
}

const valueActionMapper = Object.create(null)
valueActionMapper[types.SET_VALUE] = setter

const valueReducer = (state, action) => {
  const handler = valueActionMapper[action.type]
  handler && handler(state, "value", action)
}

const resultActionMapper = Object.create(null)
resultActionMapper[types.SET_RESULT] = setter

const resultReducer = (state, action) => {
  const handler = resultActionMapper[action.type]
  handler && handler(state, "result", action)
}

const exchangeReducer = (state = initialExchangeState, action) => {
  return state.withMutations(_state => {
    pairsReducer(_state, action)
    coinReducer(_state, action)
    currencyReducer(_state, action)
    valueReducer(_state, action)
    resultReducer(_state, action)
  })
}

const rootReducer = (state = Map({}), action) => {
  return state.withMutations(_state => {
    _state.set("exchange", exchangeReducer(_state.get("exchange"), action))
  })
}

export default rootReducer
