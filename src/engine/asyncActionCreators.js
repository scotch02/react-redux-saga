import { asyncTypes } from "./asyncActionTypes"

export function loadCurrencyPairsAsyncActionCreator() {
  return {
    type: asyncTypes.LOAD_CURRENCY_PAIRS_ASYNC
  }
}
