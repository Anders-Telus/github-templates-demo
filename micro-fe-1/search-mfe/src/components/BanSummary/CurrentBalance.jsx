import React from 'react'
import Box from '@tds/core-box'
import PropTypes from 'prop-types'
import ErrorNotification from '../ErrorNotification'
import Skeleton from '../shared/Skeleton'
import { CasaH3, CasaRegularText, GraySkeleton } from '../Styled'
import {
  CurrentBalanceText,
  CurrentCurrencySymbol, CurrentCurrencySymbolEn,
  CurrentCurrencyValue
} from './styles'

const CurrentBalance = ({
  isRefresh, isErrorLastBill, currentBalance, locale
}) => {
  const errorMessage = locale.app.ban.currentBalanceError

  if (isRefresh) {
    return (
      <div>
        <Box inline between={1} style={{ display: 'block' }}>
          <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
            {locale.app.ban.currentBalance}
          </CasaRegularText>
          <div>
            <Skeleton type='text' lines={1} characters={4} />
          </div>
        </Box>
      </div>
    )
  }

  if (isErrorLastBill) {
    return <ErrorNotification errorMsg={errorMessage} />
  }

  return (
    <div style={{ display: 'block' }}>
      <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
        {locale.app.ban.currentBalance}
      </CasaRegularText>
      {
        !currentBalance ? (
          <div>
            <Box inline between={1}>
              <GraySkeleton characters={4} height={18} />
            </Box>
          </div>
        ) : (
          <div>
            <CasaH3>
              <CurrentBalanceText>
                <CurrentCurrencySymbolEn>$</CurrentCurrencySymbolEn>
                <CurrentCurrencyValue>{currentBalance}</CurrentCurrencyValue>
              </CurrentBalanceText>
            </CasaH3>
          </div>
        )
      }
    </div>
  )
}

CurrentBalance.defaultProps = {
  isErrorLastBill: false,
  isRefresh: false,
  currentBalance: 0
}

CurrentBalance.propTypes = {
  isErrorLastBill: PropTypes.bool,
  locale: PropTypes.object.isRequired,
  isRefresh: PropTypes.bool,
  currentBalance: PropTypes.oneOfType(
    [
      PropTypes.number,
      PropTypes.string
    ]
  )
}

export default CurrentBalance
