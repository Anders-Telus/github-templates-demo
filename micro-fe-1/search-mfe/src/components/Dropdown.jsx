import React from 'react'
import Spinner from '@tds/core-spinner'
import HairlineDivider from '@tds/core-hairline-divider'
import { Search } from '@telus-uds/components-base';
import Input from './Input'

import {
  DropdownContainer, OptionsContainer, Option, SpinnerContainer
} from './Search/styles'

const Dropdown = ({
  value, options, label, type, id, error, isFetchingOptions,
  maxLength, isFieldFocused, onChange, onBlur, onFocus, onClick, onClickX
}) => {
  const optionsTemplate = (options.length >= 1 && isFieldFocused) ? (
    <OptionsContainer>
      <div></div>
      {options.map((option, index) => (
        <React.Fragment key={index}>
          <Option onClick={() => {
            onClick([].concat(option))
          }}
          >
            {option.address}
          </Option>
          {index !== (options.length - 1) && <HairlineDivider gradient />}
        </React.Fragment>
      ))}
    </OptionsContainer>
  ) : null

  return (
    <DropdownContainer>
      <Search
        id={id}
        value={value}
        label={label}
        maxLength={maxLength}
        error={error}
        onClear={onClickX}
        onChange={(e) => onChange({target: { value: e }})}
        onFocus={onFocus}
        onBlur={onBlur}
        errField='serviceAddress'
        disabled={false}
      />
      {isFetchingOptions ? (
        <SpinnerContainer>
          <Spinner spinning label='Looking up Address' />
        </SpinnerContainer>
      ) : optionsTemplate}
    </DropdownContainer>
  )
}

Dropdown.defaultProps = {
  options: [],
  value: '',
  error: '',
  type: 'text',
  maxLength: '250',
  isFetchingOptions: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {}
}

export default Dropdown
