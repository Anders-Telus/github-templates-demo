import React from 'react'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'

import {
  Warranty, Receipt, PiggyBank, Heart, ChartsLine,
  Fingerprint, Layers, Donate, PrivateCloud, LockClosed
} from '@tds/core-decorative-icon'
import {
  IconContainer, NoteHeaderWrapper, NoteIconContainer, NoteHeaderText,
  UserText, NoteInfoWrapper, BanText, DateWrapper
} from './styles'

const NotesIcon = React.forwardRef((props, ref) => {
  const {
    type = '',
    locale,
    isViewAll,
    templateData,
    notesInfo,
    lineOfBusiness
  } = props
  let template = null
  const noteType = type.toUpperCase()
  if (noteType === 'ASSURE' || noteType === 'EEQP' || noteType === 'ENTK') {
    const text = noteType === 'ASSURE' ? locale.note.ffhNotesIcon.assure : type
    template = (
      <NoteIconContainer width={templateData === 'note-popup' ? '100%' : 'auto'}>
        <IconContainer>
          <Warranty size={20} />
        </IconContainer>
        <NoteHeaderWrapper isViewAll={isViewAll} width={templateData === 'note-popup' ? '100%' : 'auto'}>
          <NoteHeaderText ref={ref}>{`${text}`}</NoteHeaderText>
          {templateData === 'note-popup' && (
            <Box>
              <NoteInfoWrapper>
                <Box inline between={2}>
                  <UserText>
                    {notesInfo.userId}
                  </UserText>
                  <BanText>{notesInfo.ban}</BanText>
                </Box>
                <Box inline between={1}>
                  <UserText id="notes_userId">
                    {notesInfo.userInfo}
                  </UserText>
                  <DateWrapper>
                    {notesInfo.notesDate}
                  </DateWrapper>
                </Box>
              </NoteInfoWrapper>
            </Box>
          )}
        </NoteHeaderWrapper>
      </NoteIconContainer>
    )
  } else if (noteType === 'BILLING' || noteType === 'BILL' || noteType === 'PAYI') {
    const text = noteType === 'BILLING' ? locale.note.ffhNotesIcon.billing : type
    template = (
      <NoteIconContainer width={templateData === 'note-popup' ? '100%' : 'auto'}>
        <IconContainer>
          <Receipt size={20} />
        </IconContainer>
        <NoteHeaderWrapper isViewAll={isViewAll} width={templateData === 'note-popup' ? '100%' : 'auto'}>
          <NoteHeaderText ref={ref}>{`${text}`}</NoteHeaderText>
          {templateData === 'note-popup' && (
            <Box>
              <NoteInfoWrapper>
                <Box inline between={2}>
                  <UserText>
                    {notesInfo.userId}
                  </UserText>
                  <BanText>{notesInfo.ban}</BanText>
                </Box>
                <Box inline between={1}>
                  <UserText id="notes_userId">
                    {notesInfo.userInfo}
                  </UserText>
                  <DateWrapper>
                    {notesInfo.notesDate}
                  </DateWrapper>
                </Box>
              </NoteInfoWrapper>
            </Box>
          )}
        </NoteHeaderWrapper>
      </NoteIconContainer>
    )
  } else if (noteType === 'COLLECTIONS' || noteType === 'COLL' || noteType === 'CRED') {
    const text = noteType === 'COLLECTIONS' ? locale.note.ffhNotesIcon.collections : type
    template = (
      <NoteIconContainer width={templateData === 'note-popup' ? '100%' : 'auto'}>
        <IconContainer>
          <PiggyBank size={20} />
        </IconContainer>
        <NoteHeaderWrapper isViewAll={isViewAll} width={templateData === 'note-popup' ? '100%' : 'auto'}>
          <NoteHeaderText ref={ref}>{`${text}`}</NoteHeaderText>
          {templateData === 'note-popup' && (
            <Box>
              <NoteInfoWrapper>
                <Box inline between={2}>
                  <UserText>
                    {notesInfo.userId}
                  </UserText>
                  <BanText>{notesInfo.ban}</BanText>
                </Box>
                <Box inline between={1}>
                  <UserText id="notes_userId">
                    {notesInfo.userInfo}
                  </UserText>
                  <DateWrapper>
                    {notesInfo.notesDate}
                  </DateWrapper>
                </Box>
              </NoteInfoWrapper>
            </Box>
          )}
        </NoteHeaderWrapper>
      </NoteIconContainer>
    )
  } else if (noteType === 'L&R' || noteType === 'LNR') {
    const text = noteType === 'l&R' ? locale.note.ffhNotesIcon.lnr : type
    template = (
      <NoteIconContainer width={templateData === 'note-popup' ? '100%' : 'auto'}>
        <IconContainer>
          <Heart size={20} />
        </IconContainer>
        <NoteHeaderWrapper isViewAll={isViewAll} width={templateData === 'note-popup' ? '100%' : 'auto'}>
          <NoteHeaderText ref={ref}>{`${text}`}</NoteHeaderText>
          {templateData === 'note-popup' && (
            <Box>
              <NoteInfoWrapper>
                <Box inline between={2}>
                  <UserText>
                    {notesInfo.userId}
                  </UserText>
                  <BanText>{notesInfo.ban}</BanText>
                </Box>
                <Box inline between={1}>
                  <UserText id="notes_userId">
                    {notesInfo.userInfo}
                  </UserText>
                  <DateWrapper>
                    {notesInfo.notesDate}
                  </DateWrapper>
                </Box>
              </NoteInfoWrapper>
            </Box>
          )}
        </NoteHeaderWrapper>
      </NoteIconContainer>
    )
  } else if (noteType === 'SELL' || noteType === 'CLSA' || noteType === 'CLSI') {
    const text = noteType === 'SELL' ? locale.note.ffhNotesIcon.sell : type
    template = (
      <NoteIconContainer width={templateData === 'note-popup' ? '100%' : 'auto'}>
        <IconContainer>
          <ChartsLine size={20} />
        </IconContainer>
        <NoteHeaderWrapper isViewAll={isViewAll} width={templateData === 'note-popup' ? '100%' : 'auto'}>
          <NoteHeaderText ref={ref}>{`${text}`}</NoteHeaderText>
          {templateData === 'note-popup' && (
            <Box>
              <NoteInfoWrapper>
                <Box inline between={2}>
                  <UserText>
                    {notesInfo.userId}
                  </UserText>
                  <BanText>{notesInfo.ban}</BanText>
                </Box>
                <Box inline between={1}>
                  <UserText id="notes_userId">
                    {notesInfo.userInfo}
                  </UserText>
                  <DateWrapper>
                    {notesInfo.notesDate}
                  </DateWrapper>
                </Box>
              </NoteInfoWrapper>
            </Box>
          )}
        </NoteHeaderWrapper>
      </NoteIconContainer>
    )
  } else if (noteType === 'ORT') {
    template = (
      <NoteIconContainer width={templateData === 'note-popup' ? '100%' : 'auto'}>
        <IconContainer>
          <Layers size={20} />
        </IconContainer>
        <NoteHeaderWrapper isViewAll={isViewAll} width={templateData === 'note-popup' ? '100%' : 'auto'}>
          <NoteHeaderText ref={ref}>{`${locale.note.ffhNotesIcon.orderResolution}`}</NoteHeaderText>
          {templateData === 'note-popup' && (
            <Box>
              <NoteInfoWrapper>
                <Box inline between={2}>
                  <UserText>
                    {notesInfo.userId}
                  </UserText>
                  <BanText>{notesInfo.ban}</BanText>
                </Box>
                <Box inline between={1}>
                  <UserText id="notes_userId">
                    {notesInfo.userInfo}
                  </UserText>
                  <DateWrapper>
                    {notesInfo.notesDate}
                  </DateWrapper>
                </Box>
              </NoteInfoWrapper>
            </Box>
          )}
        </NoteHeaderWrapper>
      </NoteIconContainer>
    )
  } else if (noteType === 'PROACTIVE ASSURANCE') {
    template = (
      <NoteIconContainer width={templateData === 'note-popup' ? '100%' : 'auto'}>
        <IconContainer>
          <Donate size={20} />
        </IconContainer>
        <NoteHeaderWrapper isViewAll={isViewAll} width={templateData === 'note-popup' ? '100%' : 'auto'}>
          <NoteHeaderText ref={ref}>{`${locale.note.ffhNotesIcon.proactiveAssurance}`}</NoteHeaderText>
          {templateData === 'note-popup' && (
            <Box>
              <NoteInfoWrapper>
                <Box inline between={2}>
                  <UserText>
                    {notesInfo.userId}
                  </UserText>
                  <BanText>{notesInfo.ban}</BanText>
                </Box>
                <Box inline between={1}>
                  <UserText id="notes_userId">
                    {notesInfo.userInfo}
                  </UserText>
                  <DateWrapper>
                    {notesInfo.notesDate}
                  </DateWrapper>
                </Box>
              </NoteInfoWrapper>
            </Box>
          )}
        </NoteHeaderWrapper>
      </NoteIconContainer>
    )
  } else if (noteType === 'FRAUD' || noteType === 'FMM') {
    const text = noteType === 'FRAUD' ? locale.note.ffhNotesIcon.fraud : type
    template = (
      <NoteIconContainer width={templateData === 'note-popup' ? '100%' : 'auto'}>
        <IconContainer>
          <Fingerprint size={20} />
        </IconContainer>
        <NoteHeaderWrapper isViewAll={isViewAll} width={templateData === 'note-popup' ? '100%' : 'auto'}>
          <NoteHeaderText ref={ref}>{`${text}`}</NoteHeaderText>
          {templateData === 'note-popup' && (
            <Box>
              <NoteInfoWrapper>
                <Box inline between={2}>
                  <UserText>
                    {notesInfo.userId}
                  </UserText>
                  <BanText>{notesInfo.ban}</BanText>
                </Box>
                <Box inline between={1}>
                  <UserText id="notes_userId">
                    {notesInfo.userInfo}
                  </UserText>
                  <DateWrapper>
                    {notesInfo.notesDate}
                  </DateWrapper>
                </Box>
              </NoteInfoWrapper>
            </Box>
          )}
        </NoteHeaderWrapper>
      </NoteIconContainer>
    )
  } else if (noteType === 'INTERNET ABUSE') {
    template = (
      <NoteIconContainer width={templateData === 'note-popup' ? '100%' : 'auto'}>
        <IconContainer>
          <PrivateCloud size={20} />
        </IconContainer>
        <NoteHeaderWrapper isViewAll={isViewAll} width={templateData === 'note-popup' ? '100%' : 'auto'}>
          <NoteHeaderText ref={ref}>{`${locale.note.ffhNotesIcon.internetAbuse}`}</NoteHeaderText>
          {templateData === 'note-popup' && (
            <Box>
              <NoteInfoWrapper>
                <Box inline between={2}>
                  <UserText>
                    {notesInfo.userId}
                  </UserText>
                  <BanText>{notesInfo.ban}</BanText>
                </Box>
                <Box inline between={1}>
                  <UserText id="notes_userId">
                    {notesInfo.userInfo}
                  </UserText>
                  <DateWrapper>
                    {notesInfo.notesDate}
                  </DateWrapper>
                </Box>
              </NoteInfoWrapper>
            </Box>
          )}
        </NoteHeaderWrapper>
      </NoteIconContainer>
    )
  } else if (noteType === 'PRIV') {
    template = (
      <NoteIconContainer width={templateData === 'note-popup' ? '100%' : 'auto'}>
        <IconContainer>
          <LockClosed size={20} />
        </IconContainer>
        <NoteHeaderWrapper isViewAll={isViewAll} width={templateData === 'note-popup' ? '100%' : 'auto'}>
          <NoteHeaderText ref={ref}>{`${type}`}</NoteHeaderText>
          {templateData === 'note-popup' && (
            <Box>
              <NoteInfoWrapper>
                <Box inline between={2}>
                  <UserText>
                    {notesInfo.userId}
                  </UserText>
                  <BanText>{notesInfo.ban}</BanText>
                </Box>
                <Box inline between={1}>
                  <UserText id="notes_userId">
                    {notesInfo.userInfo}
                  </UserText>
                  <DateWrapper>
                    {notesInfo.notesDate}
                  </DateWrapper>
                </Box>
              </NoteInfoWrapper>
            </Box>
          )}
        </NoteHeaderWrapper>
      </NoteIconContainer>
    )
  } else {
    // const left = isViewAll ? '3%' : 'unset'
    template = (
      <NoteHeaderWrapper isViewAll={isViewAll} width={templateData === 'note-popup' ? '100%' : 'auto'}>
        <NoteHeaderText ref={ref}>
          {lineOfBusiness && lineOfBusiness.toLowerCase() === 'mobility' ? `${type}` : `${locale.note.ffhNotesIcon.general}`}
        </NoteHeaderText>
        {templateData === 'note-popup' && (
          <Box>
            <NoteInfoWrapper>
              <Box inline between={2}>
                <UserText>
                  {notesInfo.userId}
                </UserText>
                <BanText>{notesInfo.ban}</BanText>
              </Box>
              <Box inline between={1}>
                <UserText id="notes_userId">
                  {notesInfo.userInfo}
                </UserText>
                <DateWrapper>
                  {notesInfo.notesDate}
                </DateWrapper>
              </Box>
            </NoteInfoWrapper>
          </Box>
        )}
      </NoteHeaderWrapper>
    )
  }

  return template
})

NotesIcon.defaultProps = {
  type: '',
  locale: {
    note: {
      ffhNotesIcon: {}
    }
  },
  isViewAll: false,
  templateData: '',
  notesInfo: {}
}

NotesIcon.propTypes = {
  type: PropTypes.string,
  locale: PropTypes.object,
  isViewAll: PropTypes.bool,
  templateData: PropTypes.string,
  notesInfo: PropTypes.object,
  lineOfBusiness: PropTypes.string.isRequired
}

NotesIcon.displayName = 'NotesIcon'

export default NotesIcon
