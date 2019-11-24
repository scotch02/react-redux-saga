import React from "react";
import "./App.css";
import RRSAppBar from "./components/RRSAppBar/RRSAppBar";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { purple, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RRSAppBar />
      </ThemeProvider>
    </>
  );
}

export default App;
