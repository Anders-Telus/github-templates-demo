export const getProfileNavTabs = (nav, locale) => {
  const ProfileNavBar = {
    Profile: {
      name: locale.app.keywords.profile,
      icon: nav.icon,
      badge: nav.badge,
      featureName: nav.featureName,
      children: [{
        name: 'personal',
        warningCircle: true,
        isBorderBottom: false,
        tabPadding: '0',
        tabWidth: '90px',
        margin: '7px 0 0 800px'
      },
      {
        name: 'credit',
        isBorderBottom: false,
        tabPadding: '0',
        tabWidth: '90px',
        margin: '7px 0 0 10px'
      }],
      tabWidth: '160px',
      margin: '0 64.5px 0 64.5px',
      isBorderBottom: false,
      tabPadding: '0px',
      disabled: false
    }
  }
  return ProfileNavBar
}
export const getOverviewNavTabs = (nav, locale) => {
  const OverviewNavBar = {
    Overview: {
      name: locale.app.keywords.overview,
      icon: nav.icon,
      children: [],
      tabWidth: '7rem',
      margin: '0 64.5px 0 64.5px',
      isBorderBottom: false,
      tabPadding: '0px',
      disabled: false
    }
  }
  return OverviewNavBar
}
export const getBillingNavTabs = (nav, locale) => {
  const BillingNavBar = {
    Billing: {
      name: locale.app.keywords.billing,
      icon: nav.icon,
      children: [
        {
          name: 'summary',
          isBorderBottom: false,
          tabPadding: '0',
          tabWidth: '85px',
          margin: '7px 0 0 215px',
          disabled: false
        },
        {
          name: 'transactions',
          isBorderBottom: false,
          tabPadding: '0',
          tabWidth: '95px',
          margin: '7px 0 0 19px',
          disabled: false
        },
        {
          name: 'billAdjustments',
          isBorderBottom: false,
          tabPadding: '0',
          tabWidth: '92px',
          margin: '7px 0 0 33px',
          disabled: true
        }
      ],
      tabWidth: '8rem',
      margin: '0 64.5px 0 64.5px',
      isBorderBottom: false,
      tabPadding: '0px',
      disabled: false
    }
  }
  return BillingNavBar
}
export const getCollectionsNavTabs = (nav, locale) => {
  const CollectionsNavBar = {
    Collections: {
      name: locale.app.keywords.collections,
      icon: nav.icon,
      children: [],
      tabWidth: '8rem',
      margin: '0 64.5px 0 64.5px',
      isBorderBottom: false,
      tabPadding: '0px',
      disabled: true
    }
  }
  return CollectionsNavBar
}
export const getInactiveTabs = (TABS, isFeatureEnabled) => {
  const InactiveTabs = {}
  Object.keys(TABS).forEach((tab) => {
    if (!isFeatureEnabled(TABS[tab].featureName)) {
      InactiveTabs[tab] = TABS[tab]
    }
  })
  return InactiveTabs
}
