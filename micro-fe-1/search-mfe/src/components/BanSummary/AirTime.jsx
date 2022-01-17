import React from 'react'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'

import Skeleton from '../shared/Skeleton'
import { GraySkeleton, CasaRegularText, CasaH3 } from '../Styled'

const AirTime = ({ isRefresh, airtimeRate, locale }) => {
  return (
    <>
      <Box>
        <div style={{ marginRight: '10px' }}>
          <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
            {locale.ban.airtimeRate}
          </CasaRegularText>
        </div>
      </Box>
      <Box>
        {(() => {
          if (isRefresh) {
            return <Skeleton type='text' lines={1} characters={5} />
          }
          return (airtimeRate === null || airtimeRate === undefined || airtimeRate === undefined || airtimeRate === '-') ? (
            <GraySkeleton characters={3} height={18} />
          ) : (
            <CasaH3 size='small' id={`banDetail_label_${airtimeRate}`}>
              {airtimeRate}
            </CasaH3>
          )
        })()}
      </Box>
    </>
  )
}

AirTime.defaultProps = {
  isRefresh: false,
  airtimeRate: ''
}

AirTime.propTypes = {
  isRefresh: PropTypes.bool,
  airtimeRate: PropTypes.string,
  locale: PropTypes.object.isRequired
}

export default AirTime
