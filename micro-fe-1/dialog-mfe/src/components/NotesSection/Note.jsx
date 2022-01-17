import React from 'react'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'
import Text from '@tds/core-text'
import momentTZ from 'moment-timezone'
import moment from 'moment'
import HairlineDivider from '@tds/core-hairline-divider'

import {
  Link, NotesHeader, TextBox, DateWrapper, UserText, BanText, BanContainer, NoteContainer
} from './styles'
import { formatPhoneNumber } from '../../../../utils/formatter'
import { timezoneAbbrs } from '../../../../constant'
import { getCasaAppLocale, prepareDetailPopupObj } from '../../../../utils/helper'
import HTMLParser from './Parser'
import NotesIcon from './NotesIcon'

const Note = ({
  note, savePopUpDetails,
  saveDetailsForDisplay, tabUniqId
}) => {
  const locale = getCasaAppLocale()
  const {
    lineOfBusiness, billingAccountNumber, productInstanceId, category,
    notesText, agentId, agentName, date, referenceEntityId
  } = note
  const [isNoteExpanded, setNoteExpansion] = React.useState(false)

  const header = <NotesIcon type={category} locale={locale} lineOfBusiness={lineOfBusiness} />

  const userInfo = `${agentName || agentId} ${locale.note.at} ${moment(date).tz(momentTZ.tz.guess()).format('LT zz')}`
  const notesDate = `${moment(date).tz(momentTZ.tz.guess()).format('ll')}`

  let ban
  if (lineOfBusiness && lineOfBusiness.toLowerCase() === 'mobility') {
    ban = `BAN ${billingAccountNumber}`
  } else {
    ban = (referenceEntityId) ? `BAN ${referenceEntityId}` : ' '
  }

  moment.fn.zoneName = () => {
    const abbr = moment(date).tz(momentTZ.tz.guess()).zoneAbbr()
    return moment.locale() === 'fr' ? timezoneAbbrs[abbr] : abbr
  }

  const expandCollapseHandler = (e) => {
    e.preventDefault()
    setNoteExpansion(!isNoteExpanded)
    return false
  }

  const openNote = () => {
    const { id } = note
    savePopUpDetails(prepareDetailPopupObj({ tabUniqId, id, type: 'selectedNote' }))
    saveDetailsForDisplay(note)
  }

  return (
    <>
      <NoteContainer>
        <TextBox padTop="12px" />
        <Box horizontal={2} between={2}>
          <NotesHeader id="notes_header" onClick={openNote}>{header}</NotesHeader>
        </Box>
        <Box horizontal={2} inline between={2}>
          <UserText id="notes_agentId">
            {userInfo}
          </UserText>
          <DateWrapper>
            {notesDate}
          </DateWrapper>
        </Box>
        {productInstanceId ? (
          <Box horizontal={2} between={2}>
            <NotesHeader>{`Subs# ${formatPhoneNumber(productInstanceId)}`}</NotesHeader>
          </Box>
        ) : ' '}
        {notesText && notesText.length > 120 ? (
          <Box horizontal={2} between={2}>
            <Text size="small" id="notes_text">
              <HTMLParser notesText={notesText} isNoteExpanded={isNoteExpanded} />
            </Text>
            <BanContainer>
              <BanText>{ban}</BanText>
              <Link id="note_id" href="" onClick={e => expandCollapseHandler(e)}>
                {isNoteExpanded ? locale.note.lessDetail : locale.note.moreDetail}
              </Link>
            </BanContainer>
            <HairlineDivider />
          </Box>
        )
          : (
            <Box horizontal={2} between={2}>
              <Text size="small" id="notes_text">
                <HTMLParser notesText={notesText} isNoteExpanded={isNoteExpanded} />
              </Text>
              <BanContainer>
                <BanText>{ban}</BanText>
              </BanContainer>
              <HairlineDivider />
            </Box>
          )
        }
      </NoteContainer>
    </>
  )
}

Note.defaultProps = { note: {} }

Note.propTypes = {
  note: PropTypes.object,
  savePopUpDetails: PropTypes.func.isRequired,
  saveDetailsForDisplay: PropTypes.func.isRequired,
  tabUniqId: PropTypes.string.isRequired
}

export default Note
