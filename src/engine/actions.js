/*
 * action types
 */

export const LOAD_CURRENCY_PAIRS = "LOAD_CURRENCY_PAIRS"
export const LOAD_CURRENCY_PAIRS_ = "LOAD_CURRENCY_PAIRS_"
export const SET_CURRENT_CURRENCY = "SET_CURRENT_CURRENCY"
export const SET_CURRENT_BASE_CURRENCY = "SET_CURRENT_BASE_CURRENCY"
export const SET_RESULT = "SET_RESULT"

/*
 * action creators
 */

export function loadCurrencyPairsActionCreator(currencyPairs) {
  return {
    type: LOAD_CURRENCY_PAIRS,
    payload: currencyPairs
  }
}

export function setCurrentCurrencyActionCreator(currency) {
  return {
    type: SET_CURRENT_CURRENCY,
    payload: currency
  }
}

export function setCurrentBaseCurrencyActionCreator(currency) {
  return {
    type: SET_CURRENT_BASE_CURRENCY,
    payload: currency
  }
}

export function setResultActionCreator(result) {
  return {
    type: SET_RESULT,
    payload: result
  }
}
