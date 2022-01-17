import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddTask from '../../assets/svgs/AddTask'
import AddTaskHover from '../../assets/svgs/AddTaskHover'
import { AddTasksContainer, AddText, IconWrapper } from './styles'
import { getCasaAppLocale } from '../../shared/locale'

const AddTasks = ({ isAddTaskEnabled }) => {
  const locale = getCasaAppLocale()
  const [isHovering, toggleHoverState] = useState(false)

  const handleMouseHover = () => {
    toggleHoverState(!isHovering)
  }

  return (
    <AddTasksContainer
      id='add_task'
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      {isHovering ? (
        <IconWrapper>
          <AddTaskHover />
        </IconWrapper>
      ) : (
        <IconWrapper>
          <AddTask isEnabled={isAddTaskEnabled} />
        </IconWrapper>
      )}
      <AddText>
        {locale.ban.task}
      </AddText>
    </AddTasksContainer>
  )
}

AddTasks.propTypes = {
  isAddTaskEnabled: PropTypes.bool.isRequired
}
export default AddTasks
