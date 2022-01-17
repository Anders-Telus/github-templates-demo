import React from 'react'
import PropTypes from 'prop-types'
import TDSBox from '@tds/core-box'
import Small from '@tds/core-small'
import { withRouter } from 'react-router-dom'
import { useBolster } from '@mobilelive-inc/bolsterjs'
import { RedCounterBadge } from '../Styled'
import Tooltip from '../Tooltip'
import navItems from './navItems'
import ContentTabs from '../ContentTabs'
import { getCasaAppLocale } from '../../utils/locale';

import {
  LabelContainer, IconWrapper
} from '../styles'

const Navigation = ({
  currentCustomer,
  setFirstLevelTab,
  tabUniqId,
  minimizePopup,
}) => {
  const tabs = []
  const { firstLevelTab } = currentCustomer
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang);
  const NavOptions = navItems(locale)
  Object.entries(NavOptions).forEach(([key, value]) => {
    let navWarning
    let navTooltipText = ''
    if (value.badge) {
      navWarning = value.badge()
      navTooltipText = ('')
    }
    tabs.push({
      id: key,
      template: (
        <TDSBox vertical={2}>
          <TDSBox>
            <Tooltip
              text={navWarning && navWarning.profileWarningCount ? navTooltipText : ''}
              maxWidth={300}
              variant='horizontal'
            >
              <IconWrapper>
                {value.icon}
                {
                  navWarning && navWarning.profileWarningCount ? (
                    <RedCounterBadge id='redbadge' top='-20px' left='17px' position='absolute'>
                      {navWarning.profileWarningCount}
                    </RedCounterBadge>
                  ) : null
                }
              </IconWrapper>
              <LabelContainer>
                <Small>{value.name}</Small>
              </LabelContainer>
            </Tooltip>
          </TDSBox>
        </TDSBox>
      ),
      label: key,
      tabWidth: value.tabWidth,
      margin: value.margin,
      isBorderBottom: value.isBorderBottom,
      tabPadding: value.tabPadding,
      disabled: value.disabled
    })
  })

  return (
    <>
      <ContentTabs
        tabs={tabs}
        backgroundColor='#F7F7F8'
        activeTab={{
          id: firstLevelTab
        }}
        handleTabClick={(tab) => {
          if (!tab.disabled) {
            setFirstLevelTab(tabUniqId, tab.id)
            minimizePopup(tabUniqId, tab.id)
          }
        }}
      />
    </>
  )
}

Navigation.propTypes = {
  currentCustomer: PropTypes.object.isRequired,
  setFirstLevelTab: PropTypes.func.isRequired,
  tabUniqId: PropTypes.string.isRequired,
  minimizePopup: PropTypes.func.isRequired
}

export default Navigation
