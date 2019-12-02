import { call, put, takeEvery } from "redux-saga/effects"
import Privat from "../api/exchange/Privat"
import { loadCurrencyPairsActionCreator } from "./actionCreators"
import { asyncTypes } from "./asyncActionTypes"

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

function* rootSaga() {
  yield takeEvery(asyncTypes.LOAD_CURRENCY_PAIRS_ASYNC, getExchange)
}

export default rootSaga
