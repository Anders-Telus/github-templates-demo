import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import Box from '@tds/core-box'
import { NotificationWarning } from '@tds/core-feedback-icon'

import { NoRecordContainer, CasaRegularText, CasaH4 } from '../../../../components/Styled'
import ContentTabs from '../../../../components/ContentTabs'
import {
  HeaderContainer, TextBox, NotificationText,
  NotificationIcon, WrapperContent, NotesWrapper
} from './styles'
import Note from './Note'
import { getCasaAppLocale } from '../../../../utils/helper'
import skeletons from './skeletons'
import Card from '../../../../components/Card'
import { REQUESTED_VIEW } from '../../../../constant'
import ViewMore from '../ViewMore'
import { getCurrentTabCustomer } from '../../../../services/tabs/selectors'
import { getNotesMeta, getCurrentTabNotes } from '../../../../services/notes/selectors'
import {
  fetchedConnectedAccts,
  getBansByLOB,
  getFfhBansCustomerIds
} from '../../../../services/ban/selectors'
import { fetchNotes, addNoteDetailModal, deleteTabNotes } from '../../../../services/notes/actions'
import { updateTabView } from '../../../../services/tabs'
import { addDetail } from '../../../../services/detailPopups/actions'
import { updateTabFilter } from '../../../../services/appFilters/action'
import { getFiltersLOB } from '../../../../services/appFilters/selector'
import createNotesFilter from './helper'
import { useState } from 'react'
import { useBolster } from '@mobilelive-inc/bolsterjs'

