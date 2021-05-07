import React from 'react'
import {
  CircularProgress,
  makeStyles
} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    color: 'white'
  },
  transparent: {
    background: 'none'
  },
  absolute: {
    position: 'absolute'
  }
}))

const LoadingScreen = ({
  transparent, absolute, color, className
}:
  {transparent?: any, absolute?: any, color?: string, className?: any }) => {
  const classes = useStyles()

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.transparent]: transparent,
        [classes.absolute]: absolute,
        [className]: true
      })}
      style={{ color }}
    >
      <CircularProgress
        color="inherit"
      />
    </div>
  )
}

export default LoadingScreen
