import React, { useState } from "react"
import Container from "@material-ui/core/Container"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { makeStyles, useTheme } from "@material-ui/styles"
import Box from "@material-ui/core/Box"
import Greeting from "../../Components/Greeting"
import Orders from "../../Components/Orders"
import OrderForm from "../../Components/OrderForm"

const useStyles = makeStyles(theme => ({
  ordersMain: {
    padding: theme.spacing(8, 0, 0)
  },
  greetingContainer: {
    padding: theme.spacing(6, 0, 0)    
  }
}))

export default function Main() {
  const classes = useStyles()
  //const theme = useTheme()

  const [tabIdx, setTabIdx] = useState(0)

  const handleTabChange = (event, newTabIdx) => {
    setTabIdx(newTabIdx)
  }

  return (
    <Container maxWidth="md" component="main" className={classes.ordersMain}>
      <Tabs
        value={tabIdx}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Greeting" />
        <Tab label="Orders" />
        <Tab label="New Order" />
      </Tabs>
      <Box component="div" hidden={tabIdx !== 0} className={classes.greetingContainer}>
        <Greeting role="tabpanel" />
      </Box>
      <Box component="div" hidden={tabIdx !== 1}>
        <Orders />
      </Box>
      <Box component="div" hidden={tabIdx !== 2}>
        <OrderForm />
      </Box>
    </Container>
  )
}
