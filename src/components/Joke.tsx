/* eslint-disable import/prefer-default-export */
import React from 'react'
import { CircularProgress, IconButton, makeStyles } from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import { useDispatch, useSelector } from '../store/hooks'
import { likeJoke, unlikeJoke } from '../slices/jokes'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  like: {
    color: theme.palette.error.main,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: -10
  }
}))

// Component Joke
export const Joke = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { loading, id, value } = useSelector((store) => store.jokes.item) // one joke
  const { data } = useSelector((store) => store.jokes.list) // list of jokes

  const isLiked = data.find((j) => j.id === id)

  if (loading) {
    return <CircularProgress color="primary" />
  }
  if (id) {
    return (
      <div className={classes.root}>
        <b>{value}</b>
        <IconButton className={classes.like}>
          {isLiked
            ? <Favorite onClick={() => dispatch(unlikeJoke(id))} />
            : <FavoriteBorder onClick={() => dispatch(likeJoke())} />}
        </IconButton>
      </div>
    )
  }
  return null
}
