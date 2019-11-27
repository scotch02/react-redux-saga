import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

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

export default function PaymentForm() {
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
        <div className={classes.buttons}>
          <Button variant="outlined" color="primary" className={classes.button}>
            UAH
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            USD
          </Button>
          <Button variant="outlined" color="primary" className={classes.button}>
            RUB
          </Button>
        </div>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          className={classes.result}
        >
          5 ETH will be 37000 in UAH
      </Typography>

      </Grid>
    </>
  );
}
