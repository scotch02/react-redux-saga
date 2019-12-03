import { asyncTypes } from "./asyncActionTypes"

export function loadCurrencyPairsAsyncActionCreator() {
  return {
    type: asyncTypes.LOAD_CURRENCY_PAIRS_ASYNC
  }
}

export function setResultAsyncActionCreator(value) {
  return {
    type: asyncTypes.SET_RESULT_ASYNC,
    payload: value
  }
}

export function setCurrentCurrencyAsyncActionCreator(value) {
  return {
    type: asyncTypes.SET_CURRENT_CURRENCY_ASYNC,
    payload: value
  }
}

export function setCurrentBaseCurrencyAsyncActionCreator(value) {
  return {
    type: asyncTypes.SET_CURRENT_BASE_CURRENCY_ASYNC,
    payload: value
  }
}