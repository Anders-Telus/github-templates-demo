import React from 'react'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'
import Text from '@tds/core-text'
import { safeRest } from '@tds/util-helpers'
import {
  FakeRadio, StyledLabel, HiddenInput, InnerChecked
} from './styles'

const Radio = React.forwardRef(({
  id, groupId, value, label, ...rest
}, ref) => (
  <Box between={2}>
    <HiddenInput
      type='radio'
      id={id}
      name={groupId}
      value={value}
      data-testid='hidden-input'
      ref={ref}
      {...safeRest(rest)}
    />
    <StyledLabel
      htmlFor={id} data-testid='checkbox-label'
    >
      <Box between={1} inline>
        <FakeRadio data-testid='fake-input'>
          <InnerChecked />
        </FakeRadio>
        <Text>{label}</Text>
      </Box>
    </StyledLabel>
  </Box>
))

Radio.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  groupId: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
}

Radio.displayName = 'Radio'

export default Radio
