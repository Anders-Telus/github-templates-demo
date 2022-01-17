import React from 'react'
import moment from 'moment'
import Box from '@tds/core-box'
import PropTypes from 'prop-types'
import ErrorNotification from '../ErrorNotification'
import Skeleton from '../shared/Skeleton'
import { CasaH3, GraySkeleton } from '../Styled'
import {
  LastBalanceSymbol,
  LastBalanceSymbolEn,
  LastBalanceValue,
  LastBalanceWrapper,
  Link
} from './styles'

const BillingAmount = ({
  isRefresh, billingAcctNum, isErrorLastBill,
  lineOfBusiness, errorMsg, currentCustomer, billingAmount, uuid
}) => {
  if (isRefresh) {
    return (

      <Box inline between={1}>
        <Skeleton type='text' lines={1} characters={3} />
      </Box>

    )
  }
  if (isErrorLastBill) {
    return <ErrorNotification errorMsg={errorMsg} />
  }

  const { billViewer } = 'billViewer'
  const productType = lineOfBusiness === 'mobility' ? 'WIRELESS' : 'WIRELINE'
  const billLink = `${billViewer}?language=en&account=${billingAcctNum}&productType=${productType}`
  const isValidBillingAmt = billingAmount !== null && billingAmount !== undefined
  return !isValidBillingAmt ? (
    <Box inline between={1}>
      <GraySkeleton characters={3} margin='1' height={18} />
    </Box>

  ) : (
    <div>
      <CasaH3>
        {moment.locale() === 'en' ? (
          <LastBalanceWrapper>
            <LastBalanceSymbolEn>$</LastBalanceSymbolEn>
            <LastBalanceValue>
              <Link
                rel='noreferrer'
                href={billLink}
                target='_blank'
                id='banDetail_viewBill'
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                {billingAmount !== '' && (billingAmount !== null && billingAmount !== undefined) ? billingAmount : '-'}
              </Link>
            </LastBalanceValue>
          </LastBalanceWrapper>
        ) : (
          <LastBalanceWrapper>
            <LastBalanceValue>
              <Link
                rel='noreferrer'
                href={billLink}
                target='_blank'
                id='banDetail_viewBill'
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                {billingAmount !== '' && (billingAmount !== null && billingAmount !== undefined) ? billingAmount : '-'}
              </Link>
            </LastBalanceValue>
            <LastBalanceSymbol>$</LastBalanceSymbol>
          </LastBalanceWrapper>
        )}
      </CasaH3>
    </div>
  )
}

BillingAmount.defaultProps = {
  currentCustomer: {},
  isErrorLastBill: false,
  errorMsg: PropTypes.string,
  isRefresh: false,
  billingAmount: 0,
  uuid: ''
}

BillingAmount.propTypes = {
  currentCustomer: PropTypes.object,
  isErrorLastBill: PropTypes.bool,
  errorMsg: PropTypes.string,
  lineOfBusiness: PropTypes.string.isRequired,
  billingAcctNum: PropTypes.string.isRequired,
  isRefresh: PropTypes.bool,
  billingAmount: PropTypes.number,
  uuid: PropTypes.string
}

export default BillingAmount
