import React from "react"
import { Container, Grid } from "@material-ui/core"

import Card from "../Card/Card"
import Form from "../Form/Form"
import { makeStyles } from "@material-ui/styles"

/*
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
]
*/

const useStyles = makeStyles(theme => ({
  currencies: {
    padding: theme.spacing(8, 0, 0)
  },
  form: {
    padding: theme.spacing(8, 4, 6)
  }
}))

export default function Main(props) {
  const classes = useStyles()

  const { cards } = props

  return (
    <>
      <Container maxWidth="md" component="main" className={classes.currencies}>
        <Grid container spacing={5} alignItems="flex-end">
          {cards.map(card => (
            <Card {...card} />
          ))}
        </Grid>
      </Container>

      <Container maxWidth="md" component="main" className={classes.form}>
        <Form />
      </Container>
    </>
  )
}

const buildCardStructure = (currencyPairs, currentCurrency, title) => {
  return currencyPairs
    .filter(({ currency }) => currency === title)
    .reduce(
      (currency, pair) => {
        const { baseCurrency, sale } = pair
        return {
          ...currency,
          [baseCurrency.toLowerCase()]: sale
        }
      },
      {
        title,
        selected: currentCurrency === title
      }
    )
}

mapStateToProps = state => {
  const { currencyPairs, currentCurrency } = state
  return {
    cards: ["BTC", "ETH", "XRP"].map(title =>
      buildCardStructure(currencyPairs, currentCurrency, title)
    )
  }
}
