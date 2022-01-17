import FlexGrid from '@tds/core-flex-grid'
import React from 'react'
import Box from '@tds/core-box'
import { withRouter } from 'react-router-dom';
import { useBolster } from '@mobilelive-inc/bolsterjs'

import Card from '../Card'
import ContentTabs from '../ContentTabs'
import { CasaRegularText, CasaH4, CounterBadge } from '../Styled'
import EmptyRecordsContainer from './EmptyRecordsContainer'
import {
  ArrowIcon, ListItemWrapper,
  HeaderContainer, ListContainer,
  Tab, WrapperContent
} from './styles'
import { getCasaAppLocale } from '../../utils/locale'

const CustomerStory = ({
}) => {
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang)
  const taskList = {
    fetchStatus: 'SUCCESS'
  }
  const [{
    selectedTab,
    tabUniqId,
    openListNumber
  }, setState] = React.useState({
    selectedTab: 'pending',
    tabUniqId: 1,
    openListNumber: 0
  })

  const handleTabClick = (tab) => {
    setState({
      selectedTab: tab.label,
      tabUniqId: 1,
      openListNumber: 0
    })
  }

  const customerStoryCardSectionHeader = (
    <HeaderContainer>
      <CasaH4>
        {locale.app.task.customerStory}
      </CasaH4>
    </HeaderContainer>
  )

  const tabs = [
    {
      id: `story_${tabUniqId}_1`,
      template: (
        <Tab>
          <CasaRegularText size='small'>{locale.app.task.pending}</CasaRegularText>
          {selectedTab === 'pending'
            ? <CounterBadge headerTab>{taskList.fetchStatus !== 'SUCCESS' ? '-' : 0}</CounterBadge> : null}
          {selectedTab === 'pending'
            ? <ArrowIcon id='pendingFilter' onClick={() => {}} /> : null}
        </Tab>
      ),
      label: 'pending',
      tabWidth: '50%'
    },
    {
      id: `story_${tabUniqId}_2`,
      template: (
        <Tab>
          <CasaRegularText size='small'>{locale.app.task.completed}</CasaRegularText>
          {selectedTab === 'completed'
            ? <CounterBadge headerTab>{taskList.fetchStatus !== 'SUCCESS' ? '-' : 0}</CounterBadge> : null}
          {selectedTab === 'completed'
            ? <ArrowIcon id='completedFilter' onClick={() => {}} /> : null}
        </Tab>),
      label: 'completed',
      tabWidth: '50%'
    }
  ]

  return (
    <Card
      header={customerStoryCardSectionHeader}
    >
      <WrapperContent>
        <FlexGrid gutter={false}>
          <Box horizontal={2} between={2}>
            <ContentTabs
              key={`${selectedTab}_storyTab_${tabUniqId}_${openListNumber}`}
              tabs={tabs}
              id={`customerStoryTab_${selectedTab}`}
              activeTab={tabs.find(item => selectedTab === item.label)}
              handleTabClick={handleTabClick}
              disabled={taskList.fetchStatus === 'PENDING'}
              regular
            />
          </Box>
          <ListContainer list={0}>
            <ListItemWrapper height='116px'>
              {EmptyRecordsContainer(selectedTab === 'pending' ? locale.app.task.noPendingRecords : locale.app.task.noCompletedRecords)}
            </ListItemWrapper>
          </ListContainer>
        </FlexGrid>
      </WrapperContent>
    </Card>
  )
}

export default CustomerStory