const NotesSection = () => {
  // Retrieve data from store
  const currentCustomer = useSelector(getCurrentTabCustomer)
  const { tabUniqId, billingAcctNum: parentBan, lineOfBusiness: parentLOB } = currentCustomer
  const notesMetaData = useSelector(state => getNotesMeta(state)(tabUniqId))
  const { isFetching, isError, fetchingNotesEndAt } = notesMetaData

  const fetchedConnectedAcctsStatus = useSelector(
    state => fetchedConnectedAccts(state)(parentBan)
  )
  const mobBanNums = useSelector(state => getBansByLOB(state)(tabUniqId, 'mobility'))
  const customerIds = useSelector(state => getFfhBansCustomerIds(state)(tabUniqId))
  const currentNotes = useSelector(state => getCurrentTabNotes(state)(tabUniqId))
  const filtersLOB = useSelector(state => getFiltersLOB(state)(tabUniqId))

  const [allNotes, setAllNotes] = useState([]);
  
  // define dispatchers
  const dispatch = useDispatch()
  const fetchNotesDispatcher = filterObj => dispatch(
    fetchNotes(filterObj)
  )
  const updateTabViewDispatcher = (requestedView, triggerAnimation) => {
    batch(() => {
      dispatch(updateTabView(tabUniqId, requestedView, triggerAnimation))
      dispatch(deleteTabNotes(tabUniqId))
    })
  }
  const displayNoteDetails = data => dispatch(addNoteDetailModal(tabUniqId, data))
  const addNotePopupDispatcher = noteDetails => dispatch(addDetail(noteDetails))
  const updateFilter = data => dispatch(updateTabFilter(tabUniqId, data))

  const locale = getCasaAppLocale()
  const data = { lineOfBusiness: filtersLOB }
  // define current lineOfBusiness
  const currentLOB = filtersLOB || parentLOB

  // set parent bans line of business as lob in filter reducer by default
  useEffect(() => {
    if (!filtersLOB) {
      data.lineOfBusiness = parentLOB
      data.notes = createNotesFilter(parentLOB)
    } else {
      data.notes = createNotesFilter(filtersLOB)
    }
    updateFilter(data)
  }, [])

  const fetchNotesBasedOnLOB = (LOB) => {
  // customer360 no filter is applied
    const reqPayload = {
      billingAcctNums: LOB === 'mobility' ? mobBanNums : [],
      customerIds: LOB !== 'mobility' ? customerIds : [],
      count: 6,
      pageNumber: 1,
      includeSysNotes: false
    }
    fetchNotesDispatcher({ filter: reqPayload })
  }

  // fetch notes for all bans and customer ids
  useEffect(() => {
    /**
     * only fetch notes
     * fetchedConnectedAcctsStatus - when connected accounts are fetched
     * fetchingNotesEndAt - when previously no call for fetch notes
     */
    const isFetchNotes = fetchedConnectedAcctsStatus && !isFetching
    && !isError && !fetchingNotesEndAt
    if (isFetchNotes) {
      fetchNotesBasedOnLOB(currentLOB)
    }
  }, [fetchedConnectedAcctsStatus])


  const tabs = [
    {
      id: `${currentCustomer.customerId}_1`,
      template: <CasaRegularText>{locale.note.mobilityTab}</CasaRegularText>,
      label: 'mobility'
    },
    {
      id: `${currentCustomer.customerId}_2`,
      template: <CasaRegularText>{locale.note.ffhTab}</CasaRegularText>,
      label: 'ffh'
    }
  ]

  const selectedTab = filtersLOB || parentLOB

  let noteSection = null
  let listHeight = '300px'
  const ViewMoreHandler = () => {
    updateTabViewDispatcher(REQUESTED_VIEW.CUSTOMER_NOTES, true)
  }
  if (isFetching || !fetchedConnectedAcctsStatus) {
    noteSection = skeletons.notes
  } else if (isError) {
    noteSection = (
      <>
        <TextBox padTop="10px" />
        <Box horizontal={2} between={2} style={{ backgroundColor: '#FFF9EE' }}>
          <NotificationIcon>
            <NotificationWarning copy="en" />
          </NotificationIcon>
          <NotificationText>{locale.note.fetchingError}</NotificationText>
        </Box>
      </>
    )
  } else if (allNotes.length === 0) {
    listHeight = '200px'
    noteSection = (
      <NoRecordContainer pt="20" id="no-record">
        {locale.note.notExist} pepepepe
      </NoRecordContainer>
    )
  } else {
    noteSection = allNotes.map((note, index) => (
      <div align="center" style={{padding: '0 10px'}} key={index}>{note}</div>
    ))
    // listHeight = '100%'
    // noteSection = currentNotes.map((note, index) => {
    //   const key = `note_${note.id}_${currentNotes.length}_${index}`
    //   return (
    //     <Note
    //       key={key}
    //       note={note}
    //       tabUniqId={currentCustomer.tabUniqId}
    //       saveDetailsForDisplay={displayNoteDetails}
    //       savePopUpDetails={addNotePopupDispatcher}
    //     />
    //   )
    // })
  }

  const updateLOB = (lineOfBusiness) => {
    const filterObj = { lineOfBusiness }
    filterObj.notes = createNotesFilter(lineOfBusiness)
    batch(() => {
      fetchNotesBasedOnLOB(lineOfBusiness)
      updateFilter(filterObj)
    })
  }

  return (
    <Card
      uniqId="notesSection"
      headerCSS={{
        background: '#F7F7F8',
        padding: '10px 10px',
        marginTop: '0px'
      }}
      header={(
        <HeaderContainer>
          <CasaH4 id="notes_heading">{locale.note.notes}</CasaH4>
          <ViewMore
            clickFn={ViewMoreHandler}
            fetchStatus="SUCCESS"
          />
        </HeaderContainer>
        )}
    >
      <WrapperContent>
        <>
          <Box horizontal={2} between={2}>
            <ContentTabs
              key={`${selectedTab}_notesTab_${currentCustomer.customerId}`}
              tabs={tabs}
              activeTab={selectedTab === 'mobility' ? tabs[0] : tabs[1]}
              handleTabClick={tab => updateLOB(tab.label)}
              regular={true}
            />
          </Box>
          <NotesWrapper height={listHeight}>
            {noteSection}
          </NotesWrapper>
        </>
      </WrapperContent>
    </Card>
  )
}

export default NotesSection
