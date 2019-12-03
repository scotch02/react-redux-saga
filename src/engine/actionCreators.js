import { types } from "./actionTypes"

export function loadCurrencyPairsActionCreator(currencyPairs) {
  return {
    type: types.LOAD_CURRENCY_PAIRS,
    payload: currencyPairs
  }
}

export function setCurrentCurrencyActionCreator(currency) {
  return {
    type: types.SET_CURRENT_CURRENCY,
    payload: currency
  }
}

export function setCurrentBaseCurrencyActionCreator(currency) {
  return {
    type: types.SET_CURRENT_BASE_CURRENCY,
    payload: currency
  }
}

export function setValueActionCreator(result) {
  return {
    type: types.SET_VALUE,
    payload: result
  }
}

export function setResultActionCreator(result) {
  return {
    type: types.SET_RESULT,
    payload: result
  }
}
