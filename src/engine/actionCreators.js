import { types } from "./actionTypes"

export function loadPairsActionCreator(pairs) {
  return {
    type: types.LOAD_PAIRS,
    payload: pairs
  }
}

export function setCoinActionCreator(currency) {
  return {
    type: types.SET_COIN,
    payload: currency
  }
}

export function setCurrencyActionCreator(currency) {
  return {
    type: types.SET_CURRENCY,
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
