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

import withImmutablePropsToJS from "with-immutable-props-to-js"

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

  const initLoadPairs = useCallback(loadPairs, [loadPairs])

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
      usd: 1,
      uah: 1,
      rur: 1,
      selected: false
    },
    {
      title: "ETH",
      usd: 1,
      uah: 1,
      rur: 1,
      selected: false
    },
    {
      title: "XRP",
      usd: 1,
      uah: 1,
      rur: 1,
      selected: false
    }
  ],
  loadPairs: () => {}
}

const buildCardStructure = (pairs, coin, title) => {
  return pairs
    .filter( pair => pair.get("coin") === title)
    .reduce(
      (card, pair) => {
        const currency = pair.get("currency")
        const sale = pair.get("sale")
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
  const pairs = state.getIn(["exchange", "pairs"])
  const coin = state.getIn(["exchange", "coin"])

  const cards = coins.map(title => buildCardStructure(pairs, coin, title))

  return {
    cards
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPairs: () => {
      dispatch(loadPairsAsyncActionCreator())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(Main))
