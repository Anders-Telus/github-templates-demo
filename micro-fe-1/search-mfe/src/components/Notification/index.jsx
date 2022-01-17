import React from 'react'
import PropTypes from 'prop-types'
import NotificationSection from '@tds/core-notification'
import Text from '@tds/core-text'

import NotificationContainer from './styles'

const Notification = ({
  text, variant, key, copy,
  dismissible,
  textSize,
  onDismiss, notificationStyle
}) => {
  return (
    <NotificationContainer
      pt={1}
      notificationStyle={notificationStyle}
    >
      <NotificationSection
        variant={variant} key={key} copy={copy}
        dismissible={dismissible} onDismiss={onDismiss}
      >
        <Text size={textSize}>{text}</Text>
      </NotificationSection>
    </NotificationContainer>
  )
}

Notification.defaultProps = {
  text: '',
  textSize: 'small',
  variant: 'warning',
  key: 'warning',
  copy: 'en',
  dismissible: true,
  onDismiss: () => {},
  notificationStyle: {}
}

Notification.propTypes = {
  text: PropTypes.string,
  textSize: PropTypes.string,
  variant: PropTypes.string,
  key: PropTypes.string,
  copy: PropTypes.string,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  notificationStyle: PropTypes.object
}

export default Notification
