import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '@tds/core-spinner'
import FlexGrid from '@tds/core-flex-grid'
import momentTZ from 'moment-timezone'
import Strong from '@tds/core-strong'
import Box from '@tds/core-box'
import Text from '@tds/core-text'
import HairlineDivider from '@tds/core-hairline-divider'
import _ from 'lodash'
import {
  PhoneHome, Chat1, Email, Time
} from '@tds/core-decorative-icon'
import { Edit } from '@tds/core-interactive-icon'
import Notification from '@tds/core-notification'
import Skeleton from '../../../../components/shared/Skeleton'
import DetailsPopup from '../../../../components/DetailsPopup/view'
import Editable from '../../../../components/EditableField/view'
import CustomDropDown from '../../../../components/CustomDropDown'
import {
  getCasaAppLocale,
  captalizeFirstCharacter,
  getTranslatedCaseStatus,
  getTranslatedAsscTaskStatus,
  getNotificationslLink,
  TIMEZONE_MAPPING,
  getCurrentLanguage,
  openWindowWithPost,
  getAgentLanguage,
  isAuthorized
} from '../../../../utils/helper'
import Telus from '../../../../../assets/svgs/Telus'
import Koodo from '../../../../../assets/svgs/Koodo'
import { AlignCenter, CasaIconButton } from '../../../../components/Styled'
import Accordion from './components/Accordion'
import Tooltip from '../../../../components/Tooltip'
import ContentTabs from '../../../../components/ContentTabs'
import AddComment from './components/AddComment/view'
import CommentsList from './components/CommentsList/view'
import CalendarModal from '../Calendar/view'
import { getObjectChangedKeys } from '../../../../utils/common/index'
import TooltipWrapper from '../../../Search/components/FIFAEscalationForm/TooltipWrapper'
import TaskHistory from '../TaskDetail/TaskHistory/view'
import Caret from '../../../../../assets/svgs/Caret'
import ClickToCopy from '../../../../components/ClickToCopy'
import EnvToggle, { isFeatureEnabled } from '../../../../components/EnvToggle'
import {
  CaseBody,
  CaseContainer,
  CaseCustomerDetail,
  FooterContent,
  DropdownWrapper,
  TaskButtonsWrapper,
  SaveButton,
  GreenBox,
  AccorordionTaskData,
  Icon,
  AccordionCol2,
  AccordionCol3,
  AccordionCol4,
  AccorordionInnerWrapper,
  ButtonContainer,
  PopupContainer,
  EllipsesText,
  CustomerDetailRow,
  DetailsColumn,
  SymbolColumn,
  AccordionButton,
  TimeWrapper,
  TaskDataWrapper,
  CommentBox,
  CommentSection,
  AccordionOuterHeader,
  MediumWeightText,
  RegularWeightText,
  ContactCard,
  LobBody,
  CaseCommentsSection,
  LightWeightText,
  NoTaskBody,
  NotificationURL,
  HyperLink,
  FooterContentInner,
  DateTimeLabelContainer,
  DueDateModal,
  DueDateTimeContentContainer,
  DueDateTimeLabel,
  DueDateTimeContent,
  BusinessHoursContent,
  NameLabel,
  ErrorWraper,
  ErrorWraperRetry,
  CustomDropDownWrapper,
  RetryContainer,
  GridContainer,
  CardSection,
  CaseSection,
  MessageIconColumn,
  SpacingBar,
  ErrorContentText,
  TimeZoneWrapper,
  ErrorContent,
  Link,
  BoldWeightText
} from './styles'
import {
  TryAgainLink
} from '../TaskDetail/styles'
import {
  FetchFailedText
} from '../../../Search/components/FBADetail/styles'

import CloseModal from './components/CloseModal'
import {
  taskDetailsHiddenFields,
  rtsRepairType,
  showChangeReason,
  rtsServiceFlow,
  caseDetailParseFlow,
  parseTaskWithinCase,
  caseClosingStatus,
  emailRegex,
  DEFAULT_MSG_TOPIC,
  agentPolicy
} from '../../../../constant'
import SmsInverted from '../../../../../assets/svgs/SmsInverted'
import EmailInverted from '../../../../../assets/svgs/EmailInverted'
import uiConfig from '../../../../../config/ui'
import NotificationBodyContent from './NotificationPopUpBody'
import FeatureToggle from '../../../../components/FeatureToggle'

let locale = getCasaAppLocale()
const accordingToolTipMapper = ['COMPLETED', 'CANCELLED']
class CaseDetail extends React.PureComponent {
  inputRefs = {}

  constructor(props) {
    super(props)
    const { caseModalTaskDetail, banDetails } = this.props
    const {
      customerPortalEmail,
      customerPrimaryContactEmail
    } = banDetails
    this.state = {
      dragPosition: props.detail.modifieable.dragPosition,
      notificationDragPosition: props.getNotificationModalDetail('taskWithinCase')?.modifieable?.dragPosition || {
        x: '47%',
        y: '177px'
      },
      caseCommentNotificationDragPosition: props.getNotificationModalDetail('caseCommentNotificationPopup')?.modifieable?.dragPosition || {
        x: '41%',
        y: '53%'
      },
      rel: props.detail.modifieable.rel,
      notificationRel: props.getNotificationModalDetail('taskWithinCase')?.modifieable?.rel || { x: 0, y: 0 },
      caseCommentNotificationRel: props.getNotificationModalDetail('caseCommentNotificationPopup')?.modifieable?.rel || { x: 0, y: 0 },
      minimized: props.detail.minimized,
      index: props.detail.index,
      notificationIndex: props.getNotificationModalDetail('taskWithinCase')?.index || 4,
      caseCommentNotificationIndex: props.getNotificationModalDetail('caseCommentNotificationPopup')?.index || 4,
      activeTab: caseModalTaskDetail.activeTab || 'comments',
      activeTabTask: caseModalTaskDetail.activeTabTask || '',
      caseCommentText: caseModalTaskDetail.caseCommentText || '',
      caseSaveButtonActive: caseModalTaskDetail.caseSaveButtonActive || false,
      activeCaseTab: caseModalTaskDetail.activeCaseTab || 'comments',
      addCommentStatus: caseModalTaskDetail.addCommentStatus || 'UNINIT',
      newCommentRemoved: false,
      sms: (caseModalTaskDetail.Case && caseModalTaskDetail.Case.phoneNumber) || '',
      cbr: caseModalTaskDetail.Case && (caseModalTaskDetail.Case.cbr || ''),
      email: (caseModalTaskDetail.Case && caseModalTaskDetail.Case.email) || customerPortalEmail || customerPrimaryContactEmail || '',
      isSMSValid: caseModalTaskDetail.isSMSValid === undefined
        ? true : caseModalTaskDetail.isSMSValid,
      isCBRValid: caseModalTaskDetail.isCBRValid === undefined
        ? true : caseModalTaskDetail.isCBRValid,
      isEmailValid: caseModalTaskDetail.isEmailValid === undefined
        ? true : caseModalTaskDetail.isEmailValid,
      saveBtnDisabled: caseModalTaskDetail.saveBtnDisabled === undefined
        ? true : caseModalTaskDetail.saveBtnDisabled,
      fieldsStatus: caseModalTaskDetail.updateFieldsStatus || 'UNINIT',
      popUpClosed: false,
      tasks: (caseModalTaskDetail && caseModalTaskDetail.tasks
        && caseModalTaskDetail.tasks.length) ? caseModalTaskDetail.tasks : [],
      allTasks: (caseModalTaskDetail && caseModalTaskDetail.allTasks
        && caseModalTaskDetail.allTasks.length) ? caseModalTaskDetail.allTasks : [],
      rightAlignPosition: '1%',
      repairLink: (caseModalTaskDetail.Case && caseModalTaskDetail.Case.repairLink) || '',
      smartRepairDashboardLink: (caseModalTaskDetail.Case && caseModalTaskDetail.Case.smartRepairDashboardLink) || '',
      ticketNumber: (caseModalTaskDetail.Case && caseModalTaskDetail.Case.externalId) || '',
      isEditable: false,
      dueTime: '9:00 AM',
      accordionHeight: caseModalTaskDetail.accordionHeight ? caseModalTaskDetail.accordionHeight : 'auto',
      EmailTooltip: (caseModalTaskDetail.Case && caseModalTaskDetail.Case.EmailTooltip) || false,
      nameTooltip: false,
      caseCompleteCancelDisplayOption: (caseModalTaskDetail.caseCompleteCancelDisplayOption)
      || false,
      caseCompleteCancelItem: (caseModalTaskDetail.caseCompleteCancelItem) || '',
      caseCancelOrComplete: (caseModalTaskDetail.caseCancelOrComplete) || '',
      caseUDTypeData: (caseModalTaskDetail.caseUDTypeData) || [],
      isRTSPopUpOpen: false,
      initialOpenTaskId: '',
      initialEmail: (caseModalTaskDetail.Case && (caseModalTaskDetail.Case.initialEmail || caseModalTaskDetail.Case.email)) || customerPortalEmail || customerPrimaryContactEmail || '',
      notificationDataIndex: 0
    }
    this.resultingOutcomes = []
    this.cancelItems = []
    this.cancelReasonText = {}
    this.completeReasonText = {}
    this.removeCasePopupHandler = this.removeCasePopupHandler.bind(this)
    this.closeNotificationHandler = this.closeNotificationHandler.bind(this)
    this.updateCaseDetailHandler = this.updateCaseDetailHandler.bind(this)
    this.updateNoificationIndex = this.updateNoificationIndex.bind(this)
    this.fetchAssociatedTask = this.fetchAssociatedTask.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.alterOptionHandler = this.alterOptionHandler.bind(this)
    this.popupContainer = React.createRef()
    this.notificationPopupContainer = React.createRef()
    this.caseCommentPopupContainer = React.createRef()
    this.emailRef = React.createRef()
    this.linkRef = React.createRef()
    this.accordionRef = React.createRef()
    this.caseBodyRef = React.createRef()
    this.listRef = React.createRef()
    this.calendarRef = React.createRef()
    this.completeCustomDropDownRef = React.createRef()
    this.cancelCustomDropDownRef = React.createRef()
    this.onCompleteBlur = this.onCompleteBlur.bind(this)
    this.handleTabClick = this.handleTabClick.bind(this)
    this.createdOrUpdateAgent = this.createdOrUpdateAgent.bind(this)
    this.handlerAccordionOpen = this.handlerAccordionOpen.bind(this)
    this.updateCommentTextHandler = this.updateCommentTextHandler.bind(this)
    this.handleCommentText = this.handleCommentText.bind(this)
    this.handleSpinner = this.handleSpinner.bind(this)
    this.rightAlignhandler = this.rightAlignhandler.bind(this)
    this.handleCaseTabClick = this.handleCaseTabClick.bind(this)
    this.handleCaseSpinner = this.handleCaseSpinner.bind(this)
    this.handleCaseCommentText = this.handleCaseCommentText.bind(this)
    this.saveCaseData = this.saveCaseData.bind(this)
    this.formatFields = this.formatFields.bind(this)
    this.checkForUpdatedValues = this.checkForUpdatedValues.bind(this)
    this.onCBRChange = this.onCBRChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onSMSChange = this.onSMSChange.bind(this)
    this.editClick = this.editClick.bind(this)
    this.cardBlurHandler = this.cardBlurHandler.bind(this)
    this.returnAndSaveHandler = this.returnAndSaveHandler.bind(this)
    this.closeHandler = this.closeHandler.bind(this)
    this.removeCloseModalHandler = this.removeCloseModalHandler.bind(this)
    this.closeCalendar = this.closeCalendar.bind(this)
    this.getWarningMessage = this.getWarningMessage.bind(this)
    this.saveCaseCalendar = this.saveCaseCalendar.bind(this)
    this.convertWarningMessage = this.convertWarningMessage.bind(this)
    this.formatDateTime = this.formatDateTime.bind(this)
    this.alterCancelOptionHandler = this.alterCancelOptionHandler.bind(this)
    this.alterCompleteOptionHandler = this.alterCompleteOptionHandler.bind(this)
    this.onCompleteChangeHandler = this.onCompleteChangeHandler.bind(this)
    this.alterResultingOutcomeOptionData = this.alterResultingOutcomeOptionData.bind(this)
    this.alterCancelOptionData = this.alterCancelOptionData.bind(this)
    this.handleCancelChange = this.handleCancelChange.bind(this)
    this.setNameTooltipVisibility = this.setNameTooltipVisibility.bind(this)
    this.nameLabelRef = React.createRef()
    this.alterCaseCancelCompleteOptionData = this.alterCaseCancelCompleteOptionData.bind(this)
    this.caseCancelCompleteReasons = []
    this.alterCancelCompleteChangeHandler = this.alterCancelCompleteChangeHandler.bind(this)
    this.caseCompleteCancelHandler = this.caseCompleteCancelHandler.bind(this)
    this.resetTaskCancelComplete = this.resetTaskCancelComplete.bind(this)
    this.caseCompleteCancelHandlerBlur = this.caseCompleteCancelHandlerBlur.bind(this)
    this.mapTimezone = this.mapTimezone.bind(this)
    this.onFocusOut = this.onFocusOut.bind(this)
    this.closeCaseCalendar = this.closeCaseCalendar.bind(this)
    this.getUpdatedNotificationIndex = this.getUpdatedNotificationIndex.bind(this)
    this.getDragPosition = this.getDragPosition.bind(this)
  }

  componentDidMount() {
    const {
      caseModalTaskDetail: { Case: { interactionId } },
      caseModalTaskDetail, detail: { modifieable: { scrollTop } }
    } = this.props

    this.alterResultingOutcomeOptionData()
    this.alterCancelOptionData()
    if (caseModalTaskDetail.caseUDTypeData && caseModalTaskDetail.caseUDTypeData.length) {
      this.caseCancelCompleteReasons = caseModalTaskDetail.caseUDTypeData
    } else {
      this.alterCaseCancelCompleteOptionData()
    }

    if (!(
      caseModalTaskDetail
      && caseModalTaskDetail.tasks
      && (caseModalTaskDetail.tasks.length
      || caseModalTaskDetail.fetchTasksStatus))) {
      this.fetchAssociatedTask(interactionId)
    }
    this.alterCaseCancelCompleteOptionData()
    if (this.caseBodyRef && this.caseBodyRef.current) {
      this.caseBodyRef.current.scrollTop = scrollTop || 0
    }
  }

  componentDidUpdate(prevProps) {
    const { taskUDTypeData } = this.props
    if (!_.isEqual(taskUDTypeData, prevProps.taskUDTypeData)) {
      this.alterResultingOutcomeOptionData()
      this.alterCancelOptionData()
      this.alterCaseCancelCompleteOptionData()
    }
  }

