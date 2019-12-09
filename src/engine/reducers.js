import { types } from "./actionTypes"

/*
const state = {
    pairs: Array of Object ref
    coin: String
    currency: String
    value: Number
    result: Number
} 
*/

const pairsActionMapper = Object.create(null)
pairsActionMapper[types.LOAD_PAIRS] = (state, { payload }) => {
  return payload
}

const pairsReducer = (state = [], action) => {
  const handler = pairsActionMapper[action.type]
  return handler ? handler(state, action) : state
}

const coinActionMapper = Object.create(null)
coinActionMapper[types.SET_COIN] = (state, { payload }) => {
  return payload
}

const coinReducer = (state = "BTC", action) => {
  const handler = coinActionMapper[action.type]
  return handler ? handler(state, action) : state
}

const currencyActionMapper = Object.create(null)
currencyActionMapper[types.SET_CURRENCY] = ( state, { payload } ) => {
  return payload
}

const currencyReducer = (state = "UAH", action) => {
  const handler = currencyActionMapper[action.type]
  return handler ? handler(state, action) : state
}

const valueActionMapper = Object.create(null)
valueActionMapper[types.SET_VALUE] = (state, { payload }) => {
  return payload
}

const valueReducer = (state = 0, action) => {
  const handler = valueActionMapper[action.type]
  return handler ? handler(state, action) : state
}

const resultActionMapper = Object.create(null)
resultActionMapper[types.SET_RESULT] = (state, { payload }) => {
  return payload
}

const resultReducer = (state = 0, action) => {
  const handler = resultActionMapper[action.type]
  return handler ? handler(state, action) : state
}

const initialState = {}

const combinedReducer = (state = initialState, action) => {
  const {
    pairs,
    coin,
    currency,
    value,
    result
  } = state

  return {
    pairs: pairsReducer(pairs, action),
    coin: coinReducer(coin, action),
    currency: currencyReducer(
      currency,
      action
    ),
    value: valueReducer(value, action),
    result: resultReducer(result, action)
  }
}

/*
or 

const combinedReducer = combineReducers({
  pairs: pairsReducer,
  coin: coinReducer,
  currency: currencyReducer,
  result: resultReducer
});
*/

export default combinedReducer
