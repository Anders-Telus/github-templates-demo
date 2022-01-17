import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CreateNote from '../../assets/svgs/CreateNote'
import CreateNoteHover from '../../assets/svgs/CreateNoteHover'
import {
  AddNotesContainer, AddText, IconWrapper
} from './styles'
import { getCasaAppLocale } from '../../shared/locale'

const CreateNotes = ({ isNoteFormEnabled }) => {
  const locale = getCasaAppLocale()
  const [isHovering, toggleHoverState] = useState(false)

  const handleMouseHover = () => {
    toggleHoverState(!isHovering)
  }

  return (
    <AddNotesContainer
      id='create_note'
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      {isHovering ? (
        <IconWrapper>
          <CreateNoteHover />
        </IconWrapper>
      ) : (
        <IconWrapper>
          <CreateNote isEnabled={isNoteFormEnabled} />
        </IconWrapper>
      )}
      <AddText>
        {locale.ban.note}
      </AddText>
    </AddNotesContainer>
  )
}

CreateNotes.propTypes = {
  isNoteFormEnabled: PropTypes.bool.isRequired
}

export default CreateNotes
