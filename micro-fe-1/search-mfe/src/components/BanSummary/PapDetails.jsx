import React from 'react'
import PropTypes from 'prop-types'
import { Bank, CreditCard } from '@tds/core-decorative-icon'
import { CasaRegularText, GraySkeleton, CasaH3 } from '../Styled'

import Skeleton from '../shared/Skeleton'

import { BankIcon } from './styles'
import Tooltip from '../Tooltip'
import { getCreditCard } from './helpers'

const PapDetails = ({
  isRefresh,
  pap,
  locale,
  creditCardInfo
}) => (
  <div style={{ display: 'block' }}>
    <div>
      <Tooltip maxWidth={100} text={`${locale.app.ban.preAuthorizedPay}`}>
        {pap === '' || pap === 'No' ? (
          <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
            {locale.app.ban.papLabel}
          </CasaRegularText>
        ) : (

          <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
            <BankIcon>
              {pap && pap.toLowerCase() === 'bank' ? <Bank size='16' /> : <CreditCard size='16' />}
            </BankIcon>
            {' '}
            {locale.app.ban.papLabel}
          </CasaRegularText>
        )}
      </Tooltip>

    </div>
    {(() => {
      if (isRefresh) {
        return <Skeleton type='text' lines={1} characters={8} />
      }
      if (pap && pap.toLowerCase() === 'bank') {
        return (
          <div>
            {' '}
            <CasaH3>{locale.app.ban.bankDraft}</CasaH3>
            {' '}
          </div>
        )
      }
      if (pap && pap.toLowerCase() === 'no') {
        return (
          <div>
            {' '}
            <CasaH3>{locale.app.no}</CasaH3>
            {' '}
          </div>
        )
      }
      return (
        !pap ? <GraySkeleton characters={3} height={18} /> : (
          <div>
            {' '}
            <CasaH3>
              {creditCardInfo ? getCreditCard(creditCardInfo.cardType, locale) : null}
              {'*'}
              {creditCardInfo ? creditCardInfo.lastFourDigit : null}
            </CasaH3>
          </div>
        )
      )
    })()}
  </div>
)

PapDetails.defaultProps = {
  isRefresh: false,
  pap: '',
  creditCardInfo: {}
}

PapDetails.propTypes = {
  isRefresh: PropTypes.bool,
  pap: PropTypes.string,
  locale: PropTypes.object.isRequired,
  creditCardInfo: PropTypes.object
}

export default PapDetails
