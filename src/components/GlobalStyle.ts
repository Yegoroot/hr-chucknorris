import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      // [theme.breakpoints.down('md')]: {

      // },
      fontFamily: 'sans-serif',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      fontSize: '1rem',
      height: '100%',
      width: '100%',
      lineHeight: 1.5,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      // disable select text
      '-webkit-user-select': 'none',
      '-webkit-touch-callout': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none',
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    a: {
      '&.active': {
        transform: 'scale(1.08)',
        transition: '0.2s',
        color: theme.palette.primary.main,
      },
    },
  }

}))

const GlobalStyles = () => {
  useStyles()
  return null
}

export default GlobalStyles
