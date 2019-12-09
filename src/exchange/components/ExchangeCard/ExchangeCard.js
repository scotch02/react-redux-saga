import React from "react"
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import StarIcon from "@material-ui/icons/StarBorder"

import PropTypes from "prop-types"

import { connect } from "react-redux"

import {
  setCoinAsyncActionCreator
} from "../../../engine/asyncActionCreators"

const useStyles = makeStyles(theme => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  priceValue: {
    fontSize: "2rem"
  }
}))

function ExchangeCard(props) {
  /*   
  Harry Wolff: 
    Are you switching from using defaultProps to using object default values for your @reactjs function components? Why?
  Dan Abramov:
    Because defaultProps on functions will eventually get deprecated.
 */
  const { title = "XXX", usd = 0, uah = 0, rur = 0, selected = false, setCoin } = props

  const classes = useStyles()

   const handleChangeCoin = event => {
    setCoin(event.currentTarget.value)  
   }

  return (
    <Grid item key={title} xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          title={title}
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{ align: "center" }}
          action={title === "Pro" ? <StarIcon /> : null}
          className={classes.cardHeader}
        />
        <CardContent>
          <div className={classes.cardPricing}>
            <Typography variant="h6" color="textSecondary">
              USD:
            </Typography>
            <Typography
              component="h2"
              variant="h3"
              color="textPrimary"
              className={classes.priceValue}
            >
              {usd.toFixed(3)}
            </Typography>
          </div>

          <div className={classes.cardPricing}>
            <Typography variant="h6" color="textSecondary">
              UAH:
            </Typography>
            <Typography
              component="h2"
              variant="h3"
              color="textPrimary"
              className={classes.priceValue}
            >
              {uah.toFixed(3)}
            </Typography>
          </div>

          <div className={classes.cardPricing}>
            <Typography variant="h6" color="textSecondary">
              RUR:
            </Typography>
            <Typography
              component="h2"
              variant="h3"
              color="textPrimary"
              className={classes.priceValue}
            >
              {rur.toFixed(3)}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant={selected ? "contained" : "outlined"}
            color="primary"
            value={title}
            onClick = {handleChangeCoin}
          >
            Select
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

ExchangeCard.propTypes = {
  title: PropTypes.string,
  usd: PropTypes.number,
  uah: PropTypes.number,
  rur: PropTypes.number,
  selected: PropTypes.bool
}

const mapDispatchToProps = dispatch => {
  return {
    setCoin: value => {
      dispatch(setCoinAsyncActionCreator(value))
    }
  }
}

export default connect(null, mapDispatchToProps)(ExchangeCard)

