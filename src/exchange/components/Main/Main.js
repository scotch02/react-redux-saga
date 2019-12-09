import React, { useEffect, useCallback } from "react"
import { connect } from "react-redux"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import makeStyles from "@material-ui/styles/makeStyles"
import PropTypes from "prop-types"
import Card from "../ExchangeCard/ExchangeCard"
import Form from "../Form/Form"
import { loadPairsAsyncActionCreator } from "../../../engine/asyncActionCreators"
import { dijitalCoins as coins } from "../../constants"

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

  const { cards, loadPairs } = props
  // https://www.robinwieruch.de/react-hooks-fetch-data

  const initLoadPairs = useCallback(loadPairs, [loadPairs]);

  useEffect(() => {
    initLoadPairs()
  }, [initLoadPairs])

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
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      usd: PropTypes.number,
      uah: PropTypes.number,
      rur: PropTypes.number,
      selected: PropTypes.bool
    })
  ),
  isEmpty: PropTypes.bool,
  loadPairs: PropTypes.func
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
  loadPairs: () => {}
}

const buildCardStructure = (pairs, coin, title) => {
  return pairs
    .filter(({ coin }) => coin === title)
    .reduce(
      (card, pair) => {
        const { currency, sale } = pair
        return {
          ...card,
          [currency.toLowerCase()]: sale
        }
      },
      {
        title,
        selected: coin === title
      }
    )
}

const mapStateToProps = state => {
  const { pairs, coin } = state
  return {
    cards: coins.map(title =>
      buildCardStructure(pairs, coin, title)
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPairs: () => {
      dispatch(loadPairsAsyncActionCreator())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
