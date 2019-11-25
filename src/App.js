import React from "react";
import "./App.css";
import RRSAppBar from "./components/RRSAppBar/RRSAppBar";
import RRSHeroUnit from "./components/RRSHeroUnit/RRSHeroUnit";
import RRSMain from "./components/RRSMain/RRSMain";
import RRSFooter from "./components/RRSFooter/RRSFooter";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { purple, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  status: {
    danger: "orange"
  }
});

const useStyles = makeStyles(theme => ({
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

function App() {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RRSAppBar />
        <RRSHeroUnit />
        <RRSMain />
        <RRSFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
