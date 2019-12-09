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

function* setValue({ payload: value }) {
  yield put(setValueActionCreator(value))

  const _currency = yield select(getCurrency)
  const _coin = yield select(getCoin)
  const pairs = yield select(getPairs)
  if (pairs.length > 0) {
    const pair = pairs.find(
      ({ coin, currency }) =>
        _coin === coin && _currency === currency
    )
    const result = value * pair.sale
    yield put(setResultActionCreator(result))
  }
}

function* setCoin({ payload: _coin }) {
  yield put(setCoinActionCreator(_coin))

  const value = yield select(getValue)
  const _currency = yield select(getCurrency)
  const pairs = yield select(getPairs)
  if (pairs.length > 0) {
    const pair = pairs.find(
      ({ coin, currency }) =>
        _coin === coin && _currency === currency
    )
    const result = value * pair.sale
    yield put(setResultActionCreator(result))
  }
}

function* setCurrency({ payload: _currency }) {
  yield put(setCurrencyActionCreator(_currency))

  const value = yield select(getValue)
  const _coin = yield select(getCoin)
  const pairs = yield select(getPairs)
  if (pairs.length > 0) {
    const pair = pairs.find(
      ({ coin, currency }) =>
        _coin === coin && _currency === currency
    )
    const result = value * pair.sale
    yield put(setResultActionCreator(result))
  }
}

function* rootSaga() {
  yield takeEvery(asyncTypes.LOAD_PAIRS_ASYNC, getExchange)
  yield takeEvery(asyncTypes.SET_RESULT_ASYNC, setValue)
  yield takeEvery(asyncTypes.SET_COIN_ASYNC, setCoin)
  yield takeEvery(asyncTypes.SET_CURRENCY_ASYNC, setCurrency)
}

export default rootSaga