  componentWillUnmount() {
    const {
      detail: { id },
      updateCaseDetail,
      caseModalTaskDetail, fieldsStatus,
      updateCaseDetailItem, tabUniqId
    } = this.props
    const {
      dragPosition, rel, minimized, index, tasks, addCommentStatus, caseCommentText, popUpClosed,
      caseSaveButtonActive, sms, email, cbr, isSMSValid, isEmailValid, isCBRValid, saveBtnDisabled,
      EmailTooltip, accordionHeight, caseCompleteCancelItem, caseCancelOrComplete,
      caseUDTypeData, activeTab, activeTabTask, activeCaseTab, initialEmail
    } = this.state
    const caseDetail = caseModalTaskDetail.Case
    caseDetail.phoneNumber = sms
    caseDetail.email = email
    caseDetail.cbr = cbr
    caseDetail.EmailTooltip = EmailTooltip
    caseDetail.initialEmail = initialEmail
    if (fieldsStatus && fieldsStatus !== 'SUCCESS' && !popUpClosed) {
      updateCaseDetailItem({
        [tabUniqId]: {
          openCaseModel: true,
          addCommentStatus,
          caseCommentText,
          caseSaveButtonActive,
          updateFieldsStatus: fieldsStatus,
          id,
          Case: caseDetail,
          tasks,
          isSMSValid,
          isEmailValid,
          isCBRValid,
          saveBtnDisabled,
          accordionHeight,
          caseCompleteCancelItem,
          caseCancelOrComplete,
          caseCompleteCancelDisplayOption: false,
          caseUDTypeData,
          activeTab,
          activeTabTask,
          activeCaseTab
        }
      })
      const { current } = this.caseBodyRef || {}
      const { scrollTop } = current || {}
      updateCaseDetail({
        values: {
          dragPosition,
          rel,
          minimized,
          index,
          scrollTop
        },
        id,
        tabId: tabUniqId,
        type: 'case-detail',
        parent: 'modifieable',
        from: 'unmount'
      })
    }
  }

  // @todo - this needs to be refactored for performance reasons
  static getDerivedStateFromProps(props, state) {
    let { caseModalTaskDetail: { tasks } } = props
    const { caseModalTaskDetail: { allTasks, Case }, detail: { minimized } } = props
    let _activeTabTask = ''
    if (state.tasks && tasks) {
      const _activeTabPropsTasks = tasks.filter(t => t.isOpen)
      const _activeTabTasks = state.tasks.filter(t => t.isOpen)
      if (_activeTabPropsTasks.length) {
        _activeTabTask = _activeTabPropsTasks[0].taskId
      }
      if (_activeTabTasks.length) {
        _activeTabTask = _activeTabTasks[0].taskId
      }
    }
    const {
      caseModalTaskDetail: {
        caseCommentText,
        caseSaveButtonActive,
        addCommentStatus,
        caseModalTaskDetail,
        taskUpdateCommentStatus,
        taskUpdateDueDateStatus
      },
      fieldsStatus
    } = props
    let newComment = caseCommentText
    let caseSaveButtonActiveState = caseSaveButtonActive === undefined
      ? false : caseSaveButtonActive
    let { isRTSPopUpOpen } = state
    const { taskStatus } = showChangeReason
    const taskToOpen = tasks && tasks.find(task => task.isOpen)
    if (tasks) {
      tasks = tasks.map(item => ({
        ...item,
        isOpen: (
          taskToOpen
          && !state.initialOpenTaskId
          && item.taskId === taskToOpen.taskId
        ) || false
      }))
    }
    if (state.tasks && tasks) {
      tasks = tasks.map((item) => {
        const filteredItems = state.tasks.filter(e => e.taskId === item.taskId)
        const newCommentText = filteredItems[0] ? filteredItems[0].newCommentText : ''
        const saveButtonActive = filteredItems[0] ? filteredItems[0].saveButtonActive : false
        const textAreaActive = filteredItems[0] ? filteredItems[0].textAreaActive : false
        const accordionHeight = filteredItems[0] ? filteredItems[0].accordionHeight : 'auto'
        const stateTasks = state.tasks.filter(e => e.taskId === item.taskId)
        const _showWarning = stateTasks[0] && stateTasks[0].showWarning
        const _warningMessage = stateTasks[0] && stateTasks[0].warningMessage
        const _showCalendar = stateTasks[0] && stateTasks[0].showCalendar
        const _savedCalendar = stateTasks[0] && stateTasks[0].savedCalendar
        const _xPosition = stateTasks[0] && stateTasks[0].xPosition
        const _yPosition = stateTasks[0] && stateTasks[0].yPosition
        const _statusChangeReason = (stateTasks[0] && stateTasks[0].statusChangeReason)
          ? stateTasks[0].statusChangeReason : ''
        const _outcomeItem = (stateTasks[0] && stateTasks[0].outcomeItem)
          ? stateTasks[0].outcomeItem : ''
        // cancelDisplayOption
        const _cancelDisplayOption = (stateTasks[0] && stateTasks[0].cancelDisplayOption)
          ? stateTasks[0].cancelDisplayOption : false
        // completeDisplayOption
        const _completeDisplayOption = (stateTasks[0] && stateTasks[0].completeDisplayOption)
          ? stateTasks[0].completeDisplayOption : false
        const _cancelItem = (stateTasks[0] && stateTasks[0].cancelItem)
          ? stateTasks[0].cancelItem : ''
        return {
          ...item,
          ...{ newCommentText },
          ...{ saveButtonActive },
          ...{ accordionHeight },
          ...{ textAreaActive },
          ...{ showWarning: _showWarning },
          ...{ warningMessage: _warningMessage },
          ...{ showCalendar: _showCalendar },
          ...{ savedCalendar: _savedCalendar },
          ...{ xPosition: _xPosition },
          ...{ yPosition: _yPosition },
          ...{ statusChangeReason: _statusChangeReason },
          ...{ outcomeItem: _outcomeItem },
          ...{ cancelDisplayOption: _cancelDisplayOption },
          ...{ completeDisplayOption: _completeDisplayOption },
          ...{ cancelItem: _cancelItem }
        }
      })
    }

    let taskIndex = -1
    if (state && state.tasks) {
      taskIndex = state.tasks.findIndex(elem => elem.isOpen)
    }
    if (taskIndex !== -1 && tasks.length) {
      tasks[taskIndex].isOpen = true
    }
    if (state.caseCommentText) {
      newComment = state.caseCommentText
      caseSaveButtonActiveState = state.caseSaveButtonActive
    } else if (!state.caseCommentText && state.newCommentRemoved) {
      newComment = state.caseCommentText
      caseSaveButtonActiveState = state.caseSaveButtonActive
    }

    const {
      removeCaseDetail, detail: { id, index }, tabUniqId, removeCaseTaskDetail
    } = props
    if (fieldsStatus === 'SUCCESS') {
      removeCaseDetail({
        tabId: tabUniqId,
        type: 'case-detail',
        id
      })
      removeCaseTaskDetail({ tabId: tabUniqId })
    }
    const closedRepairTypeTask = allTasks && allTasks.filter(item => (
      rtsRepairType.includes(item.repairType)
      && !taskStatus.includes(item.status)
      && item.repairStatus === 'closed'
    ))
    if (closedRepairTypeTask && !closedRepairTypeTask.length
        && !isRTSPopUpOpen && state.allTasks
        && rtsServiceFlow.includes(Case.serviceFlow)) {
      isRTSPopUpOpen = true
    }
    return {
      tasks,
      allTasks: (allTasks || []),
      fieldsStatus: fieldsStatus || 'UNINIT',
      addCommentStatus: addCommentStatus || 'UNINIT',
      caseModalTaskDetail,
      caseCommentText: newComment,
      caseSaveButtonActive: caseSaveButtonActiveState,
      isRTSPopUpOpen,
      index,
      initialOpenTaskId: taskToOpen ? taskToOpen.taskId : '',
      taskUpdateCommentStatus,
      taskUpdateDueDateStatus,
      activeTabTask: _activeTabTask,
      minimized
    }
  }

  onMouseOver = () => {
    const { nameTooltip } = this.state
    if (!nameTooltip && this.nameLabelRef.current.scrollWidth
      > this.nameLabelRef.current.offsetWidth) {
      this.setNameTooltipVisibility(true)
    } else if (nameTooltip && this.nameLabelRef.current.scrollWidth
      <= this.nameLabelRef.current.offsetWidth) {
      this.setNameTooltipVisibility(false)
    }
  }

  onChangeHandler = () => { }

  onSMSChange(data) {
    const { sms } = this.state
    if (sms !== data) {
      this.setState({
        sms: data,
        isSMSValid: true,
        saveBtnDisabled: false
      }, () => {
        this.checkForUpdatedValues()
      })
    }
  }

  onCBRChange(data) {
    const { cbr } = this.state
    if (cbr !== data) {
      this.setState({
        cbr: data,
        isCBRValid: true,
        saveBtnDisabled: false
      }, () => {
        this.checkForUpdatedValues()
      })
    }
  }

  onEmailChange(data, isTooltip) {
    const { email, initialEmail } = this.state
    const { trackUpdateInFields, tabUniqId } = this.props
    if (initialEmail !== data) {
      trackUpdateInFields(tabUniqId, 'email', true)
    } else {
      trackUpdateInFields(tabUniqId, 'email', false)
    }
    if (email !== data) {
      this.setState({
        email: data,
        isEmailValid: true,
        saveBtnDisabled: false,
        EmailTooltip: isTooltip
      }, () => {
        this.checkForUpdatedValues()
      })
    }
    this.setState({ EmailTooltip: isTooltip })
  }

  onCompleteChangeHandler(e, item) {
    e.stopPropagation()
    const { tasks } = this.state
    const { taskId } = item
    const modifiedTasks = tasks.map((task) => {
      let _completeDisplayOption = false
      if (task.taskId === taskId) {
        _completeDisplayOption = true
        // _completeDisplayOption = !item.completeDisplayOption
      } else {
        _completeDisplayOption = item.completeDisplayOption
      }
      return {
        ...task,
        ...{ completeDisplayOption: _completeDisplayOption },
        ...{ cancelDisplayOption: false }
      }
    })

    this.setState({
      tasks: modifiedTasks
    })
  }

  onCompleteBlur() {
    const { tasks } = this.state
    const modifiedTasks = tasks.map((task) => {
      return {
        ...task,
        ...{ completeDisplayOption: false },
        ...{ cancelDisplayOption: false }
      }
    })
    this.setState({
      tasks: modifiedTasks
    })
  }

  onFocusOut() {
    const {
      detail: { id },
      updateCaseDetail,
      caseModalTaskDetail: { existingData, Case }, fieldsStatus,
      updateCaseDetailItem, tabUniqId
    } = this.props
    const {
      dragPosition, rel, minimized, index, tasks, addCommentStatus, caseCommentText, popUpClosed,
      caseSaveButtonActive, sms, email, cbr, isSMSValid, isEmailValid, isCBRValid, saveBtnDisabled,
      EmailTooltip, accordionHeight, caseCompleteCancelItem, caseCancelOrComplete,
      caseUDTypeData, activeTab, activeTabTask, activeCaseTab, allTasks
    } = this.state

    const caseDetail = Case
    caseDetail.phoneNumber = sms
    caseDetail.email = email
    caseDetail.cbr = cbr
    caseDetail.EmailTooltip = EmailTooltip
    if (fieldsStatus && fieldsStatus !== 'SUCCESS' && !popUpClosed) {
      updateCaseDetailItem({
        [tabUniqId]: {
          openCaseModel: true,
          addCommentStatus,
          caseCommentText,
          caseSaveButtonActive,
          updateFieldsStatus: fieldsStatus,
          id,
          Case: caseDetail,
          tasks,
          isSMSValid,
          isEmailValid,
          isCBRValid,
          saveBtnDisabled,
          accordionHeight,
          caseCompleteCancelItem,
          caseCancelOrComplete,
          caseCompleteCancelDisplayOption: false,
          caseUDTypeData,
          activeTab,
          activeTabTask,
          activeCaseTab,
          allTasks,
          existingData
        }
      })
      const { current } = this.caseBodyRef || {}
      const { scrollTop } = current || {}
      updateCaseDetail({
        values: {
          dragPosition,
          rel,
          minimized,
          index,
          scrollTop
        },
        id,
        tabId: tabUniqId,
        type: 'case-detail',
        parent: 'modifieable',
        from: 'unmount'
      })
    }
  }

  getDragPosition(conditionType, messageId, popUpType, caseId) {
    const {
      tabUniqId,
      fetchNotificationData,
      fetchNotificationListData,
      caseModalTaskDetail: {
        Case: {
          createdAt,
          billingAccNum
        }
      }
    } = this.props
    let dragPosition = {}
    if (conditionType === 'taskWithinCase') {
      fetchNotificationData(tabUniqId, messageId)
      dragPosition = {
        x: '47%',
        y: '177px'
      }
    }
    if (conditionType === 'caseComments') {
      const startDate = momentTZ(createdAt).tz('Utc/GMT').format('YYYY-MM-DD')
      const endDate = momentTZ().tz('Utc/GMT').add(2, 'd').format('YYYY-MM-DD')
      fetchNotificationListData(tabUniqId, billingAccNum, startDate, endDate, caseId, popUpType, 'case')
      dragPosition = {
        x: '41%',
        y: '53%'
      }
    }
    return dragPosition
  }

  getUpdatedNotificationIndex(index) {
    this.setState({
      notificationDataIndex: index
    })
  }

  setNameTooltipVisibility = (Visibility) => {
    this.setState({
      nameTooltip: Visibility
    })
  }

  getWarningMessage(date) {
    const { dueDateDuration } = this.props
    const futureDueDate = momentTZ(date)
    const currentDate = momentTZ()
    const dueDateDiff = futureDueDate.diff(currentDate, 'seconds')
    const durationValue = dueDateDuration && dueDateDuration.value
    const seconds = (durationValue === 0) ? durationValue : (durationValue * 60 * 60) - 1
    const isUnderDuration = dueDateDiff < seconds && dueDateDiff > 0
    const pastDue = dueDateDiff < 0
    const durationUnit = durationValue === 1 ? `${locale.task.durationUnit},` : `${locale.task.durationUnit}s,`
    let msg = ''
    if (pastDue) {
      msg = `${locale.task.pastDueDate}`
    }
    if (isUnderDuration) {
      msg = `${locale.task.underDurationDueDateWithin} ${durationValue} ${durationUnit} ${locale.task.underDurationDeferIWS}`
    }
    return msg
  }

  isECPV1MessageId = (ecpMessageId = '') => {
    return ecpMessageId.indexOf('-') === -1
  }

  fetchAssociatedTask = async () => {
    const {
      tabUniqId, detail: { id }, updateCaseModalData, caseModalTaskDetail,
      caseModalTaskDetail: { fetchTasksStatus, Case },
      fetchTasksUnderCase,
      updateTracker
    } = this.props
    const {
      caseSaveButtonActive, isSMSValid, isEmailValid, isCBRValid, saveBtnDisabled, EmailTooltip,
      caseCompleteCancelItem
    } = this.state
    Case.EmailTooltip = EmailTooltip
    updateCaseModalData({
      [tabUniqId]: {
        newCommentText: '',
        caseCommentText: '',
        saveButtonActive: false,
        addCommentStatus: 'UNINIT',
        updateFieldsStatus: 'UNINIT',
        openCaseModel: true,
        id,
        existingData: {
          sms: caseModalTaskDetail.Case.phoneNumber || '',
          email: caseModalTaskDetail.Case.email || '',
          cbr: caseModalTaskDetail.Case.cbr || '',
          caseCompleteCancelItem
        },
        accordionHeight: 'auto',
        caseSaveButtonActive,
        fetchTasksStatus,
        isEmailValid,
        isSMSValid,
        tasks: [],
        updateTracker,
        Case,
        isCBRValid,
        saveBtnDisabled,
        taskUpdateCommentStatus: 'UNINIT',
        taskUpdateDueDateStatus: 'UNINT'
      }
    })
    fetchTasksUnderCase({
      [tabUniqId]: {
        Case,
        id,
        init: true
      }
    })
  }

  alterOptionHandler = () => { }

  onClickOutsideOfOptions = () => {
    this.setState({
      caseCompleteCancelDisplayOption: false
    })
  }

  openRTSModalHandler = () => {
    const { trackRTSCloseModal, tabUniqId } = this.props
    trackRTSCloseModal(tabUniqId, true)
  }

