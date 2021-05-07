import React from 'react'
import { makeStyles } from '@material-ui/core'
import { GetRandomJoke } from '../components/GetRandomJoke'
import { InfoCompany } from '../components/InfoCompany'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '70px 20px 0',
    maxWidth: 1200,
    margin: 'auto',
    display: 'grid',
    gridTemplateColumns: '460px 1fr',
    gridGap: 40,
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 60
    },
  }
}))
const Home = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <InfoCompany />
      <GetRandomJoke />
    </div>
  )

  // return (!localStorage.getItem('user'))
  //   ? <div>0000 </div>
  //   : (
  //     <div className={classes.root}>

  //       fdfd
  //     </div>
  //   )
}

export default Home
