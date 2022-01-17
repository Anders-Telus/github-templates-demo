import React from 'react'
import Spinner from '@tds/core-spinner'
import PropTypes from 'prop-types'
import { SpinnerContainer, SpinnerWrapper } from './styles'

const SectionSpinner = (props) => {
  let spinnerOptional = 'Loading'
  const {
    offerStatus, qualificationStatus, addItemToCartStatus, createCartStatus
  } = props
  if (offerStatus === 'PENDING') {
    spinnerOptional = 'Loading Offers'
  } else if (qualificationStatus === 'PENDING') {
    spinnerOptional = 'Verifying Address'
  } else if (addItemToCartStatus === 'PENDING' || createCartStatus === 'PENDING') {
    spinnerOptional = 'Adding item to Cart'
  }

  return (
    <SpinnerContainer>
      <SpinnerWrapper>
        <Spinner data-test='spinner' spinning tip={spinnerOptional} />
      </SpinnerWrapper>
    </SpinnerContainer>
  )
}

SectionSpinner.propTypes = {
  offerStatus: PropTypes.string.isRequired,
  qualificationStatus: PropTypes.string.isRequired,
  addItemToCartStatus: PropTypes.string.isRequired,
  createCartStatus: PropTypes.string.isRequired
}

export default SectionSpinner
