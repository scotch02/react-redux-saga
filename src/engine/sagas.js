import { call, put, takeEvery, select } from "redux-saga/effects"
import Privat from "../api/exchange/Privat"
import {
  loadCurrencyPairsActionCreator,
  setResultActionCreator,
  setCurrentCurrencyActionCreator,
  setCurrentBaseCurrencyActionCreator,
  setValueActionCreator
} from "./actionCreators"
import { asyncTypes } from "./asyncActionTypes"
import {
  getCurrentBaseCurrency,
  getCurrentCurrency,
  getCurrencyPairs,
  getValue
} from "./selectors"

function* getExchange() {
  try {
    const exchange = yield call(Privat.getExchange)
    const useful = Privat.getUsefulData(exchange)
    const enriced = Privat.enrichWithFakePairs(useful)
    yield put(loadCurrencyPairsActionCreator(enriced))
  } catch (e) {
    console.log(e)
  }
}

function* setValue({ payload: value }) {
  yield put(setValueActionCreator(value))

  const currentBaseCurrency = yield select(getCurrentBaseCurrency)
  const currentCurrency = yield select(getCurrentCurrency)
  const currencyPair = yield select(getCurrencyPairs)
  const pair = currencyPair.find(
    ({ currency, baseCurrency }) =>
      currency === currentCurrency && baseCurrency === currentBaseCurrency
  )
  const result = value * pair.sale
  yield put(setResultActionCreator(result))
}

function* setCurrentCurrency({ payload: currentCurrency }) {
  yield put(setCurrentCurrencyActionCreator(currentCurrency))

  const value = yield select(getValue)
  const currentBaseCurrency = yield select(getCurrentBaseCurrency)
  //const currentCurrency = yield select(getCurrentCurrency)
  const currencyPair = yield select(getCurrencyPairs)
  const pair = currencyPair.find(
    ({ currency, baseCurrency }) =>
      currency === currentCurrency && baseCurrency === currentBaseCurrency
  )
  const result = value * pair.sale
  yield put(setResultActionCreator(result))
}

function* setCurrentBaseCurrency({ payload: currentBaseCurrency }) {
  yield put(setCurrentBaseCurrencyActionCreator(currentBaseCurrency))

  const value = yield select(getValue)
  //const currentBaseCurrency = yield select(getCurrentBaseCurrency)
  const currentCurrency = yield select(getCurrentCurrency)
  const currencyPair = yield select(getCurrencyPairs)
  const pair = currencyPair.find(
    ({ currency, baseCurrency }) =>
      currency === currentCurrency && baseCurrency === currentBaseCurrency
  )
  const result = value * pair.sale
  yield put(setResultActionCreator(result))
}

function* rootSaga() {
  yield takeEvery(asyncTypes.LOAD_CURRENCY_PAIRS_ASYNC, getExchange)
  yield takeEvery(asyncTypes.SET_RESULT_ASYNC, setValue)
  yield takeEvery(asyncTypes.SET_CURRENT_CURRENCY_ASYNC, setCurrentCurrency)
  yield takeEvery(asyncTypes.SET_CURRENT_BASE_CURRENCY_ASYNC, setCurrentBaseCurrency)
}

export default rootSaga
