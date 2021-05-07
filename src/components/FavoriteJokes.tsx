/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useDispatch, useSelector } from '../store/hooks'
import { unlikeJoke, unlikeAll } from '../slices/jokes'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    marginBottom: 32
  },
  title: {
  },
  joke: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    color: theme.palette.error.main
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gridGap: 40
  },
  unlikeall: {
    alignSelf: 'flex-end',
    marginTop: 32,
    color: theme.palette.error.main
  }
}))

export const FavoriteJokes = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { data } = useSelector((store) => store.jokes.list)

  if (!data.length) return null

  return (
    <div className={classes.root}>

      <div className={classes.header}>
        <h2 className={classes.title}>Favorite Jokes 🙂</h2>
      </div>

      <div className={classes.list}>
        {data.map((j) => (
          <div className={classes.joke}>
            <h4>{j.value}</h4>
            <Button onClick={() => dispatch(unlikeJoke(j.id))}>
              <Close className={classes.icon} />
            </Button>
          </div>
        ))}
      </div>

      <Button
        className={classes.unlikeall}
        onClick={() => dispatch(unlikeAll())}
      >
        Unlike all
      </Button>
    </div>
  )
}