  formatRTSWarningMsg = (msg) => {
    return <p dangerouslySetInnerHTML={{ __html: msg.trim().replace(/\n/g, '<br/>') }} />
  }

  removeRTSCloseModalHandler = () => {
    const { trackRTSCloseModal, tabUniqId } = this.props
    trackRTSCloseModal(tabUniqId, false)
  }

  retunAndSaveRTSHandler = () => {
    const { trackRTSCloseModal, tabUniqId } = this.props
    trackRTSCloseModal(tabUniqId, false)
    this.saveCaseData()
  }

  handleClick = (caseId, messageId, popUpType) => {
    const {
      getNotificationModalDetail,
      addDetail,
      tabUniqId,
      updateCaseDetail
    } = this.props
    let condition = ''
    let conditionType = ''
    const { messageID, id } = getNotificationModalDetail(popUpType)
    if (popUpType === 'taskWithinCase') {
      condition = caseId !== id || messageID !== messageId
      conditionType = 'taskWithinCase'
    } else if (popUpType === 'caseCommentNotificationPopup') {
      condition = caseId !== id
      conditionType = 'caseComments'
    } else {
      condition = caseId !== id
      conditionType = 'caseComments'
    }

    if (condition) {
      addDetail({
        [tabUniqId]: [{
          type: popUpType,
          messageID: messageId,
          id: caseId,
          isOpen: true,
          dimensions: {
            height: '70vh',
            width: '75%'
          },
          index: 3,
          minimized: false,
          position: 0,
          isDraggable: true,
          modifieable: {
            showMinimizeIcon: false,
            showCloseIcon: true,
            dragPosition: this.getDragPosition(conditionType, messageId, popUpType, caseId),
            rel: {
              x: 0,
              y: 0
            },
            showFooter: false,
            showHeader: true,
            showBody: true
          }
        }]
      })
    } else {
      updateCaseDetail({
        values: {
          index: getNotificationModalDetail(popUpType).highestZindex
            ? getNotificationModalDetail(popUpType).highestZindex + 1
            : 4
        },
        id: caseId,
        messageID: messageId,
        tabId: tabUniqId,
        type: popUpType
      })
    }
  }


  alterCompleteOptionHandler(value, item) {
    const { tasks } = this.state
    const { trackUpdateInFields, tabUniqId } = this.props
    const { taskId } = item
    const modifiedTasks = tasks.map((task) => {
      let _outcomeItem = ''
      let _statusChangeReason = ''
      let _cancelItem = ''
      let _completeDisplayOption = false

      if (task.taskId === taskId) {
        _outcomeItem = value
        _statusChangeReason = value
        _cancelItem = ''
        _completeDisplayOption = false
      } else {
        _outcomeItem = task.outcomeItem
        _statusChangeReason = task.statusChangeReason
        _cancelItem = task.cancelItem
        _completeDisplayOption = task.completeDisplayOption
      }
      return {
        ...task,
        ...{ outcomeItem: _outcomeItem },
        ...{ statusChangeReason: _statusChangeReason },
        ...{ cancelItem: _cancelItem },
        ...{ completeDisplayOption: _completeDisplayOption }
      }
    })
    this.setState({
      tasks: modifiedTasks,
      saveBtnDisabled: false
    }, () => {
      trackUpdateInFields(tabUniqId, 'taskComplete', false)
    })
  }

  isUnderOrPastDue(date) {
    const { dueDateDuration } = this.props
    const futureDueDate = momentTZ(date)
    const currentDate = momentTZ()
    const dueDateDiff = futureDueDate.diff(currentDate, 'seconds')
    const durationValue = dueDateDuration && dueDateDuration.value
    const seconds = (durationValue === 0) ? durationValue : (durationValue * 60 * 60) - 1
    const isUnderDuration = dueDateDiff < seconds && dueDateDiff > 0
    const pastDue = dueDateDiff < 0
    return isUnderDuration || pastDue
  }

  handleTabClick(item, tab) {
    let { tasks } = this.state
    this.setState({ activeTab: tab.label }, () => {
      const { taskId, isOpen } = item
      const { taskHistoryDetail, tabUniqId } = this.props
      tasks = tasks.map(elem => (elem.taskId.toString() === taskId.toString()
        ? { ...elem, ...{ isOpen } } : { ...elem, ...{ isOpen: false } }))
      const taskIndex = tasks.findIndex(t => t.taskId.toString() === taskId.toString())
      if (taskIndex > -1 && !tasks[taskIndex].taskHistory.length && isOpen) {
        taskHistoryDetail(tabUniqId, taskId)
      }
    })
  }

  handleCaseTabClick(tab) {
    this.setState({ activeCaseTab: tab.label })
  }

  removeCasePopupHandler() {
    const {
      updateTracker:
        {
          caseComments, taskComments, customerDetails, calendarStatus,
          cancelCloseCase, taskComplete, taskCancel
        },
      trackCloseModal, tabUniqId, getNotificationModalDetail
    } = this.props
    let expression = false
    if (caseComments !== undefined) {
      expression = expression || !caseComments
    }
    if (taskComments !== undefined) {
      expression = expression || !taskComments
    }
    if (customerDetails !== undefined) {
      expression = expression || !customerDetails
    }
    if (calendarStatus !== undefined) {
      expression = expression || !calendarStatus
    }
    if (cancelCloseCase !== undefined) {
      expression = expression || !cancelCloseCase
    }
    if (taskComplete !== undefined) {
      expression = expression || !taskComplete
    }
    if (taskCancel !== undefined) {
      expression = expression || !taskCancel
    }
    if (expression) {
      trackCloseModal(tabUniqId, expression)
    } else {
      this.closeHandler()
    }
    if (getNotificationModalDetail('taskWithinCase').isOpen) {
      this.closeNotificationHandler('taskWithinCase')
    }
    if (getNotificationModalDetail('caseCommentNotificationPopup').isOpen) {
      this.closeNotificationHandler('caseCommentNotificationPopup')
    }
  }

  closeNotificationHandler(detailPopType) {
    const {
      removeCaseDetail, tabUniqId,
      removeNotificationPopUpData,
      getNotificationModalDetail
    } = this.props
    const popUpId = getNotificationModalDetail(detailPopType).id
    removeCaseDetail({
      tabId: tabUniqId,
      type: detailPopType,
      id: popUpId
    })
    removeNotificationPopUpData(tabUniqId, detailPopType)
    this.setState({ notificationDataIndex: 0 })
  }

  returnAndSaveHandler() {
    const { trackCloseModal, tabUniqId } = this.props
    trackCloseModal(tabUniqId, false)
  }

  removeCloseModalHandler() {
    const { trackCloseModal, tabUniqId } = this.props
    trackCloseModal(tabUniqId, false)
  }

  closeHandler() {
    const {
      removeCaseDetail, detail: { id }, tabUniqId, removeCaseTaskDetail,
      trackCloseModal
    } = this.props
    this.setState({
      popUpClosed: true
    }, () => {
      trackCloseModal(tabUniqId, false)
      removeCaseDetail({
        tabId: tabUniqId,
        type: 'case-detail',
        id
      })
      removeCaseTaskDetail({ tabId: tabUniqId })
    })
  }

  updateNoificationIndex(data) {
    const {
      detail: { id }, updateCaseDetail, tabUniqId,
      getNotificationModalDetail
    } = this.props
    const { isOpen } = getNotificationModalDetail('taskWithinCase')
    const caseCommentPopUpOpen = getNotificationModalDetail('caseCommentNotificationPopup').isOpen
    if (isOpen) {
      updateCaseDetail({
        values: { index: data.index + 1 },
        id,
        tabId: tabUniqId,
        type: 'taskWithinCase',
        parent: 'modifieable'
      })
    }
    if (caseCommentPopUpOpen) {
      updateCaseDetail({
        values: { index: data.index + 1 },
        id,
        tabId: tabUniqId,
        type: 'caseCommentNotificationPopup',
        parent: 'modifieable'
      })
    }
  }

  updateCaseDetailHandler(item) {
    const {
      detail: { id }, updateCaseDetail, tabUniqId
    } = this.props
    const {
      notificationDragPosition, notificationIndex,
      caseCommentNotificationDragPosition,
      caseCommentNotificationIndex
    } = this.state
    if (item.type === 'case-detail') {
      this.setState({
        ...item
      })
    }
    if (item.type === 'taskWithinCase') {
      this.setState({
        notificationDragPosition: item.dragPosition || notificationDragPosition,
        notificationRel: item.rel,
        notificationIndex: item.index || notificationIndex
      })
    }
    if (item.type === 'caseCommentNotificationPopup') {
      this.setState({
        caseCommentNotificationDragPosition: item.dragPosition
          || caseCommentNotificationDragPosition,
        caseCommentNotificationRel: item.rel,
        caseCommentNotificationIndex: item.index || caseCommentNotificationIndex
      })
    }
    const valuesObj = {}
    if (Object.hasOwnProperty.call(item, 'index')) {
      valuesObj.index = item.index
    }
    if (Object.hasOwnProperty.call(item, 'minimized')) {
      valuesObj.minimized = item.minimized
    }

    if (Object.hasOwnProperty.call(item, 'position')) {
      valuesObj.position = item.position
    }
    if (Object.keys(valuesObj).length) {
      updateCaseDetail({
        values: valuesObj,
        id,
        tabId: tabUniqId,
        type: item.type,
        parent: 'modifieable'
      })
    }
  }

  createdOrUpdateAgent(agentDetail) {
    let taskCreatedBy = 1
    if (agentDetail && Object.keys(agentDetail).includes('name') && Object.keys(agentDetail).includes('id')) {
      if (agentDetail.name.toUpperCase() === 'SYSTEM' && agentDetail.id.toUpperCase() === 'SYSTEM') {
        taskCreatedBy = locale.case[agentDetail.name] || agentDetail.name
      } else {
        taskCreatedBy = `${agentDetail.name} (${agentDetail.id})`
      }
    }
    return taskCreatedBy
  }

  handleCaseSpinner(data) {
    this.setState({
      addCommentStatus: data
    })
  }

  handleSpinner(taskId, data) {
    let { tasks } = this.state
    tasks = tasks.map(elem => (elem.taskId === +taskId
      ? {
        ...elem,
        ...{ spinnerState: data }
      }
      : { ...elem }))
    this.setState({
      tasks
    })
  }

  handleCaseCommentText(id, data) {
    const { newCommentText, saveButtonActive } = data
    if (newCommentText === '') {
      this.setState({
        newCommentRemoved: true
      })
    }
    this.setState({
      caseSaveButtonActive: saveButtonActive,
      caseCommentText: newCommentText
    })
  }

  handleCommentText(taskId, data) {
    const {
      newCommentText,
      textAreaActive,
      saveButtonActive
    } = data
    let { tasks } = this.state
    tasks = tasks.map(elem => (elem.taskId === +taskId
      ? {
        ...elem,
        ...{ newCommentText },
        ...{ textAreaActive },
        ...{ saveButtonActive }
      }
      : { ...elem }))

    this.setState({
      tasks
    })
  }

  handlerAccordionOpen(accordionState) {
    let { tasks } = this.state
    const { taskId, isOpen } = accordionState
    const { taskHistoryDetail, tabUniqId } = this.props
    tasks = tasks.map(elem => (elem.taskId.toString() === taskId.toString()
      ? { ...elem, ...{ isOpen } } : { ...elem, ...{ isOpen: false } }))
    this.setState({
      tasks,
      activeTabTask: taskId,
      activeTab: 'comments'
    })
    const taskIndex = tasks.findIndex(t => t.taskId.toString() === taskId.toString())
    if (taskIndex > -1 && !tasks[taskIndex].taskHistory.length && isOpen) {
      taskHistoryDetail(tabUniqId, taskId)
    }
  }

  // to be removed
  updateCommentTextHandler() {

  }

  rightAlignhandler(val) {
    this.setState({ rightAlignPosition: val })
  }

  formatFields(field) {
    return field.split('-').join('')
  }

