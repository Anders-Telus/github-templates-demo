import FlexGrid from '@tds/core-flex-grid'
import React from 'react'
import Box from '@tds/core-box'
import { useBolster } from '@mobilelive-inc/bolsterjs';
import { withRouter } from 'react-router-dom';

import Card from '../Card'
import ContentTabs from '../ContentTabs'
import { CasaRegularText, CasaH4 } from '../Styled'
import EmptyRecordsContainer from './EmptyRecordsContainer'
import {
  ListItemWrapper,
  HeaderContainer, ListContainer,
  Tab, WrapperContent
} from './styles'
import { getCasaAppLocale } from '../../utils/locale'

const CustomerStory = ({
}) => {
  const locale = getCasaAppLocale()
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
  const [allNotes, setAllNotes] = React.useState([]);
  const { dialogEvent } = useBolster();
  const props = useBolster();

  React.useEffect(() => {
    dialogEvent.on('onNoteSubmit', function(note) {
      setAllNotes([...allNotes, note]);
    });
  }, [])

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
        {locale.app.note.notes}
      </CasaH4>
    </HeaderContainer>
  )

  const tabs = [
    {
      id: `story_${tabUniqId}_1`,
      template: (
        <Tab>
          <CasaRegularText size='small'>{locale.app.note.mobilityTab}</CasaRegularText>
        </Tab>
      ),
      label: 'mobility',
      tabWidth: '50%'
    },
    {
      id: `story_${tabUniqId}_2`,
      template: (
        <Tab>
          <CasaRegularText size='small'>{locale.app.note.ffhTab}</CasaRegularText>
        </Tab>),
      label: 'home solutions',
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
            {
              (allNotes.length === 0 && (
                <ListItemWrapper height='116px'>
                <div align='center'>
                  {EmptyRecordsContainer(locale.app.note.notExist)}
                </div>
              </ListItemWrapper>
              )) || (allNotes.map((note, index) => (
                <div align="center" style={{padding: '0 10px'}} key={index}>{note}</div>
              )))
            }
          </ListContainer>
        </FlexGrid>
      </WrapperContent>
    </Card>
  )
}

export default CustomerStory
