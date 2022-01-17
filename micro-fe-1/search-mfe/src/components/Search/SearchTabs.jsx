import React from 'react'
import { withRouter } from 'react-router-dom';
import { useBolster } from '@mobilelive-inc/bolsterjs'
import { getCasaAppLocale } from '../../utils/locale';
import { TabsContainer, TabItem, LabelWrapper } from './styles'

const SearchTabs = ({ activeTab, handleTabSwitch}) => {
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang);
  const tabs = [
    { name: locale.app.customer, uniqId: 'customer_search' },
    { name: locale.app.address, uniqId: 'address_search' }
  ]

  return (
    <TabsContainer>
      <ul>
        {
          tabs.map((tab, index) => {
            const tabTemplate = (
              <TabItem
                activeTab={activeTab === index}
                key={`tab_${tab.uniqId}`}
                id={`tab_${tab.uniqId}`}
                onClick={() => handleTabSwitch(index, tab.name)}
              >
                <LabelWrapper activeTab={activeTab === index}>
                  {tab.name.toLowerCase()}
                </LabelWrapper>
              </TabItem>
            )
            return tabTemplate
          })
}
      </ul>
    </TabsContainer>
  )
}

export default SearchTabs
