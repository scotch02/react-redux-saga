import AppBar from "@material-ui/core/AppBar"
import React from "react"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"

import { Link as RouterLink} from "react-router-dom"

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}))

const LinkExcange = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/exchange" {...props} />
));

const LinkOrders = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to="/orders" {...props} />
));

export default function Header() {
  const classes = useStyles()

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          React November 2019
        </Typography>
        <nav>
          <Link
            variant="button"
            color="textPrimary"
            //href="#"
            className={classes.link}
            component={LinkExcange}
          >
            Exchange
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            React Redux Router
          </Link>
          <Link
            variant="button"
            color="textPrimary"
            //href="#"
            className={classes.link}
            component={LinkOrders}
          >
            Orders
          </Link>
        </nav>
        <Button
          href="#"
          color="primary"
          variant="outlined"
          className={classes.link}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}
