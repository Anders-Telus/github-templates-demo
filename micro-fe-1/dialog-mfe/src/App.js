import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import Landing from './components/Landing'

const generateClassName = createGenerateClassName({
  productionPrefix: 'add-task-e'
})

export default ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Landing />
      </StylesProvider>
    </div>
  )
}
