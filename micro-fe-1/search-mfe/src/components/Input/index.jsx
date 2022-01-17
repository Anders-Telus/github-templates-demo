import React from 'react'
import PropTypes from 'prop-types'
import InputFeedback from '@tds/core-input-feedback'
import Alert from '../../../static/Alert'
import Close from '../../../static/Close'
import {
  InputContainer, StyledInput, StyledLabel, StyledErrorMsg, IconWrapper
} from './styles'
import { ThemeProvider, Button, ChevronLink, SideNav, Radio, TextInput} from '@telus-uds/components-base';


const Input = ({
  value,
  type,
  id,
  maxLength,
  label,
  error,
  isFieldFocused,
  onChange,
  onFocus,
  onBlur,
  actionHandler,
  errField,
  disabled,
  style,
  height,
  width,
  fromProfile,
  top,
  fontSize,
  paddingRight,
  onClickX
}) => {
  const condition = fromProfile || value
  const getIcon = () => {
    let template = null
    if (error && errField === id) {
      template = <Alert />
    } else if (isFieldFocused) {
      template = <Close />
    }
    return template
  }
  return (
    <InputContainer>
      <StyledLabel>{label}</StyledLabel>
      {!!error && (errField === id) &&
        (errField !== 'firstName' && errField !== 'lastName') && (
          <InputFeedback feedback='error'>
            <StyledErrorMsg id='errorMessage'>{error}</StyledErrorMsg>
          </InputFeedback>
      )}
  
      <TextInput
        type={type}
        id={id}
        maxLength={maxLength}
        onFocus={onFocus}
        onBlur={() => setTimeout(() => onBlur, 150)}
        isError={error && errField === id}
        autoComplete='off'
        value={value}
        onChange={(e) =>onChange(e)}
        disabled={disabled}
        style={style}
        height={height}
        width={width}
        fontSize={fontSize}
        paddingRight={paddingRight}
        style={{ borderColor: 'grey', padding: '6px', borderRadius: '2px', border: '1px solid grey'}}
      />
      {((error && errField === id) || isFieldFocused) && !disabled && `${condition}` && (
        <IconWrapper
          isError={error}
          isFieldErr={error && errField === id}
          onClick={() => onClickX()}
          top={top}
        >
          {getIcon()}
        </IconWrapper>
      )}
    </InputContainer>
  )
}

Input.defaultProps = {
  value: '',
  error: '',
  maxLength: '250',
  isFieldFocused: false,
  errField: '',
  style: {},
  onFocus: () => {},
  onBlur: () => {},
  actionHandler: () => {},
  height: '41px',
  width: '100%',
  fromProfile: false,
  top: '',
  fontSize: '1rem',
  paddingRight: '42px'
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  errField: PropTypes.string,
  type: PropTypes.string.isRequired,
  actionHandler: PropTypes.func,
  label: PropTypes.node.isRequired,
  isFieldFocused: PropTypes.bool,
  value: PropTypes.string,
  maxLength: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  style: PropTypes.object,
  height: PropTypes.string,
  width: PropTypes.string,
  fromProfile: PropTypes.bool,
  top: PropTypes.string,
  fontSize: PropTypes.string,
  paddingRight: PropTypes.string
}

export default Input
