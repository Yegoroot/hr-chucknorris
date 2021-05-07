import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { create } from 'jss'

import {
  jssPreset,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core'
import routes, { renderRoutes } from './routes'
import { createTheme } from './theme/index'
import GlobalStyles from './components/GlobalStyle'

const jss = create({ plugins: [...jssPreset().plugins] })

const App = () => {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <React.StrictMode>
          <GlobalStyles />
          <BrowserRouter>
            {renderRoutes(routes)}
          </BrowserRouter>
        </React.StrictMode>
      </StylesProvider>
    </ThemeProvider>
  )
}

export default App
