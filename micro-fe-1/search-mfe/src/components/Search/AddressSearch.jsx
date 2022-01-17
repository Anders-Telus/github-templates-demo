import React, { useState } from 'react'
import Box from '@tds/core-box'
import { useBolster } from '@mobilelive-inc/bolsterjs'
import { withRouter } from 'react-router-dom';

import { SearchInputContainer, SearchGuidanceText } from './styles'
import { Button, ClearButton } from '../Styled'
import Dropdown from '../Dropdown'

import { initialData } from '../../helpers/dataset'
import { hasAccess } from '../../helpers/auth'
import { permissions } from '../../helpers/constants'
import { getCasaAppLocale } from '../../utils/locale';

const AddressSearch = ({ onSubmit}) => {
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang);
  const { requiresAuth, roles } = useBolster()
  const [address, setAddress] = useState('')
  const [addressOptions, setAddressOptions] = useState([])
  const [isFetchingOptions, setIsFetchingOptions] = useState(false)
  const [isFieldFocused, setIsFieldFocus] = useState(false)

  const handleOnChangeOptions = (input) => {
    const options = initialData
      .filter((row) => row.billingAddress.includes(input.toString()))
      .map((x) => ({ ...x, address: x.billingAddress })) || ['']
    setAddressOptions(options)
    setIsFetchingOptions(false)
  }

  const clearForm = () => {
    onSubmit(null, null)
    setAddressOptions([])
    setIsFieldFocus(false)
    setIsFetchingOptions(false)
    setAddress('')
  }

  const handleOnSubmit = (e) => {
    const input = e.target.elements.serviceAddress.value
    e.preventDefault()
    const result =
      initialData
        .filter((row) => row.billingAddress.includes(input.toString()))
        .map((x) => ({ ...x, address: x.billingAddress })) || [''] ||
      []
    onSubmit(null, result)
  }

  return (
    <form
      name='searchAddressForm'
      id='searchAddressForm'
      onSubmit={handleOnSubmit}
    >
      <Box>
        <SearchGuidanceText>
          {locale.app.addressSearchInfo}
        </SearchGuidanceText>
        <Dropdown
          label={locale.app.serviceAddressDetails}
          id='serviceAddress'
          value={address}
          options={addressOptions}
          isFetchingOptions={isFetchingOptions}
          isFieldFocused={isFieldFocused}
          onClick={(option) => {
            const billingAddress = option[0]?.billingAddress
            onSubmit(null, option)
            setAddress(billingAddress)
            setIsFieldFocus(false)
          }}
          onClickX={() => clearForm()}
          onBlur={() => {
            setIsFieldFocus(false)
          }}
          onChange={(e) => {
            setIsFetchingOptions(true)
            handleOnChangeOptions(e.target.value)
            setAddress(e.target.value)
            if (e.target.value !== "") {
              setIsFieldFocus(true)
            } else {
              setIsFieldFocus(false);
            }
          }}
          error=''
        />
        <SearchInputContainer>
          <ClearButton id='clrBtn' type='button' onClick={() => clearForm()} >
            {locale.app.clear}
          </ClearButton>
          <Button primary id='sbtBtn' type='submit'>
            {locale.app.search}
          </Button>
        </SearchInputContainer>
      </Box>
    </form>
  )
}

AddressSearch.propTypes = {}

export default AddressSearch
