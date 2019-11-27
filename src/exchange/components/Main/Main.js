import React from "react";
import { Container, Grid } from "@material-ui/core";

import RRSCurrency from "../Course/Course";
import Form from "../Form/Form";
import { makeStyles } from "@material-ui/styles";

const currencies = [
  {
    title: "BTC",
    usd: 6800,
    uah: 150000,
    rub: 340000,
    selected: false
  },
  {
    title: "ETH",
    usd: 250,
    uah: 7400,
    rub: 160000,
    selected: true
  },
  {
    title: "XRP",
    usd: 0.25,
    uah: 7.0231,
    rub: 17.228,
    selected: false
  }
];

const useStyles = makeStyles(theme => ({
  currencies: {
    padding: theme.spacing(8, 0, 0)
  },
  form: {
    padding: theme.spacing(8, 4, 6)
  }
}));

export default function Main() {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md" component="main" className={classes.currencies}>
        <Grid container spacing={5} alignItems="flex-end">
          {currencies.map(currency => (
            <RRSCurrency {...currency} />
          ))}
        </Grid>
      </Container>

      <Container maxWidth="md" component="main" className={classes.form}>
        <Form />
      </Container>
    </>
  );
}
