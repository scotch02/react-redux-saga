import React from "react"
import { Grid, Card, CardHeader, CardContent, Typography, CardActions, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import StarIcon from "@material-ui/icons/StarBorder"


const useStyles = makeStyles(theme => ({
    cardHeader: {
      backgroundColor: theme.palette.grey[200]
    },
    cardPricing: {
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      marginBottom: theme.spacing(2)
    }
  }))
  

export default function Course(props) {
    const { title, usd, uah, rub, selected } = props

    const classes = useStyles()
    
    return (
        <Grid
        item
        key={ title }
        xs={12}
        sm={6}
        md={4}
      >
        <Card>
          <CardHeader
            title={ title }
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
              <Typography component="h2" variant="h3" color="textPrimary">
                { usd }
              </Typography>
            </div>

            <div className={classes.cardPricing}>
            <Typography variant="h6" color="textSecondary">
                UAH:
              </Typography>
              <Typography component="h2" variant="h3" color="textPrimary">
                { uah }
              </Typography>
            </div>

            <div className={classes.cardPricing}>
            <Typography variant="h6" color="textSecondary">
                RUB:
              </Typography>
              <Typography component="h2" variant="h3" color="textPrimary">
                { rub }
              </Typography>
            </div>

          </CardContent>
          <CardActions>
            <Button fullWidth variant={ selected ? "contained" : "outlined" } color="primary">
              Select 
            </Button>
          </CardActions>
        </Card>
      </Grid>

    )
}