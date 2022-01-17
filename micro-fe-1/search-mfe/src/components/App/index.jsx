import React from 'react';
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'
import { Switch, Route, Router } from 'react-router-dom'
import { useBolster } from "@mobilelive-inc/bolsterjs";

import { ThemeProvider, Button, ChevronLink, SideNav } from '@telus-uds/components-base';
// import { DimensionProvider, ThemeProvider } from '@telus-uds/components-core';
// import { Heading, Button } from '@telus-uds/components-core';

import alliumTheme from '@telus-uds/theme-allium';

// import '@telus-uds/palette-allium/build/web/fonts/fonts-cdn.css'
import App from './App';
import Landing from '../Landing'

const generateClassName = createGenerateClassName({
  productionPrefix: 'search-ex'
})

export default ({ history }) => {
  const { showProfile } = useBolster()
  
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider defaultTheme={alliumTheme}>
     
      {showProfile ?  <Landing /> : <App /> }
        </ThemeProvider>
        </StylesProvider>
     
      {/* <StylesProvider generateClassName={generateClassName}>
      <Button onPress={() => {}}>Test</Button>
        {showProfile ?  <Landing /> : <App /> }

      </StylesProvider> */}
    </div>
  )
}