  saveCaseData() {
    const {
      sms, cbr, email, allTasks, tasks, caseCompleteCancelItem,
      caseCancelOrComplete
    } = this.state
    const {
      caseModalTaskDetail: { Case, existingData }, agentIdentity,
      currentTabCustomerId, updateCaseFields,
      tabUniqId
    } = this.props
    const itemsToUpdate = []
    const taskToUpdateIds = []

    const filteredStatusChangedTasks = _.filter(tasks, (t) => {
      return (t.statusChangeReason !== '')
    })

    const finalSMS = sms.split('-').join('')
    const finalCBR = cbr.split('-').join('')
    let isSMSValid = true
    let isEmailValid = true
    let isCBRValid = true
    if (finalSMS.length > 0 && finalSMS.length < 10) {
      isSMSValid = false
      this.setState({
        isSMSValid: false
      })
    } else {
      isSMSValid = true
      this.setState({
        isSMSValid: true
      })
    }

    if (finalCBR.length > 0 && finalCBR.length < 10) {
      isCBRValid = false
      this.setState({
        isCBRValid: false
      })
    } else {
      isCBRValid = true
      this.setState({
        isCBRValid: true
      })
    }

    if (email.length) {
      if (!emailRegex.test(email)) {
        isEmailValid = false
        this.setState({
          isEmailValid: false
        })
      }
    }

    const oldValues = {
      sms: existingData.sms,
      cbr: existingData.cbr,
      email: existingData.email
    }

    const updatedValues = {
      sms: finalSMS,
      cbr: finalCBR,
      email
    }

    const updatedFields = getObjectChangedKeys(updatedValues, oldValues)

    const updatedFieldsLength = Object.keys(updatedFields).length

    if (filteredStatusChangedTasks.length && isSMSValid && isCBRValid && isEmailValid) {
      filteredStatusChangedTasks.forEach((task) => {
        taskToUpdateIds.push(task.taskId)
        itemsToUpdate.push({
          type: 'task',
          id: task.taskId,
          payload: {
            event: {
              StandAloneTask: {
                // status: getTaskStatus(task.statusChangeReason),
                status: task.cancelItem !== '' ? 'CANCELLED' : 'COMPLETED',
                status_change_reason: task.statusChangeReason,
                taskId: task.taskId,
                lastUpdatedBy: {
                  id: agentIdentity.employeeId,
                  name: `${agentIdentity.firstName} ${agentIdentity.lastName}`
                },
                accountRef: {
                  accountNumber: +currentTabCustomerId,
                  systemId: ''
                }
              }
            },
            taskType: task.taskType,
            eventType: 'UITaskUpdate',
            externalId: task.externalId,
            systemSourceId: 'CasaUI',
            timeOccurred: ((new Date()).toISOString()),
            traceId: task.interactionId,
            lob: task.lob,
            brand: task.brand
          }
        })
      })
    }

    if (isSMSValid && isCBRValid && isEmailValid && updatedFieldsLength > 0) {
      const mappingObj = {}
      _.each(updatedFields, (value, key) => {
        let data = key
        data = mappingObj[data] || data
        updatedFields[data] = value
      })
      const smsField = _.pick(updatedFields, ['sms'])
      const isSMSFieldBlank = _.isEmpty(smsField)
      const updatedCaseFields = _.omit(updatedFields, ['sms'])
      const finalFields = isSMSFieldBlank
        ? { ...updatedCaseFields } : { ...updatedCaseFields, phoneNumber: this.formatFields(sms) }
      itemsToUpdate.push({
        type: 'case',
        id: Case.caseId,
        payload: {
          traceId: Case.interactionId,
          relatedEntity: [
            {
              tickets: {
                ...finalFields,
                lastUpdatedBy: { id: agentIdentity.employeeId, name: `${agentIdentity.firstName} ${agentIdentity.lastName}` }
              }
            }
          ]
        }
      })

      allTasks.forEach((t) => {
        if ((t.notificationType === 'SMS' || t.notificationType === 'EMAIL')
        && (t.status === 'NOT_STARTED' || t.status === 'IN_PROGRESS')) {
          if (taskToUpdateIds.includes(t.taskId)) {
            const getTaskIndex = itemsToUpdate.findIndex(
              task => task.type === 'task' && task.id === t.taskId
            )
            itemsToUpdate[getTaskIndex].payload.event.StandAloneTask = {
              ...finalFields,
              ...itemsToUpdate[getTaskIndex].payload.event.StandAloneTask
            }
          } else {
            taskToUpdateIds.push(t.taskId)
            itemsToUpdate.push({
              type: 'task',
              id: t.taskId,
              payload: {
                event: {
                  StandAloneTask: {
                    ...finalFields,
                    taskId: t.taskId,
                    lastUpdatedBy: {
                      id: agentIdentity.employeeId,
                      name: `${agentIdentity.firstName} ${agentIdentity.lastName}`
                    },
                    accountRef: {
                      accountNumber: +currentTabCustomerId,
                      systemId: ''
                    }
                  }
                },
                taskType: t.taskType,
                eventType: 'UITaskUpdate',
                externalId: t.externalId,
                systemSourceId: 'CasaUI',
                timeOccurred: (new Date((new Date()).toUTCString()).toISOString()),
                traceId: t.interactionId,
                lob: t.lob,
                brand: t.brand
              }
            })
          }
        }
      })
    }

    // Condition for cancel/complete case
    if (caseCompleteCancelItem !== existingData.caseCompleteCancelItem) {
      allTasks.forEach((t) => {
        if (t.status === 'NOT_STARTED' || t.status === 'IN_PROGRESS') {
          if (taskToUpdateIds.includes(t.taskId)) {
            const index = itemsToUpdate.findIndex(i => (i.type === 'task' && i.id === t.taskId))
            itemsToUpdate[index].payload.event.StandAloneTask.status = 'CANCELLED'
            if (caseCancelOrComplete === 'CANCELLED') {
              itemsToUpdate[index].payload.event.StandAloneTask.status_change_reason = 'Part of Case Cancellation'
              itemsToUpdate[index].payload.event.StandAloneTask.caseStatus = 'CANCELLED'
            } else {
              itemsToUpdate[index].payload.event.StandAloneTask.status_change_reason = 'Part of Case Closure'
              itemsToUpdate[index].payload.event.StandAloneTask.caseStatus = 'CLOSED'
            }
            itemsToUpdate[index].payload.event.StandAloneTask
              .caseResultingOutcome = caseCompleteCancelItem
          } else {
            const itemToUpdate = {
              type: 'task',
              id: t.taskId,
              payload: {
                event: {
                  StandAloneTask: {
                    taskId: t.taskId,
                    lastUpdatedBy: {
                      id: agentIdentity.employeeId,
                      name: `${agentIdentity.firstName} ${agentIdentity.lastName}`
                    },
                    accountRef: {
                      accountNumber: +currentTabCustomerId,
                      systemId: ''
                    }
                  }
                },
                taskType: t.taskType,
                eventType: 'UITaskUpdate',
                externalId: t.externalId,
                systemSourceId: 'CasaUI',
                timeOccurred: (new Date((new Date()).toUTCString()).toISOString()),
                traceId: t.interactionId,
                lob: t.lob,
                brand: t.brand
              }
            }
            itemToUpdate.payload.event.StandAloneTask.status = 'CANCELLED'
            if (caseCancelOrComplete === 'CANCELLED') {
              itemToUpdate.payload.event.StandAloneTask.status_change_reason = 'Part of Case Cancellation'
              itemToUpdate.payload.event.StandAloneTask.caseStatus = 'CANCELLED'
            } else {
              itemToUpdate.payload.event.StandAloneTask.status_change_reason = 'Part of Case Closure'
              itemToUpdate.payload.event.StandAloneTask.caseStatus = 'CLOSED'
            }
            itemToUpdate.payload.event.StandAloneTask
              .caseResultingOutcome = caseCompleteCancelItem
            itemsToUpdate.push(itemToUpdate)
          }
        }
      })
    }
    if (itemsToUpdate.length) {
      updateCaseFields(itemsToUpdate, tabUniqId)
    }
  }

  checkForUpdatedValues() {
    const {
      sms, cbr, email, caseCompleteCancelItem
    } = this.state
    const {
      caseModalTaskDetail: { existingData },
      updateTracker, trackUpdateInFields, tabUniqId
    } = this.props

    const oldValues = {
      sms: (existingData && existingData.sms) || '',
      cbr: (existingData && existingData.cbr) || '',
      email: (existingData && existingData.email) || '',
      caseCompleteCancelItem: existingData && existingData.caseCompleteCancelItem
    }
    const updatedValues = {
      sms: sms && sms.split('-').join(''),
      cbr: cbr && cbr.split('-').join(''),
      email,
      caseCompleteCancelItem
    }
    const updatedFields = getObjectChangedKeys(updatedValues, oldValues)
    const updatedFieldsLength = Object.keys(updatedFields).length
    if (updatedFieldsLength) {
      this.setState({
        saveBtnDisabled: false
      }, () => {
        if (updateTracker.customerDetails !== false) {
          trackUpdateInFields(tabUniqId, 'customerDetails', false)
        }
      })
    } else {
      this.setState({
        saveBtnDisabled: true
      }, () => {
        if (updateTracker.customerDetails !== true) {
          trackUpdateInFields(tabUniqId, 'customerDetails', true)
        }
      })
    }
  }

  editClick() {
    const {
      caseModalTaskDetail: {
        Case: {
          status
        }
      }
    } = this.props
    if (status === 'CLOSED' || status === 'REJECTED' || status === 'CANCELLED') {
      this.setState({
        isEditable: false
      })
    } else {
      this.setState({
        isEditable: true
      })
    }
  }

  cardBlurHandler() {
    this.setState({
      isEditable: false
    })
  }

  alterResultingOutcomeOptionData() {
    let resultingOutcomes = []
    // const { taskDetailsInfo } = this.props
    const { udItemListData, taskUDTypeData } = this.props
    // const { formData } = getCasaAppLocale().task
    const lang = getCurrentLanguage()
    if (
      taskUDTypeData
      && taskUDTypeData.ResultingOutcome
      && taskUDTypeData.ResultingOutcome.length
    ) {
      if (udItemListData
        && udItemListData.completeReason
        && Object.keys(udItemListData.completeReason).length
      ) {
        this.completeReasonText = udItemListData.completeReason[lang]
      }
      resultingOutcomes = taskUDTypeData.ResultingOutcome
        .map(s => ({
          text: Object.keys(this.completeReasonText).length
            ? this.completeReasonText[s.value] : s.value,
          value: s.value
        }))
    }
    this.resultingOutcomes = resultingOutcomes
  }

  alterCancelOptionData() {
    let cancelItems = []
    // let cancelReasonText = []
    // const { taskDetailsInfo } = this.props
    const { taskUDTypeData, udItemListData } = this.props
    // const { formData } = getCasaAppLocale().task
    const lang = getCurrentLanguage()
    if (
      taskUDTypeData
      && taskUDTypeData.CancelReason
      && taskUDTypeData.CancelReason.length
    ) {
      if (udItemListData
        && udItemListData.cancelReason
        && Object.keys(udItemListData.cancelReason).length
      ) {
        this.cancelReasonText = udItemListData.cancelReason[lang]
      }
      cancelItems = taskUDTypeData.CancelReason
        .map(s => ({
          text: Object.keys(this.cancelReasonText).length
            ? this.cancelReasonText[s.value] : s.value,
          value: s.value
        }))
    }
    this.cancelItems = cancelItems
  }

  handleCancelChange(e, item) {
    e.stopPropagation()
    const { tasks } = this.state
    const { taskId } = item
    const modifiedTasks = tasks.map((task) => {
      let _cancelDisplayOption = false
      if (task.taskId === taskId) {
        _cancelDisplayOption = !item.cancelDisplayOption
      } else {
        _cancelDisplayOption = item.cancelDisplayOption
      }
      return {
        ...task,
        ...{ cancelDisplayOption: _cancelDisplayOption },
        ...{ completeDisplayOption: false }
      }
    })
    this.setState({
      tasks: modifiedTasks
    })
  }

  openCalendar(x, y, calendarTime, item) {
    if (parseTaskWithinCase.includes(item.taskType)) {
      return
    }
    const topPosition = this.accordionRef.current.offsetTop
    const { tasks } = this.state
    const { taskId, notificationType, calendar } = item
    let showCalendar = false
    let xPosition = 0
    let yPosition = 0

    if (notificationType) {
      const modiefiedTasks = tasks.map((task) => {
        let showTaskWarning = false
        let taskWarningMessage = ''
        if (task.taskId === taskId) {
          showTaskWarning = true
          taskWarningMessage = `${locale.task.notificationTaskWarning}`
        } else {
          showTaskWarning = task.showWarning
          taskWarningMessage = task.warningMessage
        }

        return {
          ...task,
          ...{ showWarning: showTaskWarning },
          ...{ warningMessage: taskWarningMessage }
        }
      })
      this.setState({
        tasks: modiefiedTasks
      })
    } else if (this.isUnderOrPastDue(calendar.dueDate)) {
      const modiefiedTasks = tasks.map((task) => {
        let showTaskWarning = false
        let taskWarningMessage = ''
        if (task.taskId === taskId) {
          showTaskWarning = true
          taskWarningMessage = task.taskId === taskId ? this.getWarningMessage(calendar.dueDate) : ''
        } else {
          showTaskWarning = task.showWarning
          taskWarningMessage = task.warningMessage
        }
        return {
          ...task,
          ...{ showWarning: showTaskWarning },
          ...{ warningMessage: taskWarningMessage }
        }
      })

      this.setState({
        tasks: modiefiedTasks
      })
    } else {
      const modiefiedTasks = tasks.map((task) => {
        const _savedCalendar = {
          dueDate: item.dueDate,
          dueTime: item.dueTime,
          isBusinessHours: item.isBusinessHours,
          isChanged: false
        }
        if (task.taskId === taskId) {
          showCalendar = true
          xPosition = x
          yPosition = topPosition
        } else {
          showCalendar = false
        }
        return {
          ...task,
          ...{ showCalendar },
          ...{ savedCalendar: _savedCalendar },
          ...{ xPosition },
          ...{ yPosition }
        }
      })
      if (calendarTime) {
        this.setState({
          dueTime: calendarTime.trim()
        })
      }
      this.setState({
        accordionHeight: 'auto',
        tasks: modiefiedTasks
      })
    }
  }

  formatDateTime(date, flag, timezone) {
    if (date && flag) {
      return `${momentTZ(date).tz(TIMEZONE_MAPPING(timezone)).format('ll')}`
    }
    return `${momentTZ(date).tz(TIMEZONE_MAPPING(timezone)).format('ll,')}`
  }

  closeCalendar(item) {
    const { tasks } = this.state
    const { resetCalendar, tabUniqId } = this.props
    let isCalendar = false
    let savedNewCalendar = {}
    const modiefiedTasks = tasks.map((task) => {
      if (task.taskId === item.taskId) {
        isCalendar = false
        savedNewCalendar = {
          dueDate: item.calendar.dueDate,
          dueTime: item.calendar.dueTime,
          isBusinessHours: item.calendar.isBusiness,
          btnEnabled: false
        }
      } else {
        isCalendar = task.showCalendar
        savedNewCalendar = {
          dueDate: task.calendar.dueDate,
          dueTime: task.calendar.dueTime,
          isBusinessHours: task.calendar.isBusinessHours,
          btnEnabled: task.savedCalendar.btnEnabled
        }
      }

      return {
        ...task,
        ...{ responseTimeOutDueDate: false },
        ...{ savedCalendar: savedNewCalendar },
        ...{ showCalendar: isCalendar }
      }
    })
    this.setState({
      tasks: modiefiedTasks,
      accordionHeight: 'auto'
    }, () => {
      resetCalendar(tabUniqId, item.taskId)
    })
  }

  closeCaseCalendar(item) {
    const {
      updateCaseDetailItem,
      tabUniqId,
      caseModalTaskDetail,
      fieldsStatus,
      detail: { id },
      updateCaseDetail
    } = this.props
    const {
      dragPosition, rel, minimized, index, tasks, addCommentStatus, caseCommentText,
      caseSaveButtonActive, sms, email, cbr, isSMSValid, isEmailValid, isCBRValid, saveBtnDisabled,
      EmailTooltip, accordionHeight, caseCompleteCancelItem, caseCancelOrComplete,
      caseUDTypeData, activeTab, activeTabTask, activeCaseTab, allTasks
    } = this.state
    const caseDetail = caseModalTaskDetail.Case
    caseDetail.phoneNumber = sms
    caseDetail.email = email
    caseDetail.cbr = cbr
    caseDetail.EmailTooltip = EmailTooltip
    let _showCalendar = false
    let _updateCalendarStatus
    const modiefiedTasks = tasks.map((task) => {
      if (task.taskId === item.taskId) {
        _showCalendar = false
        _updateCalendarStatus = 'UNINIT'
      } else {
        _showCalendar = task.showCalendar
      }
      return {
        ...task,
        ...{ showCalendar: _showCalendar },
        ...{ updateCalendarStatus: _updateCalendarStatus }
      }
    })
    this.setState({
      tasks: modiefiedTasks
    }, () => {
      updateCaseDetailItem({
        [tabUniqId]: {
          openCaseModel: true,
          addCommentStatus,
          caseCommentText,
          caseSaveButtonActive,
          updateFieldsStatus: fieldsStatus,
          id,
          Case: caseDetail,
          tasks: modiefiedTasks,
          isSMSValid,
          isEmailValid,
          isCBRValid,
          saveBtnDisabled,
          accordionHeight,
          caseCompleteCancelItem,
          caseCancelOrComplete,
          caseCompleteCancelDisplayOption: false,
          caseUDTypeData,
          activeTab,
          activeTabTask,
          activeCaseTab,
          allTasks
        }
      })

      const { current } = this.caseBodyRef || {}
      const { scrollTop } = current || {}
      updateCaseDetail({
        values: {
          dragPosition,
          rel,
          minimized,
          index,
          scrollTop
        },
        id,
        tabId: tabUniqId,
        type: 'case-detail',
        parent: 'modifieable',
        from: 'unmount'
      })
    })
  }

  saveCaseCalendar(item, data) {
    const { tasks } = this.state
    let savedNewCalendar = {}
    const modiefiedTasks = tasks.map((task) => {
      if (task.taskId === item.taskId) {
        savedNewCalendar = {
          isChanged: true,
          dueDate: data.dueDate,
          dueTime: data.dueTime,
          isBusinessHours: data.isBusinessHours,
          btnEnabled: data.btnEnabled,
          errorMessage: data.errorMessage,
          timeErrorMessage: data.timeErrorMessage
        }
      } else {
        savedNewCalendar = {
          isChanged: task.savedCalendar && task.savedCalendar.isChanged,
          dueDate: task.calendar.dueDate,
          dueTime: task.calendar.dueTime,
          isBusinessHours: task.calendar.isBusinessHours,
          btnEnabled: task.savedCalendar && task.savedCalendar.btnEnabled,
          errorMessage: task.savedCalendar && task.savedCalendar.errorMessage,
          timeErrorMessage: task.savedCalendar && task.savedCalendar.timeErrorMessage
        }
      }
      return {
        ...task,
        ...{ savedCalendar: savedNewCalendar }
      }
    })
    this.setState({
      tasks: modiefiedTasks
    })
  }


