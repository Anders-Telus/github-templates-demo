import React from 'react'
import PropTypes from 'prop-types'

import Skeleton from '../shared/Skeleton'
import { CasaRegularText } from '../Styled'
import { getFormatedDate } from './helpers'

const DueDate = ({
  isRefresh,
  locale,
  dueDate
}) => {
  const dateHeadingStyle = {
    fontSize: '12px',
    color: '#797979',
    fontWeight: '700',
    marginRight: '10px'
  }
  if (isRefresh) {
    return (
      <div style={{ display: 'flex', marginTop: '1px' }}>
        <CasaRegularText style={{ ...dateHeadingStyle }}>
          {locale.app.ban.due}
        </CasaRegularText>
        &nbsp;
        <Skeleton type='text' lines={1} characters={3} />
      </div>
    )
  }
  return (
    <div style={{ display: 'flex' }}>
      <CasaRegularText style={{ ...dateHeadingStyle }}>
        {locale.app.ban.due}
      </CasaRegularText>
      <CasaRegularText
        style={{ fontSize: '12px', fontWeight: '700' }}
        size='small'
        id={`banDetail_label_${dueDate}`}
      >
        {getFormatedDate(dueDate)}
      </CasaRegularText>
    </div>
  )
}

DueDate.defaultProps = {
  isRefresh: false,
  dueDate: ''
}

DueDate.propTypes = {
  isRefresh: PropTypes.bool,
  dueDate: PropTypes.string,
  locale: PropTypes.object.isRequired
}

export default DueDate
