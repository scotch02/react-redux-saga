//import { combineReducers } from "redux";

import {
  LOAD_CURRENCY_PAIRS,
  SET_CURRENT_CURRENCY,
  SET_CURRENT_BASE_CURRENCY,
  SET_RESULT
} from "./actions";

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

const currencyActionMapper = Object.create(null);
currencyActionMapper[LOAD_CURRENCY_PAIRS] = function (state, { payload }) {
  return payload;
};

const currencyPairsReducer = function (state = [], action) {
  const handler = currencyActionMapper[action.type];
  return handler ? handler(state, action) : state;
};

const currentCurrencyActionMapper = Object.create(null)
currentCurrencyActionMapper[SET_CURRENT_CURRENCY] = function (state, { payload }) {
  return payload;
};

const currentCurrencyReducer = function (state = "BTC", action) {
  const handler = currentCurrencyActionMapper[action.type];
  return handler ? handler(state, action) : state;
};

const currentBaseCurrencyActionMapper = Object.create(null);
currentBaseCurrencyActionMapper[SET_CURRENT_BASE_CURRENCY] = function (state, { payload }) {
    return payload;
};

const currentBaseCurrencyReducer = function (state = "UAH", action) {
  const handler = currentBaseCurrencyActionMapper[action.type];
  return handler ? handler(state, action) : state;
};

const resultActionMapper = Object.create(null);
resultActionMapper[SET_RESULT] = function (state, { payload }) {
    return payload;
};

const resultReducer = function (state = 0, action) {
  const handler = resultActionMapper[action.type];
  return handler ? handler(state, action) : state;
};

const initialState = {
  currencies: ["BTC", "ETH", "XRP"],
  baseCurrencies: ["USD", "UAH", "RUR"]
};

const combinedReducer = function (state = initialState, action) {
  const { currencyPairs, currentCurrency, currentBaseCurrency, currencies, baseCurrencies, result } = state;

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
  };
};

/*
or 

const combinedReducer = combineReducers({
  currencyPairs: currencyPairsReducer,
  currentCurrency: currentCurrencyReducer,
  currentBaseCurrency: currentBaseCurrencyReducer,
  result: resultReducer
});
*/

export default combinedReducer;
