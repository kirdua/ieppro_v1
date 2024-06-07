// Styles
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/util/colors'
import 'vuetify/styles'

const myCustomTheme = {
  dark: false,
  colors: {
    background: '#D1D4C9',
    surface: '#fdfdff',
    black: '#393d3f',
    white: '#fdfdff',
    'white-1': '#DDDDDD',
    brown: '#c6c5b9',
    lightblue: '#62929e',
    blue: '#546a7b',
    'blue-1': '#125D98',
    'blue-2': '#3c8dad;',
    red: '#FF5959',
    primary: '#2E3A87',
    error: '#FF5252',
    info: '#baf2d8',
    success: '#baf2bb',
    warning: '#f2e2ba',
    bgDarkBlue: '#152A38'
  }
}

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme
    },
    options: {
      customProperties: true
    }
  }
})
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
