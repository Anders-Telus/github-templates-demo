/* eslint-disable jsx-a11y/aria-role */
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Spinner from '@tds/core-spinner'
import momentTZ from 'moment-timezone'
import {
  AddCommentWrapper,
  AddCommentSection,
  CommentsButtonSection,
  SaveButtonWrapper,
  Editable
} from './styles'
import { getCasaAppLocale } from '../../../../../../utils/helper'
import {
  singleQuotes,
  singleQuotesCaseComment
} from '../../../../../../constant'
import {
  SaveButton
} from '../../styles'

const AddComment = ({
  updateComment,
  agentIdentity,
  tabUniqId,
  taskId,
  billingAcctNum,
  type,
  taskMetaData,
  addCommentStatus,
  updateCommentStatus,
  newCommentText,
  updateCommentText,
  handleCommentText,
  saveButtonActive,
  textAreaActive,
  handleSpinner,
  traceId,
  caseId,
  updateTracker,
  trackUpdateInFields,
  disabled
}) => {
  const locale = getCasaAppLocale()
  const currentLocaleLang = momentTZ.locale()
  const [divStyle, setDivStyle] = useState({
    background: 'transparent',
    width: '100%',
    minHeight: '30px',
    maxHeight: '150px',
    overflowY: 'scroll',
    borderBottom: '2px solid #d8d8d8'
  })
  const [cellValue, setCellValue] = useState(newCommentText || '')
  const [newComment, setNewComment] = useState(newCommentText)
  const [activeSaveButton, setActiveSaveButton] = useState(saveButtonActive)
  const [activeTextArea, setActiveTextArea] = useState(textAreaActive)
  const cellRef = useRef()
  const status = addCommentStatus === 'PENDING'
  const formatComment = comment => comment.trim().replace(/[^\S\r\n]+/g, ' ').replace(/'/g, singleQuotes)
  const formatCommentCase = comment => comment.trim().replace(/[^\S\r\n]+/g, ' ').replace(/'/g, singleQuotesCaseComment)
  const saveComment = () => {
    if (taskId) {
      const lastUpdatedBy = { id: agentIdentity.employeeId, name: `${agentIdentity.firstName} ${agentIdentity.lastName}` }
      const body = {
        event: {
          StandAloneTask: {
            taskId,
            lastUpdatedBy,
            comments: [
              {
                createdAt: (new Date()).toISOString(),
                createdBy: 'T-989898',
                text: formatComment(newCommentText)
              }
            ],
            accountRef: {
              accountNumber: billingAcctNum,
              systemId: ''
            }
          }
        },
        taskType: type,
        eventType: 'UITaskUpdate',
        externalId: taskMetaData && taskMetaData.externalId,
        systemSourceId: 'CasaUI',
        timeOccurred: ((new Date()).toISOString()),
        traceId: taskMetaData && taskMetaData.interactionId,
        lob: taskMetaData && taskMetaData.lob,
        brand: taskMetaData && taskMetaData.brand
      }
      handleSpinner()
      updateComment(body, tabUniqId, taskId)
    } else {
      // case comment update
      const body = {
        traceId,
        relatedEntity: [
          {
            tickets: {
              caseComments: JSON.stringify({ slug: '', text: formatCommentCase(newCommentText) }),
              lastUpdatedBy: { id: agentIdentity.employeeId, name: `${agentIdentity.firstName} ${agentIdentity.lastName}` }
            }
          }
        ]
      }
      handleSpinner()
      updateComment(body, tabUniqId, caseId)
    }
  }
  const onCl = () => {
    if (!disabled) {
      setDivStyle(p => ({
        ...p, background: 'white', borderBottom: '2px solid #4b286d', outline: 'none'
      }))
    }
  }
  const onBl = () => {
    const { textContent } = cellRef.current
    if (!textContent) {
      setDivStyle(p => ({
        ...p, background: 'transparent', borderBottom: '2px solid #d8d8d8', outline: 'none'
      }))
    }
  }
  const pushFieldsUpdate = (value) => {
    const commentType = type === 'case' ? 'caseComments' : 'taskComments'
    if (updateTracker[commentType] !== value) {
      trackUpdateInFields(tabUniqId, commentType, value)
    }
  }
  const onInput = (e) => {
    const { textContent } = e.currentTarget
    // only for spaces
    if (textContent.length) {
      setActiveTextArea(true)
    }
    if (textContent.trim() !== '') {
      if ((/\w|\W/g).test(textContent)) {
        setActiveSaveButton(true)
        pushFieldsUpdate(false)
        setActiveTextArea(true)
        const formState = {
          saveButtonActive: true,
          textAreaActive: true,
          newCommentText: cellRef.current.innerText
        }
        setDivStyle(p => ({
          ...p, background: 'white', borderBottom: '2px solid #4b286d', outline: 'none'
        }))
        handleCommentText(taskId, formState)
      } else {
        setActiveSaveButton(false)
        pushFieldsUpdate(true)
      }
    } else if (textContent.length) {
      setActiveSaveButton(false)
      pushFieldsUpdate(true)
      const state = {
        saveButtonActive: false,
        textAreaActive: true,
        caseCommentText: textContent.trim()
      }
      handleCommentText(taskId, state)
    } else {
      cellRef.current.innerHTML = ''
      setCellValue('')
      if (textContent.length === 0) {
        cellRef.current.blur()
        setDivStyle(p => ({
          ...p, background: 'transparent', borderBottom: '2px solid #d8d8d8', outline: 'none'
        }))
        setActiveSaveButton(false)
        pushFieldsUpdate(true)
      } else {
        setDivStyle(p => ({
          ...p, background: 'white', borderBottom: '2px solid #4b286d', outline: 'none'
        }))
        setActiveSaveButton(true)
        pushFieldsUpdate(false)
      }
      const formState = {
        saveButtonActive: false,
        textAreaActive: false,
        newCommentText: textContent
      }
      handleCommentText(taskId, formState)
    }
  }
  const textareaId = type === 'case' ? `textarea-${type}` : 'textarea-task'
  const commentSaveButtonId = type === 'case' ? 'comment_button_case' : 'comment_button_task'
  useEffect(() => {
    if (addCommentStatus === 'SUCCESS') {
      setNewComment('')
      setActiveSaveButton(false)
      pushFieldsUpdate(true)
      setActiveTextArea(false)
      const formState = {
        saveButtonActive: false,
        textAreaActive: false,
        newCommentText: ''
      }
      setDivStyle(p => ({
        ...p, background: 'transparent', borderBottom: '2px solid #d8d8d8', outline: 'none'
      }))
      setCellValue('')
      handleCommentText(taskId, formState)
      updateCommentStatus(tabUniqId, 'UNINIT', taskId)
      cellRef.current.innerText = ''
    }
    if (!activeTextArea) {
      setDivStyle(p => ({
        ...p, background: 'transparent', borderBottom: '2px solid #d8d8d8', outline: 'none'
      }))
    }
    if (cellValue) {
      setDivStyle(p => ({
        ...p, background: 'white', borderBottom: '2px solid #4b286d', outline: 'none'
      }))
    }
    // @todo this is not required
    updateCommentText(tabUniqId, newComment)
  }, [addCommentStatus, newComment])
  let width = ''
  let left = ''
  let buttonWidth = ''
  if (type === 'case') {
    if (currentLocaleLang === 'fr') {
      width = '480px'
      buttonWidth = '106px'
      left = '498px'
    } else {
      width = '500px'
      buttonWidth = '66px'
      left = '516px'
    }
  } else if (currentLocaleLang === 'fr') {
    width = '430px'
    buttonWidth = '106px'
    left = '460px'
  } else {
    width = '471px'
    buttonWidth = '66px'
    left = '502px'
  }

  return (
    <AddCommentWrapper type={type}>
      <AddCommentSection customWidth={width}>
        <Editable
          className="editable"
          ref={cellRef}
          role="comment_textarea"
          id={textareaId}
          contentEditable={!disabled}
          style={divStyle}
          onClick={onCl}
          onBlur={onBl}
          onInput={onInput}
          content={cellValue.length}
          placeholder={locale.case.addComment}
          active={activeTextArea}
          maxLength="2000"
          dangerouslySetInnerHTML={{ __html: cellValue.replace(/\n/g, '<br/>') }}
        />
      </AddCommentSection>
      <CommentsButtonSection left={left} width={buttonWidth}>
        <SaveButtonWrapper>
          <Spinner
            spinning={status}
            size="small"
            label={locale.task.form.addCommentSpinnerLabel}
            inline
          >
            <SaveButton
              // active={activeSaveButton}
              onClick={() => saveComment(taskId)}
              id={commentSaveButtonId}
              disabled={!activeSaveButton}
              // cursorChange={disabled}
            >
              {locale.case.buttons.save}
            </SaveButton>
          </Spinner>
        </SaveButtonWrapper>
      </CommentsButtonSection>
    </AddCommentWrapper>
  )
}
AddComment.defaultProps = {
  newCommentText: '',
  traceId: '',
  caseId: null,
  disabled: false
}
AddComment.propTypes = {
  updateComment: PropTypes.func.isRequired,
  agentIdentity: PropTypes.object.isRequired,
  tabUniqId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  addCommentStatus: PropTypes.string.isRequired,
  updateCommentStatus: PropTypes.func.isRequired,
  newCommentText: PropTypes.string,
  type: PropTypes.string.isRequired,
  updateCommentText: PropTypes.func.isRequired,
  handleCommentText: PropTypes.func.isRequired,
  saveButtonActive: PropTypes.bool.isRequired,
  textAreaActive: PropTypes.bool.isRequired,
  handleSpinner: PropTypes.func.isRequired,
  billingAcctNum: PropTypes.string.isRequired,
  taskMetaData: PropTypes.object.isRequired,
  traceId: PropTypes.string,
  caseId: PropTypes.number,
  updateTracker: PropTypes.object.isRequired,
  trackUpdateInFields: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
export default AddComment
