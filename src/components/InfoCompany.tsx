/* eslint-disable import/prefer-default-export */
import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {},
  title: {

  },
  button: {}
}))

export const InfoCompany = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1>&lt;InCodeWeTrust /&gt;</h1>
      <h2>Клуб Фронтенд Джентельменов</h2>
    </div>
  )
}
