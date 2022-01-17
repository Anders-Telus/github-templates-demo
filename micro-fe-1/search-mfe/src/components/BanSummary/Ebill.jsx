import React from 'react'
// import Text from '@tds/core-text'
import PropTypes from 'prop-types'

import Skeleton from '../shared/Skeleton'
import { CasaRegularText, GraySkeleton, CasaH3 } from '../Styled'

const Ebill = ({
  isRefresh,
  billMedium,
  locale
}) => {
  return (
    <div style={{ display: 'block' }}>
      <div>
        <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
          {locale.app.ban.eBill}
        </CasaRegularText>
      </div>
      {(() => {
        if (isRefresh) {
          return <Skeleton type='text' lines={1} characters={3} />
        }
        return (
          !billMedium ? <GraySkeleton characters={3} height={18} /> : (
            <div>
              <CasaH3>
                {billMedium.toLowerCase() === 'ebill' ? `${locale.app.yes}` : `${locale.app.no}`}
              </CasaH3>
            </div>
          )
        )
      })()}
    </div>
  )
}

Ebill.defaultProps = {
  isRefresh: false,
  billMedium: ''
}

Ebill.propTypes = {
  isRefresh: PropTypes.bool,
  billMedium: PropTypes.string,
  locale: PropTypes.object.isRequired
}

export default Ebill
