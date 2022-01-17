import React from 'react'
// import Text from '@tds/core-text'
import PropTypes from 'prop-types'

import Skeleton from '../shared/Skeleton'
import Tooltip from '../Tooltip'
import { GraySkeleton, CasaRegularText, CasaH3 } from '../Styled'

const BillCycle = ({
  lineOfBusiness,
  locale,
  isRefresh,
  billCycle
}) => {
  const marginBillCycle = '-45px'

  return (
    <div style={{ display: 'block', marginLeft: marginBillCycle }}>
      <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>
        <Tooltip maxWidth={150} text={`${lineOfBusiness === 'ffh' ? locale.app.ban.cycleStartDate : locale.app.ban.cycleCloseDate}`}>
          <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
            {locale.app.ban.billCycle}
          </CasaRegularText>
        </Tooltip>
      </div>
      {(() => {
        if (isRefresh) {
          return <Skeleton type='text' lines={1} characters={3} />
        }

        if (billCycle === null || billCycle === undefined || billCycle === '') {
          return <GraySkeleton characters={3} margin='2' height={18} />
        }

        return (
          <div>
            <CasaH3 id={`banDetail_value_${billCycle}`}>
              {billCycle}
            </CasaH3>
          </div>
        )
      })()}
    </div>
  )
}

BillCycle.defaultProps = {
  isRefresh: false,
  billCycle: ''
}

BillCycle.propTypes = {
  locale: PropTypes.object.isRequired,
  lineOfBusiness: PropTypes.string.isRequired,
  isRefresh: PropTypes.bool,
  billCycle: PropTypes.string
}

export default BillCycle
