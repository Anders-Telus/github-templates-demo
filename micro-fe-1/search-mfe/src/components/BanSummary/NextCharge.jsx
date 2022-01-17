import React from 'react'
import PropTypes from 'prop-types'
import Text from '@tds/core-text'
import Box from '@tds/core-box'
import { GraySkeleton, CasaRegularText, CasaH3 } from '../Styled'
import Skeleton from '../shared/Skeleton'
import { getFormatedDate } from './helpers'

const NextCharge = ({
  isRefresh, nextCharge, nextChargeDate, locale
}) => {
  if (isRefresh) {
    return (
      <div inline between={1} style={{ display: 'block' }}>
        <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
          {locale.ban.nextCharge}
        </CasaRegularText>
        <br />
        <Skeleton type='text' lines={1} characters={4} />
      </div>
    )
  }

  const dateTemplate = nextChargeDate
    ? `${nextCharge} (${getFormatedDate(nextChargeDate)})`
    : nextCharge

  return (
    <>
      <Box>
        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>
          <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
            {locale.ban.nextCharge}
          </CasaRegularText>
        </div>
      </Box>
      <Box>
        <Text
          size='small'
          id={`banDetail_label_${nextCharge}_${nextChargeDate}`}
        >
          {
        !nextChargeDate ? (
          <GraySkeleton characters={4} height={18} />
        ) : (
          <CasaH3>
            {dateTemplate}
          </CasaH3>
        )
      }
        </Text>
      </Box>
    </>
  )
}

NextCharge.defaultProps = {
  isRefresh: false,
  nextCharge: 0,
  nextChargeDate: ''
}

NextCharge.propTypes = {
  isRefresh: PropTypes.bool,
  nextCharge: PropTypes.number,
  nextChargeDate: PropTypes.string,
  locale: PropTypes.object.isRequired
}

export default NextCharge
