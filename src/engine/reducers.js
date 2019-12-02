import { types } from "./actionTypes"

/*
const state = {
    currencyPairs: Array of Object ref
    currentCurrency: String
    currentBaseCurrency: String
    currencies: Array of String
    baseCurrencies: Array of String 
    result: Number
} 
*/

const currencyActionMapper = Object.create(null)
currencyActionMapper[types.LOAD_CURRENCY_PAIRS] = (state, { payload }) => {
  return payload
}

const currencyPairsReducer = (state = [], action) => {
  const handler = currencyActionMapper[action.type]
  return handler ? handler(state, action) : state
}

const currentCurrencyActionMapper = Object.create(null)
currentCurrencyActionMapper[types.SET_CURRENT_CURRENCY] = (state, { payload }) => {
  return payload
}

const currentCurrencyReducer = (state = "BTC", action) => {
  const handler = currentCurrencyActionMapper[action.type]
  return handler ? handler(state, action) : state
}

const currentBaseCurrencyActionMapper = Object.create(null)
currentBaseCurrencyActionMapper[types.SET_CURRENT_BASE_CURRENCY] = ( state, { payload } ) => {
  return payload
}

const currentBaseCurrencyReducer = (state = "UAH", action) => {
  const handler = currentBaseCurrencyActionMapper[action.type]
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

const initialState = {
  currencies: ["BTC", "ETH", "XRP"],
  baseCurrencies: ["USD", "UAH", "RUR"]
}

const combinedReducer = (state = initialState, action) => {
  const {
    currencyPairs,
    currentCurrency,
    currentBaseCurrency,
    currencies,
    baseCurrencies,
    result
  } = state

  return {
    currencyPairs: currencyPairsReducer(currencyPairs, action),
    currentCurrency: currentCurrencyReducer(currentCurrency, action),
    currentBaseCurrency: currentBaseCurrencyReducer(
      currentBaseCurrency,
      action
    ),
    currencies,
    baseCurrencies,
    result: resultReducer(result, action)
  }
}

/*
or 

const combinedReducer = combineReducers({
  currencyPairs: currencyPairsReducer,
  currentCurrency: currentCurrencyReducer,
  currentBaseCurrency: currentBaseCurrencyReducer,
  result: resultReducer
});
*/

export default combinedReducer
