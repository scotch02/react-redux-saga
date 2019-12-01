import { call, put, takeEvery } from 'redux-saga/effects'
import Privat from '../api/exchange/Privat'
import { LOAD_CURRENCY_PAIRS_ } from './actions'

function* getExchange(action) {
    try {
        const exchange = yield call(Privat.getExchange)
        const useful = Privat.getUsefulData(exchange)
        const enriced = Privat.enrichWithFakePairs(useful)
        yield put({ type: LOAD_CURRENCY_PAIRS_, payload: enriced })
    } catch (e) {
        console.log(e)
    }
}

/*
  Запускаем `fetchUser` на каждое задиспатченное действие `USER_FETCH_REQUESTED`.
  Позволяет одновременно получать данные пользователей.
*/
function* mySaga() {
    yield takeEvery("LOAD_CURRENCY_PAIRS", getExchange);
}

export default mySaga;