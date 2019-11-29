import React from "react"
import "./App.css"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core"
import { purple, green } from "@material-ui/core/colors"
import Header from "./common/Header/Header"
import RRSMain from "./exchange/components/Main/Main"
import Footer from "./common/Footer/Footer"

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import combinedReducer from './engine/reducers'

const store = createStore(
  combinedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
        <Header />
        <RRSMain />
        <Footer />
      </ThemeProvider>
    </Provider>
  )
}

export default App
