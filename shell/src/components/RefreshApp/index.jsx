import React from 'react'
import { Refresh } from '@tds/core-decorative-icon'
import { RefreshButtonWrapper, RefreshButton } from './styles'

export default () => {
  return (
    <RefreshButtonWrapper>
      <RefreshButton id='refreshApp' onClick={() => {}} disabled={false}>
        <Refresh />
      </RefreshButton>
    </RefreshButtonWrapper>
  )
}
