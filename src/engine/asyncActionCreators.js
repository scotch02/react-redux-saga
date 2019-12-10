import { asyncTypes } from "./asyncActionTypes"

export function loadPairsAsyncActionCreator() {
  return {
    type: asyncTypes.LOAD_PAIRS_ASYNC
  }
}

export function setResultAsyncActionCreator(value) {
  return {
    type: asyncTypes.SET_VALUE_ASYNC,
    payload: value
  }
}

export function setCoinAsyncActionCreator(value) {
  return {
    type: asyncTypes.SET_COIN_ASYNC,
    payload: value
  }
}

export function setCurrencyAsyncActionCreator(value) {
  return {
    type: asyncTypes.SET_CURRENCY_ASYNC,
    payload: value
  }
}