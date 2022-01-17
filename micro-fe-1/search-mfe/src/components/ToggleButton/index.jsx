import React from 'react'
import PropTypes from 'prop-types'

import { PosedToggle, PosedOval, PosedCheckmark } from './styles'

const ToggleButton = (props) => {
  const { isAuthenticated, clickHandler, uniqueKey } = props

  const handleClick = (e) => {
    e.stopPropagation()
    clickHandler()
  }

  return (
    <PosedToggle
      id={`toggle_${uniqueKey}`}
      pose={isAuthenticated ? 'on' : 'off'}
      onClick={handleClick}
    >
      <PosedCheckmark />
      <PosedOval />
    </PosedToggle>
  )
}

ToggleButton.defaultProps = {
  isAuthenticated: false
}

ToggleButton.propTypes = {
  isAuthenticated: PropTypes.bool,
  uniqueKey: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired
}

export default ToggleButton
