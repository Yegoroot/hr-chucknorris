import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((/* theme */) => ({
  root: {
    height: '100%'
  }
}))
const Home = () => {
  const classes = useStyles()

  return (!localStorage.getItem('user'))
    ? <div>0000 </div>
    : (
      <div className={classes.root}>

        fdfd
      </div>
    )
}

export default Home
