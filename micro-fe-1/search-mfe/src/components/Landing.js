import React from 'react'
import { withBolster } from '@mobilelive-inc/bolsterjs'
import Profile from './CustomerProfile/index'
import Navigation from './Navigation'
import { PROFILE_DATA } from '../shared/constants'

export default withBolster(function Landing () {
  const navProps = {
    currentCustomer: {
      firstLevelTab: 'Overview'
    },
    setFirstLevelTab: () => {},
    tabUniqId: 'tabs-nav',
    minimizePopup: () => {}
  }
  return (
    <>
      <Navigation {...navProps} />
      <Profile {...PROFILE_DATA} />
    </>
  )
})
