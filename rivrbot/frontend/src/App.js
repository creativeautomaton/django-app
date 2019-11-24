import './App.css'
import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors';
import Layout from './containers/Layout'


export default function App() {
  const frontendtheme = createMuiTheme({
      palette: {
        primary: {
          light: '#C5CAE9',
          main:  '#3F51B5',
          dark:  '#303F9F',
        },
        secondary: {
          light: '#FFECB3',
          main: '#FFC107',
          dark: '#FFA000',
        },
        font: {
          light: '#FFF',
          dark: '#333',
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
      fontFamily: "'Poppins', sans-serif",
      fontSize: 12,
      fontWeightLight: 300, // Work Sans
      fontWeightRegular: 400, // Work Sans
      fontWeightMedium: 700, // Roboto Condensed
      fontFamilySecondary: "'Roboto', sans-serif",
    },
    overides: {
        CardActions: {
          root: {
            overflow: 'scroll',
          },
        },
      },
  })

  const backendtheme = createMuiTheme({
    palette: {
      primary: {
        light: '#C5CAE9',
        main:  '#3F51B5',
        dark:  '#303F9F',
      },
      secondary: {
        light: '#FFECB3',
        main: '#FFC107',
        dark: '#FFA000',
      },
      font: {
        light: '#FFF',
        dark: '#333',
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
    fontFamily: "'Poppins', sans-serif",
    fontSize: 12,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    fontFamilySecondary: "'Roboto', sans-serif",
  },
  overides: {
      CardActions: {
        root: {
          overflow: 'scroll',
        },
      },
    },
  })

  // const theme = ({ authenticated }) => (
  //     authenticated
  //     ? frontendtheme
  //     : backendtheme
  // )

  return (

        <MuiThemeProvider theme={frontendtheme}>
           <Layout />
        </MuiThemeProvider>
  )
}
