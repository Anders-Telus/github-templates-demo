import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { NotificationError } from '@tds/core-feedback-icon'

import Container from './styles'
import Tooltip from '../Tooltip'

const ErrorNotification = ({ errorMsg, tooltipVar }) => {
  const notification = (
    <Container>
      <NotificationError copy={moment.locale()} />
    </Container>
  )

  return errorMsg ? (
    <Tooltip text={errorMsg} variant={tooltipVar}>
      {notification}
    </Tooltip>
  ) : notification
}

ErrorNotification.defaultProps = {
  errorMsg: '',
  tooltipVar: undefined
}

ErrorNotification.propTypes = {
  errorMsg: PropTypes.string,
  tooltipVar: PropTypes.string
}

export default ErrorNotification