  convertWarningMessage(msg) {
    const { dueDateDuration } = this.props
    const durationValue = dueDateDuration && dueDateDuration.value
    const durationUnit = durationValue === 1 ? `${locale.task.durationUnit},` : `${locale.task.durationUnit}s,`
    if (msg.includes('Task is past due') || msg.includes('La tâche est en retard,')) {
      return `${locale.task.pastDueDate}`
    }
    if (msg.includes('Task due date is within') || msg.includes('La date d')) {
      return `${locale.task.underDurationDueDateWithin} ${durationValue} ${durationUnit} ${locale.task.underDurationDeferIWS}`
    }
    if (msg.includes('You are unable to') || msg.includes('Vous ne pouvez pas')) {
      return `${locale.task.notificationTaskWarning}`
    }
    return msg
  }

  alterCaseCancelCompleteOptionData() {
    const { taskUDTypeData } = this.props
    const { formData } = getCasaAppLocale().task
    let caseCancelCompleteReasons = []
    if (
      taskUDTypeData
    && taskUDTypeData.CancelReasonCase
    && taskUDTypeData.ResultingOutcomeCase
    ) {
      caseCancelCompleteReasons = [...taskUDTypeData.ResultingOutcomeCase,
        ...taskUDTypeData.CancelReasonCase
      ]
        .map(s => ({
          text: formData.cancel[s.value] || formData.resulting_outcome[s.value],
          value: s.value
        }))
    }
    this.setState({
      caseUDTypeData: caseCancelCompleteReasons
    })
  }

  alterCancelCompleteChangeHandler(value) {
    const {
      sms, email, cbr, EmailTooltip
    } = this.state
    const {
      taskUDTypeData, updateTracker, trackUpdateInFields, caseModalTaskDetail: {
        existingData,
        responseTimeOut,
        Case
      },
      tabUniqId,
      updateCaseModalData,
      updateCaseDetailItem,
      fieldsStatus
    } = this.props
    const caseDetail = Case
    caseDetail.phoneNumber = sms
    caseDetail.email = email
    caseDetail.cbr = cbr
    caseDetail.EmailTooltip = EmailTooltip
    const caseCancelStatus = (taskUDTypeData.CancelReasonCase.some(elem => elem.value === value) ? 'CANCELLED' : '')
    const caseCompleteStatus = (taskUDTypeData.ResultingOutcomeCase.some(elem => elem.value === value) ? 'COMPLETED' : '')
    const {
      addCommentStatus,
      caseCommentText,
      caseSaveButtonActive,
      id,
      tasks,
      isSMSValid,
      isEmailValid,
      isCBRValid,
      saveBtnDisabled,
      accordionHeight,
      caseCancelOrComplete,
      caseUDTypeData,
      activeTab,
      activeTabTask,
      activeCaseTab,
      allTasks
    } = this.state
    this.setState({
      caseCompleteCancelItem: value,
      caseCancelOrComplete: caseCancelStatus || caseCompleteStatus,
      caseCompleteCancelDisplayOption: false
    }, () => {
      this.resetTaskCancelComplete()
      this.checkForUpdatedValues()
      if (existingData.caseCompleteCancelItem !== value) {
        if (updateTracker.cancelCloseCase !== true) {
          trackUpdateInFields(tabUniqId, 'cancelCloseCase', false)
        } else {
          trackUpdateInFields(tabUniqId, 'cancelCloseCase', true)
        }
      }
      updateCaseDetailItem({
        [tabUniqId]: {
          caseCompleteCancelItem: value,
          openCaseModel: true,
          addCommentStatus,
          caseCommentText,
          caseSaveButtonActive,
          updateFieldsStatus: fieldsStatus,
          id,
          Case: caseDetail,
          tasks,
          isSMSValid,
          isEmailValid,
          isCBRValid,
          saveBtnDisabled,
          accordionHeight,
          caseCancelOrComplete,
          caseCompleteCancelDisplayOption: false,
          caseUDTypeData,
          activeTab,
          activeTabTask,
          activeCaseTab,
          allTasks,
          existingData
        }
      })
      if (responseTimeOut) {
        updateCaseModalData({
          [tabUniqId]: {
            responseTimeOut: false
          }
        })
      }
    })
  }

  caseCompleteCancelHandler(e) {
    e.stopPropagation()
    const { caseCompleteCancelDisplayOption } = this.state
    this.setState({ caseCompleteCancelDisplayOption: !caseCompleteCancelDisplayOption })
  }

  caseCompleteCancelHandlerBlur() {
    this.setState({ caseCompleteCancelDisplayOption: false })
  }

  mapTimezone(item) {
    const { calendar } = item
    return {
      dueDate: `${momentTZ(calendar.dueDate).tz(TIMEZONE_MAPPING(item.timezone)).format()}`,
      dueTime: `${momentTZ(calendar.dueDate).tz(TIMEZONE_MAPPING(item.timezone)).format('h:mma')}`,
      isBusinessHours: calendar.isBusinessHours
    }
  }

  goSend(data) {
    const {
      type,
      value,
      slugs,
      text
    } = data
    const {
      tabUniqId,
      agentIdentity,
      banDetails: {
        brand,
        billingAccountName,
        billingAcctNum,
        preferredLanguage
      },
      updateCaseComment: updateComment,
      caseModalTaskDetail: { Case: { interactionId, caseId, lob } }
    } = this.props
    const { email, sms: phoneNumber } = this.state
    if (!isFeatureEnabled('GO_SEND_NOTIFICATION_CASE') && (email || phoneNumber)) {
      const { goSendNotificationTool } = uiConfig.acctThirdPartyUtils
      const url = `${goSendNotificationTool}`
      const agentLanguage = getAgentLanguage()
      const messageObj = {
        characteristic: [{ name: 'caseId', valueType: 'String', value: caseId }],
        phonenumber: phoneNumber,
        customerfullname: billingAccountName,
        emailaddress: email,
        ban: billingAcctNum,
        customerlanguage: preferredLanguage && preferredLanguage.toLowerCase() === 'french' ? 'FR' : 'EN',
        lob,
        topic: DEFAULT_MSG_TOPIC,
        brand: brand && brand.toLowerCase() === 'koodo' ? 3 : 1,
        agentlanguage: agentLanguage.toUpperCase(),
        notificationtype: type
      }
      openWindowWithPost(url, messageObj)
      const body = {
        traceId: interactionId,
        relatedEntity: [
          {
            tickets: {
              caseComments: JSON.stringify({ slugs, text }),
              lastUpdatedBy: { id: agentIdentity.employeeId, name: `${agentIdentity.firstName} ${agentIdentity.lastName}` }
            }
          }
        ]
      }
      updateComment(body, tabUniqId, caseId)
    }
    if (isFeatureEnabled('GO_SEND_NOTIFICATION_CASE') && value) {
      const { goSendTool } = uiConfig.acctThirdPartyUtils
      const url = `${goSendTool}${value}`
      window.open(url, 'goSend')
      const body = {
        traceId: interactionId,
        relatedEntity: [
          {
            tickets: {
              caseComments: JSON.stringify({ slugs, text }),
              lastUpdatedBy: { id: agentIdentity.employeeId, name: `${agentIdentity.firstName} ${agentIdentity.lastName}` }
            }
          }
        ]
      }
      updateComment(body, tabUniqId, caseId)
    }
  }

  alterCancelOptionHandler(value, item) {
    const { tasks } = this.state
    const { trackUpdateInFields, tabUniqId } = this.props
    const { taskId } = item
    const modifiedTasks = tasks.map((task) => {
      let _outcomeItem = ''
      let _statusChangeReason = ''
      let _cancelItem = ''
      let _cancelDisplayOption = false

      if (task.taskId === taskId) {
        _outcomeItem = ''
        _statusChangeReason = value
        _cancelItem = value
        _cancelDisplayOption = false
      } else {
        _outcomeItem = task.outcomeItem
        _statusChangeReason = task.statusChangeReason
        _cancelItem = task.cancelItem
        _cancelDisplayOption = task.cancelDisplayOption
      }
      return {
        ...task,
        ...{ outcomeItem: _outcomeItem },
        ...{ statusChangeReason: _statusChangeReason },
        ...{ cancelItem: _cancelItem },
        ...{ cancelDisplayOption: _cancelDisplayOption }
      }
    })
    this.setState({
      tasks: modifiedTasks,
      saveBtnDisabled: false
    }, () => {
      trackUpdateInFields(tabUniqId, 'taskCancel', false)
    })
  }

  resetTaskCancelComplete() {
    const { tasks } = this.state
    const { trackUpdateInFields, tabUniqId } = this.props
    const modifiedTasks = tasks.map((task) => {
      return {
        ...task,
        ...{ outcomeItem: '' },
        ...{ statusChangeReason: '' },
        ...{ cancelItem: '' },
        ...{ cancelDisplayOption: false },
        ...{ completeDisplayOption: false }
      }
    })
    this.setState({
      tasks: modifiedTasks,
      saveBtnDisabled: false
    }, () => {
      trackUpdateInFields(tabUniqId, 'taskCancel', false)
    })
  }

