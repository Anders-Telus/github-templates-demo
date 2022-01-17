import React from 'react'
import PropTypes from 'prop-types'
import { LocationRegular } from '@tds/core-decorative-icon'

import Skeleton from '../shared/Skeleton'
import { BillingAddressWrapper } from './styles'
import ClickToCopy from '../ClickToCopy'
import { GraySkeleton, CasaRegularText, CasaBox } from '../Styled'

const BillingAddress = ({
  isRefresh,
  billingAddress,
  locale,
  lineOfBusiness
}) => {
  if (isRefresh) {
    return (
      <div style={{ display: 'flex' }}>
        <LocationRegular size='14' />
        {' '}
        <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
          {locale.app.ban.billing}
        </CasaRegularText>
        &nbsp;
        <Skeleton type='text' lines={1} characters={6} />
      </div>
    )
  }

  let marginLeft = '-3px'
  if (lineOfBusiness === 'ffh') {
    marginLeft = billingAddress ? '-4px' : '-9px'
  }

  return (
    <CasaBox mt='-30px' ml={marginLeft}>
      {
          !billingAddress ? (
            <div style={{ display: 'flex' }}>
              <LocationRegular size='14' />
              {' '}
              <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
                {locale.app.ban.billing}
              </CasaRegularText>
              <GraySkeleton margin='2' characters={6} height={18} />
            </div>
          ) : (
            <ClickToCopy text={billingAddress} displayBlock>
              <BillingAddressWrapper>
                <LocationRegular size='14' />
                {' '}
                <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
                  {locale.app.ban.billing}
                </CasaRegularText>
                {' '}
                {billingAddress}
              </BillingAddressWrapper>
            </ClickToCopy>
          )
        }
    </CasaBox>
  )
}

BillingAddress.defaultProps = {
  isRefresh: false,
  billingAddress: '',
  lineOfBusiness: ''
}

BillingAddress.propTypes = {
  billingAddress: PropTypes.string,
  isRefresh: PropTypes.bool,
  locale: PropTypes.object.isRequired,
  lineOfBusiness: PropTypes.string
}

export default BillingAddress
