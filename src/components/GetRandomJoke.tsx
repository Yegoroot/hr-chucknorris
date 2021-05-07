/* eslint-disable import/prefer-default-export */
import React from 'react'
import {
  Button, makeStyles, CircularProgress
} from '@material-ui/core'
import { useDispatch, useSelector } from '../store/hooks'
import { getJokeRequest } from '../slices/jokes'

const useStyles = makeStyles((/* theme */) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  buttons: {
    display: 'flex',
    marginBottom: 24,
  },
  button1: {
    marginRight: 8,
  }
}))

export const GetRandomJoke = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { loading, value } = useSelector((store) => store.jokes.item)
  const [isIntervaled, setIsIntervaled] = React.useState(false)

  const onRequestJoke = () => {
    dispatch(getJokeRequest())
  }

  //--------------------
  let timerId: any
  const start = () => {
    timerId = setInterval(onRequestJoke, 3000)
  }
  const stop = () => {
    clearInterval(timerId)
  }
  //---------------

  const onRequestJokeInterval = () => {
    if (!isIntervaled) {
      stop()
    } else {
      start()
    }
  }

  React.useEffect(() => {
    onRequestJokeInterval()
    return () => stop()
  }, [isIntervaled])

  const Joke = () => (loading ? (
    <CircularProgress color="primary" />
  ) : <b>{value}</b>)

  return (
    <div className={classes.root}>

      <div className={classes.buttons}>
        <Button
          onClick={onRequestJoke}
          variant="outlined"
          disabled={isIntervaled}
          className={classes.button1}
        >
          {!value && !loading ? 'Show Joke' : 'Reload Joke'}
        </Button>

        <Button
          onClick={() => setIsIntervaled((state) => !state)}
          variant="outlined"
          color="primary"
        >
          {isIntervaled ? 'Stop Showing Every 3 sec' : 'Show Joke Every 3 sec'}
        </Button>
      </div>

      <Joke />
    </div>
  )
}
