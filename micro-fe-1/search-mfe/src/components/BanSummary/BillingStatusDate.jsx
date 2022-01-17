import React from 'react'
import Text from '@tds/core-text'
import PropTypes from 'prop-types'

import Skeleton from '../shared/Skeleton'
import { GraySkeleton } from '../Styled'
import { getFormatedDate } from './helpers'

const BillingStatusDate = ({
  lineOfBusiness, billingAcctCreationDate, billingAcctStatusDate,
  isRefresh
}) => {
  const activationDate = lineOfBusiness === 'mobility'
    ? billingAcctCreationDate : billingAcctStatusDate
  if (isRefresh) {
    return <Skeleton type='text' lines={1} characters={8} />
  }

  return (activationDate === undefined || activationDate === null) ? (
    <GraySkeleton characters={8} height={18} />
  ) : (
    <div>
      <Text
        size='small'
        id={`banDetail_label_${activationDate}`}
      >
        {getFormatedDate(activationDate)}
      </Text>
    </div>
  )
}

BillingStatusDate.defaultProps = {
  billingAcctCreationDate: '',
  billingAcctStatusDate: '',
  isRefresh: false
}

BillingStatusDate.propTypes = {
  billingAcctCreationDate: PropTypes.string,
  lineOfBusiness: PropTypes.string.isRequired,
  isRefresh: PropTypes.bool,
  billingAcctStatusDate: PropTypes.string
}

export default BillingStatusDate
