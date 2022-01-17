import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  TextEditable
} from './styles'


const SelectInput = ({
  id, placeholder, addCommentHandler, newCommentText, disabled
}) => {
  const cellRef = useRef()
  const [cellValue, setCellValue] = useState(newCommentText || '')
  const [divStyle, setDivStyle] = useState({
    background: 'transparent',
    width: '100%',
    minHeight: '30px',
    maxHeight: '132px',
    overflowY: 'scroll',
    borderBottom: '2px solid #d8d8d8',
    padding: '9px 8px 9px 8px'
  })

  const editableClick = () => {
    if (!disabled) {
      setDivStyle(p => ({
        ...p, background: 'white', borderBottom: '2px solid #4b286d', outline: 'none'
      }))
    }
  }

  const editableBlur = () => {
    const { textContent } = cellRef.current
    if (!textContent) {
      setDivStyle(p => ({
        ...p, background: 'transparent', borderBottom: '2px solid #d8d8d8', outline: 'none'
      }))
    }
  }
  const editableInput = (e) => {
    const { textContent } = e.currentTarget
    if (textContent && textContent.trim() !== '') {
      setDivStyle(p => ({
        ...p, background: 'white', borderBottom: '2px solid #4b286d', outline: 'none'
      }))
      addCommentHandler(e)
    } else {
      cellRef.current.innerHTML = ''
      setCellValue('')
      cellRef.current.blur()
      setDivStyle(p => ({
        ...p, background: 'transparent', borderBottom: '2px solid #d8d8d8', outline: 'none'
      }))
      addCommentHandler(e)
    }
  }

  return (
    <TextEditable
      className="editable"
      ref={cellRef}
      id={id}
      contentEditable={!disabled}
      style={divStyle}
      onClick={editableClick}
      onBlur={editableBlur}
      onInput={editableInput}
      content={cellValue && cellValue.length}
      placeholder={placeholder}
      maxLength="2000"
      dangerouslySetInnerHTML={{ __html: cellValue && cellValue.replace(/\n/g, '<br/>') }}
    />
  )
}
SelectInput.defaultProps = {
  placeholder: 'Type Here',
  disabled: false
}
SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  addCommentHandler: PropTypes.func.isRequired,
  newCommentText: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}
export default SelectInput
