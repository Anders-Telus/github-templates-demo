import React from 'react'
import Text from '@tds/core-text'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'
import { withRouter } from 'react-router-dom';
import { useBolster } from '@mobilelive-inc/bolsterjs'

import Skeleton from '../shared/Skeleton'
import { CasaRegularText, GraySkeleton } from '../Styled'
import { getFormatedDate } from './helpers'
import { getCasaAppLocale } from '../../utils/locale'

const ActivationDate = ({
  lineOfBusiness, billingAcctCreationDate, billingAcctStatusDate, transBillingAcctStatus,
  isRefresh
}) => {
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang)
  const activationDate = lineOfBusiness === 'mobility' ? billingAcctCreationDate : billingAcctStatusDate

  return (
    <>
      <Box vertical={1}>
        <div style={{ marginRight: '10px' }}>
          <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
            {locale.app.ban.activation}
          </CasaRegularText>
        </div>
      </Box>
      <Box vertical={1}>
        {(() => {
          if (isRefresh) {
            return <Skeleton type='text' lines={1} characters={8} />
          }
          return !activationDate ? (
            <GraySkeleton characters={8} height={18} />
          ) : (
            <div>
              <Text
                size='small'
                id={`banDetail_label_${activationDate}_${transBillingAcctStatus}`}
              >
                {getFormatedDate(activationDate)}
              </Text>
            </div>
          )
        })()}
      </Box>
    </>
  )
}

ActivationDate.defaultProps = {
  billingAcctCreationDate: '',
  billingAcctStatusDate: '',
  isRefresh: false
}

ActivationDate.propTypes = {
  billingAcctCreationDate: PropTypes.string,
  lineOfBusiness: PropTypes.string.isRequired,
  isRefresh: PropTypes.bool,
  billingAcctStatusDate: PropTypes.string,
  transBillingAcctStatus: PropTypes.string.isRequired
}

export default ActivationDate
