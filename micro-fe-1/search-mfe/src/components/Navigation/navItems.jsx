import React from 'react'
import {
  Home,
  Bill,
  PiggyBank,
  HeadMale
} from '@tds/core-decorative-icon'
import * as navItems from './helper'

export default (locale) => {
  const navItemsDef = {
    Profile: {
      icon: <HeadMale size={24} variant='default' />,
      featureName: 'PROFILE_NAVBAR'
    },
    Overview: {
      icon: <Home size={24} variant='default' />
    },
    Billing: {
      icon: <Bill size={24} variant='default' />
    },
    Collections: {
      icon: <PiggyBank size={24} variant='default' />
    }
  }
  const ProfileNavBar = navItems.getProfileNavTabs(navItemsDef.Profile, locale)
  const OverviewNavBar = navItems.getOverviewNavTabs(navItemsDef.Overview, locale)
  const BillingNavBar = navItems.getBillingNavTabs(navItemsDef.Billing, locale)
  const CollectionsNavBar = navItems.getCollectionsNavTabs(navItemsDef.Collections, locale)
  
  return {
    ...OverviewNavBar,
    ...BillingNavBar,
    ...CollectionsNavBar,
    ...ProfileNavBar
  }
}
