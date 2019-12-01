import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import PropTypes from 'prop-types';
import { connect } from "react-redux";

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

}));

function Form(props) {
  const { buttonOptionsArray, result } = props;

  const classes = useStyles();

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
            helperText="How many cryptocurrencies would you like to buy"
            fullWidth
            error
            helperText="Incorrect entry."
            type="number"
          />
        </Grid>

        <Grid item xs={12} md={6}></Grid>
      </Grid>
      <Grid container spacing={3}>
        <div className={classes.buttons}>
          {
            buttonOptionsArray.map(buttonOptions => {
              return (
                <Button key={buttonOptions.caption} variant={buttonOptions.selected ? "contained" : "outlined"} color="primary" className={classes.button}>
                  {buttonOptions.caption}
                </Button>
              )
            })
          }
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
  );
}

Form.propTypes = {
  buttonOptionsArray: PropTypes.array,
  result: PropTypes.number
}

Form.defaultProps = {
  buttonOptionsArray: [
    { caption: "UAH" },
    { caption: "USD", selected: true },
    { caption: "RUR" },
  ],
  result: 0
}

const mapStateToProps = (state) => {
  const { baseCurrencies, currentBaseCurrency, result } = state
  return {
    buttonOptionsArray: baseCurrencies.map(title => ({
      caption: title,
      selected: title === currentBaseCurrency
    })),
    result
  }
}

export default connect(mapStateToProps)(Form)
