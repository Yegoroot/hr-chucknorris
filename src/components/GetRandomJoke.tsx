/* eslint-disable import/prefer-default-export */
import React from 'react'
import {
  Button, makeStyles, CircularProgress
} from '@material-ui/core'
import { useDispatch, useSelector } from '../store/hooks'
import { getjokeRequest } from '../slices/jokes'

const useStyles = makeStyles((/* theme */) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  button: {
    marginBottom: 20,
  }
}))

export const GetRandomJoke = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const { loading, value } = useSelector((store) => store.jokes.item)

  const onRequestJoke = () => {
    dispatch(getjokeRequest())
  }
  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        onClick={onRequestJoke}
        variant="outlined"
      >
        Show Joke
      </Button>

      {loading ? (
        <CircularProgress
          color="primary"
        />
      ) : <b>{value}</b>}

    </div>
  )
}