  render() {
    locale = getCasaAppLocale()
    const { formData } = getCasaAppLocale().task
    const currentLocaleLang = momentTZ.locale()
    const {
      detail, banDetails, agentIdentity,
      updateTaskComment, updateCommentStatus,
      updateCaseComment, updateCaseCommentStatus,
      caseModalTaskDetail: {
        Case: {
          caseId, status, customerReq, serviceFlow, lob, comments, interactionId, ticketType,
          timezone
        },
        taskUpdateCommentStatus,
        taskUpdateDueDateStatus
      },
      tabIdDetail,
      updateTracker,
      trackUpdateInFields,
      closeModalStatus,
      saveCalendar,
      caseModalTaskDetail: {
        fetchTasksStatus,
        caseHistoryStatus,
        caseHistory,
        responseTimeOut,
        updateFieldsStatus,
        historyTimeOut,
        timeout,
        Case,
        responseTimeOutCaseComment
      },
      detail: {
        id
      },
      rtsCloseModalStatus,
      taskHistoryDetail,
      addCaseHistoryDetail,
      fetchTasksUnderCase,
      tabUniqId,
      udItemListData,
      getNotificationModalDetail,
      getNotificationInfo,
      authData: { applicationPolicies, employeeRoles }
    } = this.props
    const {
      dragPosition, minimized, index, rel, activeTab, activeCaseTab, sms, email, cbr,
      caseCommentText, addCommentStatus, caseSaveButtonActive, rightAlignPosition,
      isSMSValid, isCBRValid, isEmailValid, saveBtnDisabled, fieldsStatus, tasks, repairLink,
      smartRepairDashboardLink, ticketNumber, isEditable, dueTime, accordionHeight,
      EmailTooltip, caseCompleteCancelItem, caseCancelOrComplete, caseCompleteCancelDisplayOption,
      caseUDTypeData, activeTabTask, isRTSPopUpOpen, notificationDragPosition, notificationRel,
      notificationIndex, notificationDataIndex, caseCommentNotificationDragPosition,
      caseCommentNotificationRel, caseCommentNotificationIndex
    } = this.state
    const {
      isOpen, dimensions, modifieable, highestZindex, type, highestPosition,
      isDraggable
    } = detail
    const {
      brand,
      billingAccountName,
      billingAcctNum
    } = banDetails
    const caseStatus = status
    const isAuthorizeCaseUpdate = isAuthorized(agentPolicy.CASE_UPDATE,
      applicationPolicies, employeeRoles)
    const showCloseIconMethod = () => {
      return !(fieldsStatus === 'PENDING' || taskUpdateCommentStatus === 'PENDING'
      || taskUpdateDueDateStatus === 'PENDING' || addCommentStatus === 'PENDING')
    }
    this.tabs = [
      {
        id: 'task_detail_modal_detail_tab_',
        template: <Text>{locale.task.taskTabs.comments}</Text>,
        label: 'comments'
      },
      {
        id: 'task_detail_modal_history_tab_',
        template: <Text>{locale.task.taskTabs.history}</Text>,
        label: 'history'
      }
    ]
    this.caseTabs = [
      {
        id: 'case_detail_modal_detail_tab',
        template: <Text>{locale.case.caseTabs.comments}</Text>,
        label: 'comments'
      },
      {
        id: 'case_detail_modal_history_tab',
        template: <Text>{locale.case.caseTabs.history}</Text>,
        label: 'history'
      }
    ]

    const headerContent = (
      <EllipsesText>
        <Text bold>
          <GreenBox caseStatus={caseStatus} minimized={minimized}>
            {getTranslatedCaseStatus(caseStatus)}
          </GreenBox>
          <LightWeightText>
            {minimized ? ` C# ${caseId}: ` : ` ${locale.case.caseNumber} ${caseId}: `}
          </LightWeightText>
          &nbsp;
          {`${locale.case[customerReq] || customerReq} (${locale.case[serviceFlow] || serviceFlow})`}
        </Text>
      </EllipsesText>
    )

    const getNotificationHeaderContent = (popUpType) => {
      const headerContentBody = getNotificationInfo(popUpType).notificationStatus === 'PENDING'
        ? <Skeleton type="text" lines={1} characters={10} />
        : (
          <>
            <BoldWeightText>
              {`${locale.case.caseNumber} ${caseId}: `}
            </BoldWeightText>
            &nbsp;
            {getNotificationInfo(popUpType)
              && getNotificationInfo(popUpType).notificationData
              && getNotificationInfo(popUpType).notificationData[notificationDataIndex]
              && (
                <LightWeightText>
                  {momentTZ(
                    getNotificationInfo(popUpType).notificationData[notificationDataIndex]?.sendTime
                  ).tz('Etc/GMT').format('ll')}
                  &nbsp;&nbsp;
                  {getNotificationInfo(popUpType).notificationData[notificationDataIndex]?.messageType === 'Email'
                    ? locale.case.notificationPopUp.email
                    : locale.case.notificationPopUp.SMS
                  }
                </LightWeightText>
              )
            }
          </>
        )
      return headerContentBody
    }

    const footerColWidth = {
      error: currentLocaleLang === 'fr' ? 9 : 5,
      completeBtn: currentLocaleLang === 'fr' ? 2 : 6
    }

    let bottom = responseTimeOut ? '65px' : '52px'
    if (caseCompleteCancelItem !== '') {
      if (window.screen.width <= 1280 && currentLocaleLang === 'fr') {
        bottom = '67px'
      } else {
        bottom = '65px'
      }
    }
    const footerContent = !minimized && !caseClosingStatus.includes(caseStatus.toUpperCase()) && (
      <FeatureToggle policyResourceId={agentPolicy.CASE_UPDATE}>
        <FooterContent minimized={minimized}>
          <HairlineDivider />
          <FooterContentInner currentLang={currentLocaleLang} minimized={minimized}>
            <FlexGrid gutter={false}>
              <FlexGrid.Row vertical Align="middle" distribute="between">
                <FlexGrid.Col
                  md={responseTimeOut ? footerColWidth.completeBtn : 2}
                  lg={responseTimeOut ? footerColWidth.completeBtn : 2}
                >
                  {!caseDetailParseFlow.includes(ticketType) && (
                  <DropdownWrapper
                    id={`case-detail-complete-btn-${caseId}`}
                    onBlur={this.caseCompleteCancelHandlerBlur}
                    role="button"
                    tabIndex={0}
                    onFocus={() => {}}
                    disabled={caseDetailParseFlow.includes(ticketType)}
                  >

                    <CustomDropDown
                      onHandleChange={e => this.caseCompleteCancelHandler(e,
                        caseCompleteCancelDisplayOption)}
                      item={caseCompleteCancelItem}
                      alterOption={this.alterCancelCompleteChangeHandler}
                      displayOption={caseCompleteCancelDisplayOption}
                      items={caseUDTypeData || []}
                      defaultPlaceHolderValue={locale.case.buttons.completeCase}
                      selectedText={formData.cancel[caseCompleteCancelItem]
                    || formData.resulting_outcome[caseCompleteCancelItem]}
                      customCss={{
                        OptionWrapper: {
                          bottom
                        },
                        width: currentLocaleLang === 'fr' ? '190' : '165'
                      }}
                      id="case-complete-id"
                      caseCancelOrComplete={caseCancelOrComplete}
                      toolTipEnable={true}
                      key={`case_complete_${caseId}`}
                      disabled={caseStatus === 'CANCELLED' || caseStatus === 'CLOSED' || caseDetailParseFlow.includes(ticketType)}
                    />
                  </DropdownWrapper>
                  )}
                </FlexGrid.Col>
                <FlexGrid.Col
                  md={responseTimeOut ? footerColWidth.error : 8}
                  lg={responseTimeOut ? footerColWidth.error : 8}
                  horizontalAlign="right"
                >
                  {
              (!isRTSPopUpOpen && caseCompleteCancelItem !== '') && !responseTimeOut && (
              <ErrorWraper currentLang={currentLocaleLang}>
                <ErrorContent>
                  <Notification variant="warning" copy="en">
                    <Text>{locale.case.caseCompleteCancelWarning}</Text>
                  </Notification>
                </ErrorContent>
              </ErrorWraper>
              )
            }
                  {
              responseTimeOut && updateFieldsStatus === 'ERROR' && (
              <ErrorWraperRetry currentLang={currentLocaleLang}>
                <ErrorContentText localLanng={currentLocaleLang}>
                  <Notification variant="error" copy="en">
                    <Text>{locale.case.caseTimeOut}</Text>
                  </Notification>
                </ErrorContentText>
              </ErrorWraperRetry>
              )
            }
                </FlexGrid.Col>
                <FlexGrid.Col md={(responseTimeOut && currentLocaleLang === 'fr') ? 3 : 1} lg={(responseTimeOut && currentLocaleLang === 'fr') ? 3 : 1} horizontalAlign="right">
                  <Spinner
                    spinning={fieldsStatus === 'PENDING'}
                    size="small"
                    label={locale.case.fieldsUpdateSpinnerMsg}
                    inline
                  >
                    <SaveButton
                      id={`case-detail-save-btn-${caseId}`}
                      onClick={(isRTSPopUpOpen && caseCompleteCancelItem !== '')
                        ? this.openRTSModalHandler
                        : this.saveCaseData
                  }
                      disabled={saveBtnDisabled}
                    >
                      {responseTimeOut ? locale.case.buttons.retry : locale.case.buttons.save}
                    </SaveButton>
                  </Spinner>
                </FlexGrid.Col>
              </FlexGrid.Row>
            </FlexGrid>
          </FooterContentInner>
        </FooterContent>
      </FeatureToggle>
    )
    let noTaskAvailableBody = <></>
    if (!minimized) {
      if (fetchTasksStatus === 'SUCCESS') {
        noTaskAvailableBody = (
          <NoTaskBody>
            {locale.case.taskList.notaks}
          </NoTaskBody>
        )
      } else if (fetchTasksStatus === 'ERROR' && timeout) {
        noTaskAvailableBody = (
          <RetryContainer>
            <Notification variant="warning" copy="en">
              <FetchFailedText>{locale.task.tasksFetchTimeout}</FetchFailedText>
              {' '}
              {
                currentLocaleLang !== 'fr' ? (
                  <FetchFailedText>
                    {locale.task.please}
                    {' '}
                  </FetchFailedText>
                ) : null
              }

              <TryAgainLink
                id="case-task-list"
                onClick={
              () => fetchTasksUnderCase({
                [tabUniqId]: {
                  Case,
                  id
                }
              })
              }
              >
                {locale.task.tryAgain}
              </TryAgainLink>
              <FetchFailedText>.</FetchFailedText>
            </Notification>
          </RetryContainer>
        )
      } else {
        noTaskAvailableBody = (
          <AlignCenter>
            <Spinner
              spinning
              label={locale.task.loadingTaskDetailsMsg}
            />
          </AlignCenter>
        )
      }
    }

    const taskHistoryBodyFunction = (taskItem) => {
      const {
        taskHistoryStatus,
        taskHistory,
        createdBy,
        taskId
      } = taskItem
      let taskHistoryBody = <></>
      if (taskHistoryStatus === 'PENDING' || taskHistoryStatus === 'UNINT') {
        taskHistoryBody = (
          <AlignCenter>
            <Spinner
              id="task_detail_modal_history_tab_spinner" spinning
              label={`${locale.task.spinnerMsg.loadingTaskHistory}...`}
            />
          </AlignCenter>
        )
      } else if (taskHistoryStatus === 'ERROR' && taskItem.responseTimeOut) {
        taskHistoryBody = (
          <RetryContainer>
            <Notification variant="warning" copy="en">
              <FetchFailedText>{locale.task.historyFetchTimeout}</FetchFailedText>
              {' '}
              {
                currentLocaleLang !== 'fr' ? (
                  <FetchFailedText>
                    {locale.task.please}
                    {' '}
                  </FetchFailedText>
                ) : null
              }

              <TryAgainLink
                id="case-task-history-trail"
                onClick={
              () => taskHistoryDetail(tabUniqId, taskId)
              }
              >
                {locale.task.tryAgain}
              </TryAgainLink>
              <FetchFailedText>.</FetchFailedText>
            </Notification>
          </RetryContainer>
        )
      } else {
        let taskHistoryData = []
        let taskCreationData = null
        if (taskHistory
        && taskHistory.length
        && taskHistory[0].getTaskSummary) {
          if (taskHistory[0].getTaskSummary.taskHistory
          && taskHistory[0].getTaskSummary.taskHistory.length) {
            taskHistoryData = taskHistory[0].getTaskSummary.taskHistory
          }
          taskHistoryData = taskHistoryData.filter(item => (
            !taskDetailsHiddenFields.includes(item.fieldName)))
          if (taskHistory[0].getTaskSummary.taskDetail) {
            taskCreationData = taskHistory[0].getTaskSummary.taskDetail
          }
        }
        const coreStyle = {
          colStyleDate: 5,
          colStyleBody: 7,
          padding: '1.5rem 0rem 0rem 0.5rem',
          minHeight: '15vh',
          maxHeight: '37vh',
          scroll: true
        }
        taskHistoryBody = (
          <TaskHistory
            historyId="taskCaseDetail_"
            taskHistoryData={taskHistoryData}
            taskCreationData={taskCreationData}
            createdBy={createdBy}
            coreStyle={coreStyle}
            timezone={taskItem.timezone || 'MT'}
            udItemListData={udItemListData}
          />
        )
      }
      return taskHistoryBody
    }
    const caseHistoryBodyFunction = (casesHistory, casesHistoryStatus) => {
      let taskHistoryBody = <></>
      let caseCreatedBy = null
      if (casesHistoryStatus === 'PENDING' || casesHistoryStatus === 'UNINT') {
        taskHistoryBody = (
          <AlignCenter>
            <Spinner
              id="case_detail_modal_history_tab_spinner" spinning
              label={`${locale.task.spinnerMsg.loadingTaskHistory}...`}
            />
          </AlignCenter>
        )
      } else if (casesHistoryStatus === 'ERROR' && historyTimeOut) {
        taskHistoryBody = (
          <RetryContainer>
            <Notification variant="warning" copy="en">
              <FetchFailedText>{locale.task.historyFetchTimeout}</FetchFailedText>
              {' '}
              {
                currentLocaleLang !== 'fr' ? (
                  <FetchFailedText>
                    {locale.task.please}
                    {' '}
                  </FetchFailedText>
                ) : null
              }
              <TryAgainLink
                id="case-history-trail"
                onClick={
              () => addCaseHistoryDetail(caseId, tabUniqId)
              }
              >
                {locale.task.tryAgain}
              </TryAgainLink>
              <FetchFailedText>.</FetchFailedText>
            </Notification>
          </RetryContainer>
        )
      } else {
        let taskHistoryData = []
        let taskCreationData = null
        if (casesHistory
        && casesHistory.caseHistory) {
          taskHistoryData = casesHistory.caseHistory
          const resultingOutcome = taskHistoryData.find(item => (
            item.fieldName === 'resultingOutcome'))
          if (resultingOutcome) {
            taskHistoryData.map((data, i) => {
              if (data.fieldName === 'caseStatus') {
                taskHistoryData[i].statusChangeReason = resultingOutcome.newValue
              }
              return null
            })
          }
          taskHistoryData = taskHistoryData.filter(item => (
            !taskDetailsHiddenFields.includes(item.fieldName)))
          if (casesHistory.caseDetail) {
            taskCreationData = casesHistory.caseDetail
            caseCreatedBy = casesHistory.caseDetail.createdBy
          }
        }
        const coreStyle = {
          colStyleDate: 4,
          colStyleBody: 8,
          padding: '2rem 0rem 0rem 0.5rem',
          minHeight: '15vh',
          maxHeight: '37vh',
          scroll: true
        }
        taskHistoryBody = (
          <TaskHistory
            historyId="caseDetail_"
            taskHistoryData={taskHistoryData}
            taskCreationData={taskCreationData}
            createdBy={caseCreatedBy}
            coreStyle={coreStyle}
            timezone={timezone || 'MT'}
            udItemListData={udItemListData}
          />
        )
      }
      return taskHistoryBody
    }

    const caseTaskMetaData = {}
    const isInputDisabled = !isAuthorizeCaseUpdate || caseStatus === 'CLOSED' || caseStatus === 'REJECTED' || caseStatus === 'CANCELLED'
    const isGoSendDisabled = caseStatus === 'CLOSED' || caseStatus === 'CANCELLED'
    const { nameTooltip } = this.state
    const caseBodyContent = !minimized && (
      <CaseBody
        ref={this.caseBodyRef}
        dimensions={dimensions}
        minimized={minimized}
      >
        <GridContainer>
          <CardSection>
            <ContactCard>
              <CaseContainer height={(brand === 'koodo') ? '32px' : '28px'}>
                { brand === 'koodo' ? <Koodo /> : <Telus /> }
                <LobBody>{locale.case[lob]}</LobBody>
                {smartRepairDashboardLink ? (
                  <CustomerDetailRow>
                    <SymbolColumn>
                      <MediumWeightText paddingRight="8px">
                        {`${locale.case.ticketID}`}
                      </MediumWeightText>
                      <HyperLink onClick={() => window.open(smartRepairDashboardLink + ticketNumber, '_blank')}>
                        {' RTS '}
                        {ticketNumber}
                      </HyperLink>
                    </SymbolColumn>
                  </CustomerDetailRow>
                ) : null}

                {repairLink
                  ? (
                    <CustomerDetailRow>
                      <SymbolColumn>
                        <MediumWeightText paddingRight="8px">
                          {`${locale.case.repairOption}`}
                        </MediumWeightText>
                        <HyperLink
                          onClick={() => window.open(repairLink, '_blank')}
                        >
                          {`${locale.case.clickToView}`}
                        </HyperLink>
                      </SymbolColumn>
                    </CustomerDetailRow>
                  )
                  : null}
              </CaseContainer>
              <CaseCustomerDetail>
                <CustomerDetailRow>
                  <SymbolColumn width="80%">
                    <TooltipWrapper text={billingAccountName} variant="vertical" toolTipBodyVisible={nameTooltip}>
                      <NameLabel
                        ref={this.nameLabelRef} onMouseOver={this.onMouseOver}
                        onFocus={this.onMouseOver}
                      >
                        {billingAccountName}
                      </NameLabel>
                    </TooltipWrapper>
                  </SymbolColumn>
                  <FeatureToggle policyResourceId={agentPolicy.CASE_UPDATE}>
                    <DetailsColumn isEdit={true} disabled={isInputDisabled} editable={isEditable}>
                      <button
                        id="link_button"
                        type="button"
                        ref={this.linkRef}
                        onClick={this.editClick}
                        onBlur={this.cardBlurHandler}
                      >
                        <Edit />
                      </button>
                    </DetailsColumn>
                  </FeatureToggle>
                </CustomerDetailRow>
                <CustomerDetailRow>
                  <SymbolColumn>
                    <MediumWeightText>
                      {`${locale.case.billingAccNumtxt}: `}
                    </MediumWeightText>
                    &nbsp;&nbsp;
                    <RegularWeightText>
                      {billingAcctNum}
                    </RegularWeightText>
                  </SymbolColumn>
                </CustomerDetailRow>
                <CustomerDetailRow>
                  <DetailsColumn isEdit={false}>
                    {
                      /* tool is taking only mob phone number as of now
                      * even in case of email need to trigger goSend with phone number
                      */
                      lob.toLowerCase() === 'mobility' && sms.length && isAuthorizeCaseUpdate && !isGoSendDisabled ? (
                        <TooltipWrapper
                          text={locale.case.toolTips.clickToSendSMS}
                          variant="vertical"
                          toolTipBodyVisible
                        >
                          <CasaIconButton
                            onClick={() => this.goSend({
                              type: 'sms',
                              value: sms,
                              slugs: 'smsInitiated',
                              text: 'smsInitiated'
                            })}
                            a11yText="SMS"
                            id={`goSend_email_${sms}`}
                          >
                            <SmsInverted />
                          </CasaIconButton>
                        </TooltipWrapper>
                      )
                        : <Chat1 variant="default" copy="en" />
                    }
                  </DetailsColumn>
                  <MessageIconColumn>
                    <MediumWeightText>
                      {`${locale.case.sms}:`}
                    </MediumWeightText>
                    <ClickToCopy text={sms}>
                      <Editable
                        id="smsInput"
                        key={`case_contact_sms_${caseId}`}
                        type="sms"
                        maxLength="12"
                        onChange={e => this.onSMSChange(e)}
                        value={sms}
                        valid={isSMSValid}
                        disabled={isInputDisabled}
                        isEditable={isEditable}
                      />
                    </ClickToCopy>
                  </MessageIconColumn>
                </CustomerDetailRow>
                <CustomerDetailRow>
                  <DetailsColumn isEdit={false}>
                    {
                      /* tool is taking only mob phone number as of now
                      * even in case of email need to trigger goSend with phone number
                      */
                      lob.toLowerCase() === 'mobility' && sms.length && email.length && isAuthorizeCaseUpdate && !isGoSendDisabled ? (
                        <TooltipWrapper
                          text={locale.case.toolTips.clickToSendEmail}
                          variant="vertical"
                          toolTipBodyVisible
                        >
                          <CasaIconButton
                            onClick={() => this.goSend({
                              type: 'email',
                              value: sms,
                              slugs: 'emailInitiated',
                              text: 'emailInitiated'
                            })}
                            a11yText="SMS"
                            id={`goSend_email_${email}`}
                          >
                            <EmailInverted />
                          </CasaIconButton>
                        </TooltipWrapper>
                      )
                        : <Email size="16" variant="default" />
                    }
                  </DetailsColumn>

                  <MessageIconColumn>
                    <TooltipWrapper text={email} variant="vertical" toolTipBodyVisible={EmailTooltip || false}>
                      <ClickToCopy text={email} isInvisible={updateTracker.email} top={-6}>
                        <Editable
                          id="emailInput"
                          key={`case_contact_email_${caseId}`}
                          type="email"
                          maxLength="100"
                          onChange={(data, tooltipFlag) => {
                            this.onEmailChange(data, tooltipFlag)
                          }}
                          width="100"
                          minWidth="100"
                          value={email}
                          valid={isEmailValid}
                          disabled={isInputDisabled}
                          isEditable={isEditable}
                        />
                      </ClickToCopy>
                    </TooltipWrapper>
                  </MessageIconColumn>
                </CustomerDetailRow>
                <CustomerDetailRow>
                  <DetailsColumn isEdit={false}>
                    <PhoneHome size="16" variant="default" />
                  </DetailsColumn>
                  <SymbolColumn>
                    <MediumWeightText>
                      {`${locale.case.cbr}:`}
                    </MediumWeightText>
                    <ClickToCopy text={cbr}>
                      <Editable
                        id="cbrInput"
                        key={`case_contact_cbr_${caseId}`}
                        type="cbr"
                        maxLength="12"
                        onChange={this.onCBRChange}
                        value={cbr}
                        valid={isCBRValid}
                        disabled={isInputDisabled}
                        isEditable={isEditable}
                      />
                    </ClickToCopy>
                  </SymbolColumn>
                </CustomerDetailRow>
              </CaseCustomerDetail>
            </ContactCard>
          </CardSection>
          <CaseSection>
            {tasks && tasks.length ? (
              <Accordion
                handlerAccordionOpen={this.handlerAccordionOpen}
                accordionHeight={accordionHeight}
                listRef={this.listRef}
                isRTSPopUpOpen={isRTSPopUpOpen}
              >
                {
                      tasks.map((item) => {
                        const taskMetaData = {
                          request: item.requestTypeText,
                          type: item.subTypeText,
                          brand: item.brand,
                          lob: item.lob,
                          interactionId: item.interactionId,
                          externalId: item.externalId
                        }
                        const customDropdownCss = {
                          OptionWrapper: {
                            bottom: '34px'
                          }
                        }
                        let dueDate = (item.status === 'COMPLETED' || item.status === 'CANCELLED') ? item.completionDate : (item.taskDueDate || item.followUpDate)
                        if (parseTaskWithinCase.includes(item.taskType)) {
                          dueDate = (item.status === 'COMPLETED' || item.status === 'CANCELLED') ? item.completionDate : (item.followUpDate)
                        }
                        const dueDateValue = dueDate ? `${momentTZ(dueDate).tz(TIMEZONE_MAPPING(item.timezone)).format('ll')}` : ''
                        const accordionHeader = (
                          <AccorordionInnerWrapper status={item.status}>
                            <Icon>
                              { item.isOpen ? <Caret dir="down" /> : <Caret dir="up" /> }
                            </Icon>
                            <AccordionCol2 className={item.status} id="accordion_row_status">
                              {getTranslatedAsscTaskStatus(item.status)}
                            </AccordionCol2>
                            <AccordionCol3 id="accordion_row_taskid">
                              <LightWeightText>
                                {`${locale.case.taskNumber} ${item.taskId}: `}
                                &nbsp;
                              </LightWeightText>
                              <MediumWeightText>
                                {item.taskName ? locale.case[item.taskName] : ''}
                              </MediumWeightText>
                            </AccordionCol3>
                            <AccordionCol4 id="accordion_row_due_date">
                              <LightWeightText>
                                {`${!accordingToolTipMapper.includes(item.status) ? `${locale.case.due}: ` : ''}`}
                                &nbsp;
                                {accordingToolTipMapper.includes(item.status) ? (
                                  <Tooltip text={captalizeFirstCharacter(item.status)} variant="vertical">
                                    {dueDateValue}
                                  </Tooltip>
                                ) : dueDateValue}
                              </LightWeightText>
                            </AccordionCol4>
                          </AccorordionInnerWrapper>
                        )
                        let notificationLink = 'notificationType' in item
                        let nLk = ''
                        if (isFeatureEnabled('GENERATE_NOTIFICATION_LINK') || this.isECPV1MessageId(item.ecpMessageId)) {
                          nLk = getNotificationslLink(billingAcctNum,
                            brand, lob, tabUniqId)
                        }
                        if (notificationLink) {
                          if (item.status === 'COMPLETED') {
                            if (!item.ecpMessageId || item.ecpMessageId === '') {
                              notificationLink = ''
                            } else if (this.isECPV1MessageId(item.ecpMessageId)) {
                              notificationLink = (
                                <NotificationURL
                                  href={nLk}
                                  rel="noopener noreferrer" target="_blank"
                                >
                                  {locale.case.clickToView}
                                </NotificationURL>
                              )
                            } else {
                              notificationLink = (
                                <>
                                  <EnvToggle feature="OLD_AUTO_NOTIFICATION_LINK">
                                    <NotificationURL
                                      href={nLk}
                                      rel="noopener noreferrer" target="_blank"
                                    >
                                      {locale.case.clickToView}
                                    </NotificationURL>
                                  </EnvToggle>
                                  <EnvToggle feature="AUTO_NOTIFICATION_LINK">
                                    <Link
                                      id={`notification-link-${caseId}`}
                                      onClick={() => {
                                        this.handleClick(caseId, item.ecpMessageId, 'taskWithinCase')
                                      }}
                                    >
                                      {locale.case.clickToView}
                                    </Link>
                                  </EnvToggle>
                                </>
                              )
                            }
                          } else if (item.status === 'CANCELLED') {
                            notificationLink = locale.task.cancelled
                          } else {
                            notificationLink = locale.task.filter.pending
                          }
                        }
                        return (
                          <AccordionOuterHeader
                            label={item.taskId.toString()}
                            key={item.taskId}
                            header={accordionHeader}
                            taskStatus={item.status}
                            caseCompleteCancelItem={caseCompleteCancelItem}
                            isOpen={item.isOpen || false}
                          >
                            <AccorordionTaskData id="tst">
                              <TaskDataWrapper ref={this.accordionRef}>
                                <FlexGrid gutter={false}>
                                  <FlexGrid.Row>
                                    <FlexGrid.Col xl={6} md={6}>
                                      {(item.status === 'COMPLETED' || item.status === 'CANCELLED') ? null
                                        : (
                                          <Box>
                                            <DueDateTimeContentContainer>
                                              <DueDateTimeLabel id="accordion_data_due_date">
                                                <Strong>{`${locale.case.due}: `}</Strong>
                                              </DueDateTimeLabel>
                                              <DueDateTimeContent>
                                                <DateTimeLabelContainer
                                                  warning={item.showWarning}
                                                  disabled={parseTaskWithinCase
                                                    .includes(item.taskType)}
                                                >
                                                  <Text
                                                    size="small"
                                                    id="accordion_data_due_date_value"
                                                    onClick={isAuthorizeCaseUpdate
                                                      ? (ev) => {
                                                        this.openCalendar(ev.clientX, ev.clientY,
                                                          momentTZ(item.calendar.dueDate).tz(TIMEZONE_MAPPING(item.timezone)).format('hh:mma'), item)
                                                      } : null
                                                  }
                                                  >
                                                    {this.formatDateTime(
                                                      dueDate,
                                                      item.showWarning,
                                                      item.timezone
                                                    )
                                                    }
                                                  </Text>
                                                &nbsp;
                                                  <Text
                                                    size="small"
                                                    id="accordion_data_due_time_value"
                                                    onClick={isAuthorizeCaseUpdate
                                                      ? (ev) => {
                                                        this.openCalendar(ev.clientX, ev.clientY,
                                                          momentTZ(item.calendar.dueDate).tz(TIMEZONE_MAPPING(item.timezone)).format('hh:mma'), item)
                                                      } : null
                                                  }
                                                  >
                                                    {dueDate ? `
                      ${momentTZ(dueDate).tz(TIMEZONE_MAPPING(item.timezone)).format('h:mma')}` : ''}
                                                  </Text>
                                                </DateTimeLabelContainer>
                                                <Text>
                                                  <TimeZoneWrapper>
                                                    {item.timezone || 'MT'}
                                                  </TimeZoneWrapper>
                                                </Text>
                                              </DueDateTimeContent>
                                              <BusinessHoursContent>
                                                {String(item.scheduledBusinessHours).toLowerCase() === 'true'
                                                  ? (
                                                    <TooltipWrapper
                                                      text={locale.task.toolTipsLabel
                                                        .scheduledBusinessHours} variant="vertical" toolTipBodyVisible={true}
                                                    >
                                                      <TimeWrapper id="accordion_data_scheduledBusinessHours"><Time size={16} /></TimeWrapper>
                                                    </TooltipWrapper>
                                                  )
                                                  : null}
                                              </BusinessHoursContent>
                                            </DueDateTimeContentContainer>

                                            {
                                              item.showCalendar
                                                ? (
                                                  <DueDateModal
                                                    xValue={item.xPosition}
                                                    yValue={item.yPosition}
                                                    ref={this.calendarRef}
                                                  >
                                                    <CalendarModal
                                                      listRef={this.listRef}
                                                      calendarClose={this.closeCalendar}
                                                      dueDate={momentTZ().format('L')}
                                                      dueTime={dueTime}
                                                      saveDueDate={this.saveDueDate}
                                                      saveCaseCalendar={this.saveCaseCalendar}
                                                      closeCaseCalendar={this.closeCaseCalendar}
                                                      changeDueDateStatus={this.changeDueDateStatus}
                                                      dueDateStatus={true}
                                                      sourceOpen="caseDetailModal"
                                                      checkboxName="caseDetail"
                                                      calendar={this.mapTimezone(item)}
                                                      savedCalendar={item.savedCalendar}
                                                      defaultTime={dueTime}
                                                      caseData={item}
                                                      agentIdentity={agentIdentity}
                                                      saveCalendar={saveCalendar}
                                                      updateCalendarStatus={
                                                        item.updateCalendarStatus
                                                      }
                                                      responseTimeOutDueDate={
                                                        item.responseTimeOutDueDate
                                                      }
                                                      trackUpdateInFields={trackUpdateInFields}
                                                      updateTracker={updateTracker}
                                                      timezone={item.timezone || 'MT'}
                                                      tabUniqId={tabUniqId}
                                                    />
                                                  </DueDateModal>
                                                ) : null
                                            }
                                          </Box>
                                        )
                                      }
                                      {notificationLink
                                        ? (
                                          <Box>
                                            <Strong id="accordion_data_notification_link">{`${locale.case.notificationLink}: `}</Strong>
                                            {notificationLink}
                                          </Box>
                                        ) : null}
                                      <Box>
                                        <Strong id="accordion_data_interaction_id">{`${locale.case.interactionId}: `}</Strong>
                                        {`${item.genesysId || ''}`}
                                      </Box>
                                    </FlexGrid.Col>
                                    <FlexGrid.Col xl={1} md={1} />
                                  </FlexGrid.Row>
                                </FlexGrid>
                              </TaskDataWrapper>
                              {
                                item.showWarning
                                && (
                                  <Notification variant="warning" copy="en">
                                    <Text>{this.convertWarningMessage(item.warningMessage)}</Text>
                                  </Notification>
                                )
                              }
                              <FlexGrid gutter={false}>
                                <ContentTabs
                                  key={
                                    `task_detail_modal_tabs_${item.taskId}`
                                  }
                                  id={`task_detail_modal_tabs_${item.taskId}`
                                  }
                                  tabs={this.tabs}
                                  activeTab={activeTab === 'comments' ? this.tabs[0] : this.tabs[1]}
                                  handleTabClick={() => this.handleTabClick(item, activeTab === 'comments' ? this.tabs[1] : this.tabs[0])}
                                  regular={true}
                                />
                                {(activeTab === 'comments' && activeTabTask === item.taskId)
                                  && (
                                  <CommentSection>
                                    {(item.status === 'COMPLETED' || item.status === 'CANCELLED') ? null
                                      : (
                                        <>
                                          {!caseDetailParseFlow.includes(ticketType) && (
                                          <FeatureToggle policyResourceId={agentPolicy.CASE_UPDATE}>
                                            <AddComment
                                              updateComment={updateTaskComment}
                                              type={item.taskType}
                                              agentIdentity={agentIdentity}
                                              taskId={item.taskId.toString()}
                                              addCommentStatus={item.addCommentStatus}
                                              billingAcctNum={billingAcctNum}
                                              taskMetaData={taskMetaData}
                                              updateCommentStatus={updateCommentStatus}
                                              newCommentText={item.newCommentText}
                                              textAreaActive={item.textAreaActive}
                                              saveButtonActive={item.saveButtonActive}
                                              updateCommentText={this.updateCommentTextHandler}
                                              handleCommentText={this.handleCommentText}
                                              handleSpinner={this.handleSpinner}
                                              updateTracker={updateTracker}
                                              trackUpdateInFields={trackUpdateInFields}
                                              disabled={parseTaskWithinCase.includes(item.taskType)}
                                              tabUniqId={tabUniqId}
                                            />
                                          </FeatureToggle>
                                          )}
                                          {item.responseTimeOutComment && item.addCommentStatus === 'ERROR' ? (
                                            <Notification variant="error" copy="en">
                                              <FetchFailedText>
                                                {locale.case.taskCommentTimeout}
                                              </FetchFailedText>
                                            </Notification>
                                          ) : null}
                                        </>
                                      )
                                  }
                                    <FeatureToggle policyResourceId={agentPolicy.CASE_UPDATE}>
                                      <>
                                        {
                                        item.status === 'COMPLETED' || item.status === 'CANCELLED'
                                         || caseDetailParseFlow.includes(ticketType)
                                          ? null : <HairlineDivider />
                                      }
                                      </>
                                    </FeatureToggle>
                                    <CommentBox>
                                      <CommentsList
                                        items={item.comments}
                                        key={item.taskId}
                                        createdOrUpdateAgent={this.createdOrUpdateAgent}
                                        taskStatus={item.status}
                                        commentCount={item.comments.length === 1}
                                      />
                                    </CommentBox>
                                  </CommentSection>
                                  )
                                }
                                {(activeTab === 'history' && activeTabTask === item.taskId) && (
                                  taskHistoryBodyFunction(item)
                                )}
                                {(item.status === 'COMPLETED' || item.status === 'CANCELLED') ? null
                                  : (
                                    <FeatureToggle policyResourceId={agentPolicy.CASE_UPDATE}>
                                      <ButtonContainer>
                                        <AccordionButton>
                                          {!caseDetailParseFlow.includes(ticketType) && (
                                            <>
                                              <TaskButtonsWrapper buttonType="cancel">
                                                <CustomDropDownWrapper
                                                  role="button"
                                                  id={`task_${item.taskId}_cancel_wrapper`}
                                                  ref={this.cancelCustomDropDownRef}
                                                  onFocus={() => {}}
                                                  onBlur={this.onCompleteBlur}
                                                  tabIndex={0}
                                                  disabled={parseTaskWithinCase
                                                    .includes(item.taskType)}
                                                >
                                                  <CustomDropDown
                                                    id={`task_${item.taskId}_cancel`}
                                                    onHandleChange={
                                                    e => this.handleCancelChange(e, item)}
                                                    item={item.cancelItem || ''}
                                                    customCss={customDropdownCss}
                                                    alterOption={this.alterCancelOptionHandler}
                                                    displayOption={item.cancelDisplayOption}
                                                    items={this.cancelItems}
                                                    defaultPlaceHolderValue={
                                                locale.case.buttons.cancelTask}
                                                    selectedText={
                                                    Object.keys(this.cancelReasonText).length
                                                      ? this.cancelReasonText[item.cancelItem]
                                                      : item.cancelItem
                                                  }
                                                    disabled={parseTaskWithinCase
                                                      .includes(item.taskType)}
                                                    currentTask={item}
                                                    toolTipEnable={true}
                                                  />
                                                </CustomDropDownWrapper>
                                              </TaskButtonsWrapper>
                                              <TaskButtonsWrapper buttonType="complete">
                                                <CustomDropDownWrapper
                                                  role="button"
                                                  ref={this.completeCustomDropDownRef}
                                                  onFocus={() => {}}
                                                  onBlur={this.onCompleteBlur}
                                                  tabIndex={0}
                                                  disabled={parseTaskWithinCase
                                                    .includes(item.taskType)}
                                                >
                                                  <CustomDropDown
                                                    id={`task_${item.taskId}_complete`}
                                                    onHandleChange={
                                                e => this.onCompleteChangeHandler(e, item)}
                                                    item={item.outcomeItem || ''}
                                                    alterOption={this.alterCompleteOptionHandler}
                                                    customCss={customDropdownCss}
                                                    displayOption={item.completeDisplayOption}
                                                    items={this.resultingOutcomes}
                                                    defaultPlaceHolderValue={locale.case.buttons
                                                      .completeTask}
                                                    selectedText={
                                                    Object.keys(this.completeReasonText).length
                                                      ? this.completeReasonText[item.outcomeItem]
                                                      : item.outcomeItem
                                                  }
                                                    disabled={parseTaskWithinCase
                                                      .includes(item.taskType)}
                                                    currentTask={item}
                                                    toolTipEnable={true}
                                                  />
                                                </CustomDropDownWrapper>
                                              </TaskButtonsWrapper>
                                            </>
                                          )}
                                        </AccordionButton>
                                      </ButtonContainer>
                                    </FeatureToggle>
                                  )}
                              </FlexGrid>
                            </AccorordionTaskData>

                          </AccordionOuterHeader>
                        )
                      })
                    }
              </Accordion>
            ) : (noTaskAvailableBody)
                }
            <CaseCommentsSection commentTimeout={responseTimeOutCaseComment}>
              <FlexGrid gutter={false}>
                <FlexGrid.Row>
                  <FlexGrid.Col sm={1} xs={1} md={1} lg={1} />
                  <FlexGrid.Col sm={11} xs={11} md={11} lg={11}>
                    <ContentTabs
                      key="task_detail_modal_tabs_"
                      id="task_detail_modal_tabs_"
                      tabs={this.caseTabs}
                      activeTab={activeCaseTab === 'comments' ? this.caseTabs[0] : this.caseTabs[1]}
                      handleTabClick={this.handleCaseTabClick}
                      regular={true}
                    />
                    {
                  (activeCaseTab === 'comments') && (
                    <>
                      {
                        (caseStatus === 'CLOSED' || caseStatus === 'REJECTED' || caseStatus === 'CANCELLED') ? null
                          : (
                            <>
                              {!caseDetailParseFlow.includes(ticketType) && (
                              <FeatureToggle policyResourceId={agentPolicy.CASE_UPDATE}>
                                <AddComment
                                  updateComment={updateCaseComment}
                                  type="case"
                                  agentIdentity={agentIdentity}
                                  taskId=""
                                  addCommentStatus={addCommentStatus}
                                  billingAcctNum={billingAcctNum}
                                  taskMetaData={caseTaskMetaData}
                                  updateCommentStatus={updateCaseCommentStatus}
                                  newCommentText={caseCommentText}
                                  textAreaActive={false}
                                  saveButtonActive={caseSaveButtonActive}
                                  updateCommentText={this.updateCommentTextHandler}
                                  handleCommentText={this.handleCaseCommentText}
                                  handleSpinner={this.handleCaseSpinner}
                                  traceId={interactionId}
                                  caseId={caseId}
                                  updateTracker={updateTracker}
                                  trackUpdateInFields={trackUpdateInFields}
                                  tabUniqId={tabUniqId}
                                />
                              </FeatureToggle>
                              )}
                              {responseTimeOutCaseComment && addCommentStatus === 'ERROR' ? (
                                <>
                                  <Notification variant="error" copy="en">
                                    <FetchFailedText>
                                      {locale.case.taskCommentTimeout}
                                    </FetchFailedText>
                                  </Notification>
                                  <SpacingBar />
                                </>
                              ) : null}
                            </>
                          )
                      }
                      <FeatureToggle policyResourceId={agentPolicy.CASE_UPDATE}>
                        <>
                          {comments.length && !caseDetailParseFlow.includes(ticketType)
                          && !caseClosingStatus.includes(caseStatus.toUpperCase())
                            ? <HairlineDivider /> : null }
                        </>
                      </FeatureToggle>
                      <CommentBox>
                        <CommentsList
                          items={comments}
                          caseId={caseId}
                          createdOrUpdateAgent={this.createdOrUpdateAgent}
                          openNotificationPopUp={this.handleClick}
                        />
                      </CommentBox>
                    </>
                  )
              }
                    {
                  (activeCaseTab === 'history') && (caseHistoryBodyFunction(caseHistory,
                    caseHistoryStatus))
              }
                  </FlexGrid.Col>
                </FlexGrid.Row>
              </FlexGrid>
            </CaseCommentsSection>
          </CaseSection>
        </GridContainer>
      </CaseBody>
    )

    return (
      <>
        <PopupContainer
          posX={dragPosition.x}
          style={{
            left: minimized ? 'auto' : dragPosition.x,
            right: rightAlignPosition,
            top: minimized ? 'auto' : dragPosition.y,
            zIndex: index
          }}
          tabIndex={0}
          ref={this.popupContainer}
          minimized={minimized}
          onClick={this.onClickOutsideOfOptions}
          onBlur={this.onFocusOut}
        >
          <DetailsPopup
            isOpen={isOpen}
            minimized={minimized}
            closeHandler={this.removeCasePopupHandler}
            modifieable={{
              showMinimizeIcon: modifieable.showMinimizeIcon,
              showCloseIcon: showCloseIconMethod(),
              showFooter: modifieable.showFooter,
              showHeader: modifieable.showHeader,
              showBody: modifieable.showBody
            }}
            updateDetail={this.updateCaseDetailHandler}
            highestZindex={highestZindex}
            highestPosition={highestPosition}
            footerContent={footerContent}
            bodyContent={caseBodyContent}
            containerRef={this.popupContainer}
            rel={rel}
            dimensions={dimensions}
            index={index}
            coreHeaderStyles={{ width: '100%' }}
            removeCaseDetail={this.removeCasePopupHandler}
            headerContent={headerContent}
            tabIdDetail={tabIdDetail}
            type={type}
            rightAlignhandler={this.rightAlignhandler}
            isDraggable={isDraggable}
            updateNoifiIndex={this.updateNoificationIndex}
          />
        </PopupContainer>
        {getNotificationModalDetail('taskWithinCase').isOpen && (
          <PopupContainer
            id={`notification-popup-${caseId}`}
            posX={notificationDragPosition?.x}
            style={{
              left: notificationDragPosition?.x,
              right: rightAlignPosition,
              top: notificationDragPosition?.y,
              zIndex: getNotificationModalDetail('taskWithinCase')?.index,
              width: '41rem'
            }}
            tabIndex={0}
            ref={this.notificationPopupContainer}
          >
            <DetailsPopup
              isOpen={minimized ? false : getNotificationModalDetail('taskWithinCase').isOpen}
              closeHandler={() => this.closeNotificationHandler('taskWithinCase')}
              minimized={minimized}
              modifieable={{
                showMinimizeIcon: getNotificationModalDetail('taskWithinCase').modifieable.showMinimizeIcon,
                showCloseIcon: showCloseIconMethod(),
                showFooter: getNotificationModalDetail('taskWithinCase').modifieable.showFooter,
                showHeader: getNotificationModalDetail('taskWithinCase').modifieable.showHeader,
                showBody: getNotificationModalDetail('taskWithinCase').modifieable.showBody
              }}
              updateDetail={this.updateCaseDetailHandler}
              highestZindex={getNotificationModalDetail('taskWithinCase').highestZindex}
              highestPosition={getNotificationModalDetail('taskWithinCase').highestPosition}
              bodyContent={
                (
                  <NotificationBodyContent
                    getNotificationInfoStatus={getNotificationInfo('taskWithinCase').notificationStatus}
                    getNotificationInfo={getNotificationInfo('taskWithinCase').notificationData}
                    popUpId={caseId}
                    locale={locale}
                  />
                )
              }
              containerRef={this.notificationPopupContainer}
              rel={notificationRel}
              dimensions={getNotificationModalDetail('taskWithinCase').dimensions}
              index={notificationIndex}
              coreHeaderStyles={{ width: '100%' }}
              removeCaseDetail={() => this.closeNotificationHandler('taskWithinCase')}
              headerContent={getNotificationHeaderContent('taskWithinCase')}
              tabIdDetail={tabIdDetail}
              type={getNotificationModalDetail('taskWithinCase').type}
              rightAlignhandler={this.rightAlignhandler}
              isDraggable={getNotificationModalDetail('taskWithinCase').isDraggable}
              updateNoifiIndex={this.updateNoificationIndex}
            />
          </PopupContainer>
        )}
        {getNotificationModalDetail('caseCommentNotificationPopup').isOpen && (
          <PopupContainer
            id={`case-comment-notification-popup-${caseId}`}
            posX={caseCommentNotificationDragPosition?.x}
            style={{
              left: caseCommentNotificationDragPosition?.x,
              right: rightAlignPosition,
              top: caseCommentNotificationDragPosition?.y,
              zIndex: getNotificationModalDetail('caseCommentNotificationPopup')?.index,
              width: '41rem'
            }}
            tabIndex={0}
            ref={this.caseCommentPopupContainer}
            onBlur={this.onFocusOut}
          >
            <DetailsPopup
              isOpen={minimized ? false : getNotificationModalDetail('caseCommentNotificationPopup').isOpen}
              closeHandler={() => this.closeNotificationHandler('caseCommentNotificationPopup')}
              minimized={minimized}
              modifieable={{
                showMinimizeIcon: getNotificationModalDetail('caseCommentNotificationPopup').modifieable.showMinimizeIcon,
                showCloseIcon: showCloseIconMethod(),
                showFooter: getNotificationModalDetail('caseCommentNotificationPopup').modifieable.showFooter,
                showHeader: getNotificationModalDetail('caseCommentNotificationPopup').modifieable.showHeader,
                showBody: getNotificationModalDetail('caseCommentNotificationPopup').modifieable.showBody
              }}
              updateDetail={this.updateCaseDetailHandler}
              highestZindex={getNotificationModalDetail('caseCommentNotificationPopup').highestZindex}
              highestPosition={getNotificationModalDetail('caseCommentNotificationPopup').highestPosition}
              bodyContent={
                (
                  <NotificationBodyContent
                    getNotificationInfoStatus={getNotificationInfo('caseCommentNotificationPopup').notificationStatus}
                    getNotificationInfo={getNotificationInfo('caseCommentNotificationPopup').notificationData}
                    popUpId={caseId}
                    locale={locale}
                    getUpdatedNotificationIndex={this.getUpdatedNotificationIndex}
                  />
                )
              }
              containerRef={this.caseCommentPopupContainer}
              rel={caseCommentNotificationRel}
              dimensions={getNotificationModalDetail('caseCommentNotificationPopup').dimensions}
              index={caseCommentNotificationIndex}
              coreHeaderStyles={{ width: '100%' }}
              removeCaseDetail={() => this.closeNotificationHandler('caseCommentNotificationPopup')}
              headerContent={getNotificationHeaderContent('caseCommentNotificationPopup')}
              tabIdDetail={tabIdDetail}
              type={getNotificationModalDetail('caseCommentNotificationPopup').type}
              rightAlignhandler={this.rightAlignhandler}
              isDraggable={getNotificationModalDetail('caseCommentNotificationPopup').isDraggable}
              updateNoifiIndex={this.updateNoificationIndex}
            />
          </PopupContainer>
        )}
        {closeModalStatus && (
          <CloseModal
            returnAndSaveHandler={this.returnAndSaveHandler}
            closeHandler={this.closeHandler}
            removeCloseModalHandler={this.removeCloseModalHandler}
            saveBtnVal={locale.case.returnAndSaveButton}
            closeBtnVal={locale.case.closeAnywayButton}
            warningMsg={locale.case.unsavedChangesWarningMessage}
          />
        )}
        {rtsCloseModalStatus && (
          <CloseModal
            returnAndSaveHandler={this.removeRTSCloseModalHandler}
            closeHandler={this.retunAndSaveRTSHandler}
            removeCloseModalHandler={this.removeRTSCloseModalHandler}
            closeBtnVal={locale.case.rtsWarningPopUp.saveBtnVal}
            saveBtnVal={locale.case.rtsWarningPopUp.noBtnVal}
            warningMsg={this.formatRTSWarningMsg(locale.case.rtsWarningPopUp.warningMsg)}
          />
        )}
      </>
    )
  }
}

