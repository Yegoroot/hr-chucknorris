import React from 'react'
import { makeStyles } from '@material-ui/core'
import { GetRandomJoke } from '../components/GetRandomJoke'
import { InfoCompany } from '../components/InfoCompany'
import { FavoriteJokes } from '../components/FavoriteJokes'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '70px 20px 0',
    maxWidth: 1200,
    margin: 'auto',
  },
  header: {
    marginBottom: 50,
    display: 'grid',
    gridTemplateColumns: '500px 1fr',
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
      <div className={classes.header}>
        <InfoCompany />
        <GetRandomJoke />
      </div>
      <FavoriteJokes />
    </div>
  )
}

export default Home
