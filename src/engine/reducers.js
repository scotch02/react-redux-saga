import { combineReducers } from "redux";

import {
  LOAD_CURRENCY_PAIRS,
  SET_CURRENT_CURRENCY,
  SET_CURRENT_BASE_CURRENCY,
  SET_RESULT
} from "./actions";

/*

const state = {
    currencyPairs: Array of Object ref
    currentCurrency: String
    currentBaseCurrency: String
    result: Number
} 

*/

const initialState = {
  currencyPairs: [],
  currentCurrency: "BTC",
  currentBaseCurrency: "UAH",
  result: 0
};

const currencyActionMapper = {
  [LOAD_CURRENCY_PAIRS]: function(state, { payload }) {
    return {
      ...state,
      currencyPairs: payload
    };
  }
};

const currencyPairsReducer = function(state = initialState, action) {
  const typeHandler = currencyActionMapper[action.type];
  return typeHandler ? typeHandler(state, action) : state;
};

const exchangerActionMapper = {
  [SET_CURRENT_CURRENCY]: function(state, { payload }) {
    return {
      ...state,
      currentCurrency: payload
    };
  },
  [SET_CURRENT_BASE_CURRENCY]: function(state, { payload }) {
    return {
      ...state,
      currentBaseCurrency: payload
    };
  },
  [SET_RESULT]: function(state, { payload }) {
    return {
      ...state,
      result: payload
    };
  }
};

const exchangerStateReducer = function(state = initialState, action) {
  const typeHandler = exchangerActionMapper[action.type];
  return typeHandler ? typeHandler(state, action) : state;
};

const combinedReducer = combineReducers({
  currencyPairs: currencyPairsReducer,

  currentCurrency: exchangerStateReducer,
  currentBaseCurrency: exchangerStateReducer,
  result: exchangerStateReducer
});

export default combinedReducer;
