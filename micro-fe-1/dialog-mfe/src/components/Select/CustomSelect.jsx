import React from 'react'
import PropTypes from 'prop-types'
import Select from '@tds/core-select'
import {
  SelectCustomWrapper
} from './styles'

const SelectInput = ({
  id, label, placeholder, options, value, onChange, borderLess, disabled, border, backgroundColor,
  caretColor
}) => {
  return (
    <SelectCustomWrapper
      selectedOption={value} borderProps={borderLess}
      border={border} backgroundColor={backgroundColor}
      caretColor={caretColor}
    >
      <Select
        id={id}
        label={label}
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </SelectCustomWrapper>
  )
}
SelectInput.defaultProps = {
  label: ' ',
  placeholder: 'Select',
  options: [],
  value: '',
  borderLess: false,
  disabled: false,
  border: false,
  backgroundColor: null,
  caretColor: '#2A2C2E'
}
SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  borderLess: PropTypes.bool,
  disabled: PropTypes.bool,
  border: PropTypes.bool,
  backgroundColor: PropTypes.string,
  caretColor: PropTypes.string
}
export default SelectInput
