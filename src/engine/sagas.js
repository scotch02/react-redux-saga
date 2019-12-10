import { call, put, takeEvery, select } from "redux-saga/effects"
import Privat from "../api/exchange/Privat"
import {
  loadPairsActionCreator,
  setResultActionCreator,
  setCoinActionCreator,
  setCurrencyActionCreator,
  setValueActionCreator
} from "./actionCreators"
import { asyncTypes } from "./asyncActionTypes"
import {
  getCurrency,
  getCoin,
  getPairs,
  getValue
} from "./selectors"

function* getExchange() {
  try {
    const exchange = yield call(Privat.getExchange)
    const useful = Privat.getUsefulData(exchange)
    const enriced = Privat.enrichWithFakePairs(useful)
    yield put(loadPairsActionCreator(enriced))
  } catch (e) {
    console.log(e)
  }
}

function calculateResult({ pairs = [], coin = "BTC", currency = "USD", value = 0 }) {
  const pair = pairs.find(
    ({ coin: _coin, currency: _currency }) =>
      _coin === coin && _currency === currency
  )
  
  return pair ? value * pair.sale : 0
} 

function* setValue({ payload: value }) {
  yield put(setValueActionCreator(value))

  const currency = yield select(getCurrency)
  const coin = yield select(getCoin)
  const pairs = yield select(getPairs)

  if (pairs.length > 0) {
    const result = calculateResult({ pairs, coin, currency, value })
    yield put(setResultActionCreator(result))
  }
}

function* setCoin({ payload: coin }) {
  yield put(setCoinActionCreator(coin))

  const value = yield select(getValue)
  const currency = yield select(getCurrency)
  const pairs = yield select(getPairs)

  if (pairs.length > 0) {
    const result = calculateResult({ pairs, coin, currency, value })
    yield put(setResultActionCreator(result))
  }
}

function* setCurrency({ payload: currency }) {
  yield put(setCurrencyActionCreator(currency))

  const value = yield select(getValue)
  const coin = yield select(getCoin)
  const pairs = yield select(getPairs)

  if (pairs.length > 0) {
    const result = calculateResult({ pairs, coin, currency, value })
    yield put(setResultActionCreator(result))
  }
}

function* rootSaga() {
  yield takeEvery(asyncTypes.LOAD_PAIRS_ASYNC, getExchange)
  yield takeEvery(asyncTypes.SET_VALUE_ASYNC, setValue)
  yield takeEvery(asyncTypes.SET_COIN_ASYNC, setCoin)
  yield takeEvery(asyncTypes.SET_CURRENCY_ASYNC, setCurrency)
}

export default rootSaga
