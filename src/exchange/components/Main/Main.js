import React, { useEffect } from "react"
import { connect } from "react-redux"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import makeStyles from "@material-ui/styles/makeStyles"
import PropTypes from "prop-types"
import Card from "../ExchangeCard/ExchangeCard"
import Form from "../Form/Form"
import { loadCurrencyPairsAsyncActionCreator } from "../../../engine/asyncActionCreators"

const useStyles = makeStyles(theme => ({
  currencies: {
    padding: theme.spacing(8, 0, 0)
  },
  form: {
    padding: theme.spacing(8, 0, 6)
  }
}))

function Main(props) {
  const classes = useStyles()

  const { cards, isEmpty, loadCurrencyPairs } = props
  // https://www.robinwieruch.de/react-hooks-fetch-data

  useEffect(() => {
    if (isEmpty) {
      loadCurrencyPairs()
    }
  }, [isEmpty, loadCurrencyPairs])

  return (
    <>
      <Container maxWidth="md" component="main" className={classes.currencies}>
        <Grid container spacing={5} alignItems="flex-end">
          {cards.map(card => (
            <Card key={card.title} {...card} />
          ))}
        </Grid>
      </Container>

      <Container maxWidth="md" component="main" className={classes.form}>
        <Form />
      </Container>
    </>
  )
}

Main.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  isEmpty: PropTypes.bool,
  loadCurrencyPairs: PropTypes.func
}

Main.defaultProps = {
  cards: [
    {
      title: "BTC",
      usd: 6800,
      uah: 150000,
      rur: 340000,
      selected: false
    },
    {
      title: "ETH",
      usd: 250,
      uah: 7400,
      rur: 160000,
      selected: false
    },
    {
      title: "XRP",
      usd: 0.25,
      uah: 7.0231,
      rur: 17.228,
      selected: false
    }
  ],
  isEmpty: false,
  loadCurrencyPairs: () => {}
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

const mapStateToProps = state => {
  const { currencyPairs, currentCurrency, currencies } = state
  return {
    cards: currencies.map(title =>
      buildCardStructure(currencyPairs, currentCurrency, title)
    ),
    isEmpty: currencyPairs.length === 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCurrencyPairs: () => {
      dispatch(loadCurrencyPairsAsyncActionCreator())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
