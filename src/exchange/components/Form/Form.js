import React from "react"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/styles"
import { Button } from "@material-ui/core"

import PropTypes from "prop-types"
import { connect } from "react-redux"

import {
  setResultAsyncActionCreator,
  setCoinAsyncActionCreator,
  setCurrencyAsyncActionCreator
} from "../../../engine/asyncActionCreators"

import { currencies } from "../../constants"

const useStyles = makeStyles(theme => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  result: {
    padding: theme.spacing(8, 0, 0)
  }
}))

function Form(props) {
  const {
    buttonOptionsArray,
    setResult,
    setCurrency,
    result,
    currency,
    coin,
    value
  } = props

  const classes = useStyles()

  const handleInput = event => {
    setResult(parseFloat(event.target.value))
  }

  const handleChangeCurrency = event => {
    setCurrency(event.currentTarget.value)
  }

  const error = true

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Volume
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="volume"
            label="volume"
            fullWidth
            error
            helperText={
              error
                ? "Incorrect entry."
                : "How many cryptocurrencies would you like to buy"
            }
            type="number"
            onInput={handleInput}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <div className={classes.buttons}>
          {buttonOptionsArray.map(buttonOptions => {
            return (
              <Button
                key={buttonOptions.caption}
                value={buttonOptions.caption}
                variant={buttonOptions.selected ? "contained" : "outlined"}
                color="primary"
                className={classes.button}
                onClick={handleChangeCurrency}
              >
                {buttonOptions.caption}
              </Button>
            )
          })}
        </div>
      </Grid>
      <Grid container spacing={3}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          className={classes.result}
        >
          {value} {coin} will be {result} in {currency}
        </Typography>
      </Grid>
    </>
  )
}

Form.propTypes = {
  buttonOptionsArray: PropTypes.arrayOf(
    PropTypes.shape({
      caption: PropTypes.string,
      selected: PropTypes.bool
    })
  ),
  result: PropTypes.number
}

Form.defaultProps = {
  buttonOptionsArray: [
    { caption: "UAH" },
    { caption: "USD", selected: true },
    { caption: "RUR" }
  ],
  result: 0
}

const mapStateToProps = state => {
  const {
    currency,
    coin,
    value,
    result
  } = state
  return {
    buttonOptionsArray: currencies.map(title => ({
      caption: title,
      selected: title === currency
    })),
    result,
    currency,
    coin,
    value
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setResult: value => {
      dispatch(setResultAsyncActionCreator(value))
    },
    setCoin: value => {
      dispatch(setCoinAsyncActionCreator(value))
    },
    setCurrency: value => {
      dispatch(setCurrencyAsyncActionCreator(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
