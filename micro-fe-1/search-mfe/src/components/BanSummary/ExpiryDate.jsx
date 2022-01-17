import React from 'react'
import PropTypes from 'prop-types'

import Skeleton from '../shared/Skeleton'
import { CasaRegularText, GraySkeleton } from '../Styled'
import { getFormatedDate } from './helpers'

const DueDate = ({
  isRefresh,
  locale,
  expiryDate
}) => {
  if (isRefresh) {
    return (
      <div style={{ display: 'flex', marginTop: '1px' }}>
        <CasaRegularText style={{ fontSize: '12px', color: '#797979', fontWeight: '700' }}>
          {locale.ban.expiry}
        </CasaRegularText>
        &nbsp;
        <Skeleton type='text' lines={1} characters={3} />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex' }}>
      {
        !expiryDate ? (
          <>
            <CasaRegularText style={{ fontSize: '12px', color: '#797979', fontWeight: '700' }}>
              {locale.ban.expiry}
            </CasaRegularText>
            <GraySkeleton characters={3} height={14} />
          </>
        ) : (
          <div>
            <CasaRegularText style={{ fontSize: '12px', color: '#797979', fontWeight: '700' }}>
              {locale.ban.expiry}
            </CasaRegularText>
            {' '}
            <CasaRegularText
              style={{ fontSize: '12px', fontWeight: '700' }}
              size='small'
              id={`banDetail_label_${expiryDate}`}
            >
              {getFormatedDate(expiryDate)}
            </CasaRegularText>
          </div>
        )
      }
    </div>
  )
}

DueDate.defaultProps = {
  isRefresh: false,
  expiryDate: ''
}

DueDate.propTypes = {
  isRefresh: PropTypes.bool,
  expiryDate: PropTypes.string,
  locale: PropTypes.object.isRequired
}

export default DueDate