CaseDetail.defaultProps = {
  fieldsStatus: '',
  taskUpdateCommentStatus: '',
  taskUpdateDueDateStatus: ''
}

CaseDetail.propTypes = {
  detail: PropTypes.object.isRequired,
  taskHistoryDetail: PropTypes.func.isRequired,
  removeCaseDetail: PropTypes.func.isRequired,
  currentTabCustomerId: PropTypes.string.isRequired,
  updateCaseDetail: PropTypes.func.isRequired,
  banDetails: PropTypes.object.isRequired,
  caseModalTaskDetail: PropTypes.object.isRequired,
  removeCaseTaskDetail: PropTypes.func.isRequired,
  agentIdentity: PropTypes.object.isRequired,
  updateTaskComment: PropTypes.func.isRequired,
  updateCommentStatus: PropTypes.func.isRequired,
  tabIdDetail: PropTypes.array.isRequired,
  updateCaseComment: PropTypes.func.isRequired,
  updateCaseCommentStatus: PropTypes.func.isRequired,
  updateCaseFields: PropTypes.func.isRequired,
  fieldsStatus: PropTypes.string,
  updateTracker: PropTypes.object.isRequired,
  trackUpdateInFields: PropTypes.func.isRequired,
  trackCloseModal: PropTypes.func.isRequired,
  closeModalStatus: PropTypes.bool.isRequired,
  saveCalendar: PropTypes.func.isRequired,
  dueDateDuration: PropTypes.object.isRequired,
  resetCalendar: PropTypes.func.isRequired,
  updateCaseModalData: PropTypes.func.isRequired,
  taskUDTypeData: PropTypes.object.isRequired,
  fetchTasksUnderCase: PropTypes.func.isRequired,
  updateCaseDetailItem: PropTypes.func.isRequired,
  rtsCloseModalStatus: PropTypes.bool.isRequired,
  trackRTSCloseModal: PropTypes.func.isRequired,
  addCaseHistoryDetail: PropTypes.func.isRequired,
  taskUpdateCommentStatus: PropTypes.string,
  taskUpdateDueDateStatus: PropTypes.string,
  tabUniqId: PropTypes.string.isRequired,
  udItemListData: PropTypes.object.isRequired,
  getNotificationModalDetail: PropTypes.func.isRequired,
  addDetail: PropTypes.func.isRequired,
  fetchNotificationData: PropTypes.func.isRequired,
  getNotificationInfo: PropTypes.object.isRequired,
  removeNotificationPopUpData: PropTypes.func.isRequired,
  fetchNotificationListData: PropTypes.func.isRequired,
  authData: PropTypes.object.isRequired
}
export default CaseDetail
