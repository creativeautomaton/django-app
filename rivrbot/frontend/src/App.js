import './App.css'
import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { green, grey, red } from '@material-ui/core/colors';
import Layout from './containers/Layout'

export default function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#69696a',
        main: '#28282a',
        dark: '#1e1e1f',
      },
      secondary: {
        light: '#fff5f8',
        main: '#ff3366',
        dark: '#e62958',
      },
      warning: {
        main: '#ffc071',
        dark: '#ffb25e',
      },
      error: {
        xLight: red[50],
        main: red[500],
        dark: red[700],
      },
      success: {
        xLight: green[50],
        dark: green[700],
      },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    fontFamilySecondary: "'Roboto Condensed', sans-serif",
  },
  overides: {
      CardActions: {
        root: {
          overflow: 'scroll',
        },
      },
    },
  })

  return (
    <MuiThemeProvider theme={theme}>
      <Layout />
    </MuiThemeProvider>
  )
}
