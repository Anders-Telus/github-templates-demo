import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  TabsContainer,
  TabItem,
  TabDataContainer,
  TabText
} from './styles'
import { CounterBadge } from '../Styled'

const DataTab = ({
  tabsData,
  tabs,
  lineOfBusiness
}) => {
  const [activeTab, setActiveTab] = useState(0)
  let template = null
  const activeTabData = tabsData[activeTab]

  template = (
    <TabDataContainer>
      <TabsContainer lineOfBusiness={lineOfBusiness}>
        <ul>
          {
          tabs.map((tab, index) => {
            let tabTemplate = null
            tabTemplate = (
              <TabItem
                activeTab={activeTab === index}
                key={`tab_${tab.uniqId}`}
                id={`tab_${tab.uniqId}`}
                onClick={() => setActiveTab(index)}
                width={tab.width}
              >
                <TabText id={`tab_${tab.name}`} activeTab={activeTab === index}>
                  {tab.name}
                </TabText>
                {activeTab === index && <CounterBadge>{tab.count}</CounterBadge>}
              </TabItem>
            )
            return tabTemplate
          })
        }
        </ul>
      </TabsContainer>
      <div>
        {activeTabData}
      </div>
    </TabDataContainer>
  )
  return template
}

DataTab.defaultProps = {
  tabsData: [],
  tabs: [],
  lineOfBusiness: ''
}

DataTab.prototypes = {
  tabsData: PropTypes.array,
  tabs: PropTypes.array,
  lineOfBusiness: PropTypes.string
}

export default DataTab
