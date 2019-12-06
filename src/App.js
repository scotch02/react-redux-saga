import React from "react"
import "./App.css"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core"
import { purple, green } from "@material-ui/core/colors"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import mySaga from "./engine/sagas"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Header from "./common/Header/Header"
import ExchangePage from "./exchange/components/Main/Main"
import OrdersPage from "./orders/Pages/Main/Main"
import Footer from "./common/Footer/Footer"

import combinedReducer from "./engine/reducers"

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combinedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

// затем запускаем saga
sagaMiddleware.run(mySaga)

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  status: {
    danger: "orange"
  }
})

/* const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  }
}));
 */

function App() {
  /*   const classes = useStyles()
   */
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Switch>
            <Route path="/orders">
              <OrdersPage />
            </Route>
            <Route path={["/exchange", "/"]}>
              <ExchangePage />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
