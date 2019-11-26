import React from "react"
import {
  Container,
  Grid,
  Button
} from "@material-ui/core"

import RRSCurrency from "../RRSCurrency/RRSCurrency"
import Form from "../PaymentForm/PaymentForm"
import { makeStyles } from "@material-ui/styles"


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
    usd: 0.2500,
    uah: 7.0231,
    rub: 17.228,
    selected: false
  }
]

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}));

export default function RRSMain() {
  const classes = useStyles()

  return (
    <>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {currencies.map(currency => (
            <RRSCurrency {...currency} />
          ))}
        </Grid>
      </Container>
      
      <Form />

      <div className={classes.buttons}>
        <Button className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Place order
        </Button>
      </div>

    </>
  )
}
