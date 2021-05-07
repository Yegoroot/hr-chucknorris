/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from '../store/hooks'
import { getJokeRequest } from '../slices/jokes'
import { Joke } from './Joke'

const useStyles = makeStyles(() => ({
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
  const { loading, id } = useSelector((store) => store.jokes.item)
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

  return (
    <div className={classes.root}>

      <div className={classes.buttons}>
        <Button
          onClick={onRequestJoke}
          variant="outlined"
          disabled={isIntervaled}
          className={classes.button1}
          color="primary"
        >
          {!id && !loading ? 'Show Joke' : 'Reload Joke'}
        </Button>

        <Button
          onClick={() => setIsIntervaled((state) => !state)}
          variant="outlined"
        >
          {isIntervaled ? 'Stop Showing Every 3 sec' : 'Show Joke Every 3 sec'}
        </Button>
      </div>

      <Joke />
    </div>
  )
}
