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
  setCurrentCurrencyAsyncActionCreator,
  setCurrentBaseCurrencyAsyncActionCreator
} from "../../../engine/asyncActionCreators"

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
  const { buttonOptionsArray, result, setResult, setCurrentBaseCurrency } = props

  const classes = useStyles()

  const handleInput = event => {
    setResult(parseFloat(event.target.value))
  }

  const handleChangeCurrentBaseCurrency = event => {
    setCurrentBaseCurrency(event.target.value)
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
                onClick={handleChangeCurrentBaseCurrency}
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
          5 ETH will be {result} in UAH
        </Typography>
      </Grid>
    </>
  )
}

Form.propTypes = {
  buttonOptionsArray: PropTypes.array,
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
  const { baseCurrencies, currentBaseCurrency, result } = state
  return {
    buttonOptionsArray: baseCurrencies.map(title => ({
      caption: title,
      selected: title === currentBaseCurrency
    })),
    result
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setResult: value => {
      dispatch(setResultAsyncActionCreator(value))
    },
    setCurrentCurrency: value => {
      dispatch(setCurrentCurrencyAsyncActionCreator(value))
    },
    setCurrentBaseCurrency: value => {
      dispatch(setCurrentBaseCurrencyAsyncActionCreator(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
