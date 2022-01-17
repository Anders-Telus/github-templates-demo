import React from 'react'
import momentTZ from 'moment-timezone'
import PropTypes from 'prop-types'
import FlexGrid from '@tds/core-flex-grid'
import Text from '@tds/core-text'
import Spinner from '@tds/core-spinner'
import HairlineDivider from '@tds/core-hairline-divider'
import Box from '@tds/core-box'
import _ from 'lodash'
import Notification from '@tds/core-notification'
import moment from 'moment'
import DetailsPopup from '../../../../components/DetailsPopup/view'
import Telus from '../../../../../assets/svgs/Telus'
import Koodo from '../../../../../assets/svgs/Koodo'
import ContentTabs from '../../../../components/ContentTabs'
import DetailComponent from './FormComponent/view'
import SelectInput from '../../../../components/Select/CustomSelect'
import CustomerDetailComponent from './CustomerDetailSection/view'
import CloseModal from '../CaseDetail/components/CloseModal'
import { fetchService, getBaseUrl } from '../../../../utils/fetch'
import {
  PopupContainer,
  TaskBody,
  DueDateModal,
  EllipsesText,
  MediumWeightText,
  LeftContainer,
  DetailsSection,
  RightContainer,
  FooterContent,
  FooterContentInner,
  SaveButton,
  LobWrapper,
  ErrorContent,
  GridContainer,
  CardSection,
  TaskSection
} from './styles'
import {
  getCasaAppLocale,
  getCurrentLanguage,
  getRequestOrTypeData,
  getUniqueAgentFunctionList,
  TIMEZONE_MAPPING
} from '../../../../utils/helper'
import {
  getSubTypeDefaultDueDate,
  getSubTypeDateFormat,
  getSubTypeTimeFormat
} from '../../../../utils/common'
import {
  NUMERICREGEX,
  singleQuotes,
  agentPolicy,
  LANGUAGE_MAPPINGS
} from '../../../../constant'
import { convertDateTime, convertMonthToEnglish } from '../../../../utils/timeFormat'
import CalendarModal from '../Calendar'
import { pushTaskCasePageView, pushCreateTaskTimeEvent } from '../../../../utils/adobe'
import getAdobePageName from '../../../../utils/adobe/helper'
import validateSms, { smsVisiblity } from './helpers'
import { CasaBox } from '../../../../components/Styled'

const initFieldValidation = {
  email: {
    valid: true,
    message: ''
  },
  cbr: {
    valid: true,
    message: ''
  },
  sms: {
    valid: true,
    message: ''
  }
}

const lang = getCurrentLanguage()
const filterLOB = (str) => {
  if (str === 'mob' || str === 'mobility') {
    return 'Mobility'
  } if (str === 'ffh' || str === 'homesolutions') {
    return 'HomeSolutions'
  }
  return str
}

class Task extends React.Component {
  constructor(props) {
    super(props)
    const { task, banDetails } = props
    const { uuid } = banDetails
    this.state = {
      uuid,
      initState: props.task.initState || {},
      fifaIndicator: props.task.fifaIndicator,
      dragPosition: props.detail.modifieable.dragPosition,
      rel: props.detail.modifieable.rel,
      minimized: props.detail.minimized,
      index: props.detail.index,
      selectedRequest: props.task.selectedRequest ? props.task.selectedRequest : '',
      selectedType: props.task.selectedType ? props.task.selectedType : '',
      comment: props.task.comment ? props.task.comment : '',
      priority: props.task.priority ? props.task.priority : '',
      cbr: (props.task.cbr || props.task.cbr === '') ? props.task.cbr : (props.cbrOptions[0] ? props.cbrOptions[0].value : null) || '',
      sms: props.task.sms || '',
      email: (props.task.email || props.task.email === '') ? props.task.email
        : (props.billingAcct && (props.billingAcct.emailAddress || props.billingAcct.customerPortalEmail || props.billingAcct.customerPrimaryContactEmail)) || '',
      emailTooltipVisible: !!props.task.emailTooltipVisible,
      language: props.task.language ? props.task.language : '',
      fieldValidation: props.task.fieldValidation
        ? _.cloneDeep(props.task.fieldValidation)
        : _.cloneDeep(initFieldValidation),
      selectedLOB: props.task.selectedLOB
        ? props.task.selectedLOB
        : filterLOB(task.lob.toLowerCase()),
      isAllFieldValid: props.task.isAllFieldValid
        ? props.task.isAllFieldValid
        : true,
      // taskClose: props.task.taskClose ? props.task.taskClose : false,
      tabUniqId: props.task.tabUniqId ? props.task.tabUniqId : '',
      // taskSaveStatus: props.task.taskSaveStatus ? props.task.taskSaveStatus : 'UNINIT',
      showCalendar: props.task.showCalendar ? props.task.showCalendar : false,
      dueTime: props.task.dueTime,
      dueDate: props.task.dueDate,
      isBusinessHours: props.task.isBusinessHours,
      datePositionX: 0,
      datePositionY: 0,
      agentFunction: props.task.agentFunction ? props.task.agentFunction : '',
      reminderUnit: props.task.reminderUnit || 0,
      brand: props.task.brand ? (props.task.brand).toLowerCase() : 'telus',
      triggerState: false,
      calendarDetails: props.task.calendar,
      lang,
      rightAlignPosition: '1%',
      createTaskCalendar: {
        dueDate: props.task.createTaskCalendar.dueDate,
        dueTime: props.task.createTaskCalendar.dueTime,
        isBusinessHours: props.task.createTaskCalendar
          ? props.task.createTaskCalendar.isBusinessHours : true,
        isChanged: props.task.createTaskCalendar ? props.task.createTaskCalendar.isChanged : false,
        errorMessage: props.task.createTaskCalendar ? props.task.createTaskCalendar.errorMessage : '',
        timeErrorMessage: props.task.createTaskCalendar ? props.task.createTaskCalendar.timeErrorMessage : '',
        townCheckBusinessHours: props.task.createTaskCalendar.townCheckBusinessHours || false,
        townCheckDueDate: props.task.createTaskCalendar.townCheckDueDate,
        townCheckDueTime: props.task.createTaskCalendar.townCheckDueTime,
        isTownCheckChanged: props.task.createTaskCalendar.isTownCheckChanged || false
      },
      isSelectedDate: props.task.isSelectedDate ? props.task.isSelectedDate : false,
      isSelectedTime: props.task.isSelectedTime ? props.task.isSelectedTime : false,
      dateTimeSelected: props.task.dateTimeSelected ? props.task.dateTimeSelected : false,
      routeAgentFunction: props.task.routeAgentFunction ? props.task.routeAgentFunction : false,
      isTOWNCheck: props.task.isTOWNCheck || false,
      defaultDueDate: props.task.defaultDueDate,
      defaultDueTime: props.task.dueTime,
      subRequestTypeDefaultDate: props.task.subRequestTypeDefaultDate,
      isTownCheckDateChanged: props.task.isTownCheckDateChanged || false,
      isDateChanged: props.task.isDateChanged || false,
      townCheckDueDate: props.task.townCheckDueDate || momentTZ().format(),
      townCheckDueTime: props.task.townCheckDueTime || '12:00pm',
      townCheckBusinessHours: props.task.townCheckBusinessHours || false
      // fetchStatus: props.task.fetchStatus ? props.task.fetchStatus : 'UNINIT'
    }
    this.popupContainer = React.createRef()
    this.updateTaskDetailHandler = this.updateTaskDetailHandler.bind(this)
    this.removeTaskPopupHandler = this.removeTaskPopupHandler.bind(this)
    this.requestType = []
    this.requestSubTypes = []
    this.agentFunctionList = []
    this.lobList = []
    this.languageList = []
    this.selectRequest = this.selectRequest.bind(this)
    this.selectType = this.selectType.bind(this)
    this.getRequestType = this.getRequestType.bind(this)
    this.getRequest = this.getRequest.bind(this)
    this.saveTask = this.saveTask.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleCbrChange = this.handleCbrChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.setLanguageOption = this.setLanguageOption.bind(this)
    this.handleLOBChange = this.handleLOBChange.bind(this)
    this.setAgentFunction = this.setAgentFunction.bind(this)
    this.setFifaFunction = this.setFifaFunction.bind(this)
    this.saveStateSwitchTab = this.saveStateSwitchTab.bind(this)
    this.closeCalendar = this.closeCalendar.bind(this)
    this.saveDueDate = this.saveDueDate.bind(this)
    this.changeDueDateStatus = this.changeDueDateStatus.bind(this)
    this.setAgentFunctionData = this.setAgentFunctionData.bind(this)
    this.rightAlignhandler = this.rightAlignhandler.bind(this)
    this.openCalendar = this.openCalendar.bind(this)
    this.validateMandatoryFields = this.validateMandatoryFields.bind(this)
    this.updateCreateTaskCalendar = this.updateCreateTaskCalendar.bind(this)
    this.returnAndSaveHandler = this.returnAndSaveHandler.bind(this)
    this.closeHandler = this.closeHandler.bind(this)
    this.removeCloseModalHandler = this.removeCloseModalHandler.bind(this)
    this.fetchSms = this.fetchSms.bind(this)
    this.checkRouteAgentFunction = this.checkRouteAgentFunction.bind(this)
    this.onFocusOut = this.onFocusOut.bind(this)
    this.SubTypeDateFormatCalendarDate = this.SubTypeDateFormatCalendarDate.bind(this)
    this.convertDateLanguage = this.convertDateLanguage.bind(this)
  }

  componentDidMount() {
    const {
      getTaskCascadeList,
      getTaskUDList,
      taskUDTypeDataStatus,
      taskCascadeMenuItemListStatus,
      task: { fetchSmsStatus },
      tabUniqId
    } = this.props
    if (taskUDTypeDataStatus === 'UNINIT') {
      getTaskUDList(tabUniqId)
    } else {
      this.alterSystemTypeOrLanguageData()
    }
    if (taskCascadeMenuItemListStatus === 'UNINIT' || taskCascadeMenuItemListStatus === 'ERROR') {
      getTaskCascadeList(tabUniqId)
    } else {
      this.alterLOBOptionsData()
    }
    if (fetchSmsStatus === 'PENDING') {
      this.fetchSms()
    }
    this.newTaskStartTime = Date.now()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { billingAcct, detail: { minimized } } = nextProps
    if (!prevState.language) {
      return {
        language: LANGUAGE_MAPPINGS[billingAcct.preferredLanguage],
        initState: {
          selectedRequest: prevState.selectedRequest,
          selectedType: prevState.selectedType,
          comment: prevState.comment,
          cbr: prevState.cbr,
          sms: prevState.sms,
          email: prevState.email,
          selectedLOB: prevState.selectedLOB,
          agentFunction: prevState.agentFunction,
          language: billingAcct.preferredLanguage
            ? LANGUAGE_MAPPINGS[billingAcct.preferredLanguage]
            : 'English',
          dueDate: prevState.dueDate,
          dueTime: prevState.dueTime,
          isBusinessHours: prevState.isBusinessHours,
          dueDateStatus: nextProps.dueDateStatus,
          routeAgentFunction: prevState.routeAgentFunction,
          fifaIndicator: prevState.fifaIndicator
        },
        minimized
      }
    }
    if (prevState.tabUniqId !== nextProps.task.tabUniqId) {
      const {
        selectedRequest,
        selectedType,
        comment,
        cbr,
        email,
        sms,
        emailTooltipVisible,
        language,
        agentFunction,
        selectedLOB,
        priority,
        fieldValidation,
        isAllFieldValid,
        tabUniqId,
        createTaskCalendar,
        brand,
        showCalendar,
        calendar,
        reminderUnit,
        dueDate,
        dueTime,
        isBusinessHours,
        isSelectedDate,
        dateTimeSelected,
        isSelectedTime,
        index,
        dragPosition,
        rel,
        fifaIndicator,
        routeAgentFunction,
        isTOWNCheck,
        subRequestTypeDefaultDate,
        defaultDueDate,
        townCheckDueDate,
        townCheckBusinessHours,
        isDateChanged
      } = nextProps.task
      return {
        selectedRequest,
        selectedType,
        comment,
        cbr,
        email,
        index,
        sms,
        emailTooltipVisible,
        createTaskCalendar,
        agentFunction,
        selectedLOB,
        priority,
        fieldValidation,
        isAllFieldValid,
        tabUniqId,
        minimized,
        dragPosition,
        rel,
        brand,
        showCalendar,
        calendar,
        calendarDetails: calendar,
        language: language || billingAcct.preferredLanguage
          ? LANGUAGE_MAPPINGS[billingAcct.preferredLanguage]
          : 'English',
        reminderUnit,
        dueDate,
        dueTime,
        isBusinessHours,
        isSelectedDate,
        dateTimeSelected,
        isSelectedTime,
        routeAgentFunction,
        fifaIndicator,
        isTOWNCheck,
        subRequestTypeDefaultDate,
        defaultDueDate,
        townCheckDueDate,
        townCheckBusinessHours,
        isDateChanged
      }
    }
    const { fetchSmsStatus } = nextProps.task
    return { fetchSmsStatus, minimized }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      taskCascadeMenuItemList,
      task,
      taskUDTypeData
    } = this.props
    if (task.tabUniqId !== prevProps.task.tabUniqId) {
      if (!task.taskClose) {
        this.saveStateSwitchTab(prevState)
      }
    }
    if (!(_.isEqual(prevProps.taskUDTypeData, taskUDTypeData))
      || (task.tabUniqId !== prevProps.task.tabUniqId)
      || prevState.lang !== lang) {
      this.alterSystemTypeOrLanguageData()
    }
    if (!(_.isEqual(prevProps.taskCascadeMenuItemList, taskCascadeMenuItemList))
      || (task.tabUniqId !== prevProps.task.tabUniqId)
      || prevState.lang !== lang) {
      this.alterLOBOptionsData()
    }
  }

  componentWillUnmount() {
    const {
      detail: { id }, updateTaskDetail, tabUniqId,
      switchTab, task, taskSaveStatus
    } = this.props
    const {
      dragPosition, rel, minimized, index
    } = this.state
    const updateTaskDtl = {
      values: {
        dragPosition,
        rel,
        minimized,
        index
      },
      id,
      tabId: tabUniqId,
      type: 'task-create',
      parent: 'modifieable',
      from: 'unmount'
    }
    if (!minimized) {
      delete updateTaskDtl.values.minimized
    }
    updateTaskDetail(updateTaskDtl)
    const {
      selectedRequest,
      selectedType,
      comment,
      cbr,
      sms,
      email,
      emailTooltipVisible,
      language,
      agentFunction,
      selectedLOB,
      agentFunctionList,
      priority,
      fieldValidation,
      isAllFieldValid,
      brand,
      isBusinessHours,
      showCalendar,
      reminderUnit,
      createTaskCalendar,
      initState,
      isSelectedDate,
      dateTimeSelected,
      isSelectedTime,
      routeAgentFunction,
      fifaIndicator,
      isTOWNCheck,
      subRequestTypeDefaultDate,
      defaultDueDate,
      townCheckDueDate,
      townCheckBusinessHours,
      isDateChanged,
      isTownCheckDateChanged,
      townCheckDueTime
    } = this.state
    const taskData = {
      selectedRequest,
      selectedType,
      comment,
      cbr,
      sms,
      email,
      emailTooltipVisible,
      language,
      agentFunction,
      selectedLOB,
      agentFunctionList,
      priority,
      fieldValidation,
      isAllFieldValid,
      minimized,
      index,
      rel,
      dragPosition,
      // taskClose,
      brand,
      isBusinessHours,
      showCalendar,
      reminderUnit,
      createTaskCalendar,
      initState,
      isSelectedDate,
      dateTimeSelected,
      isSelectedTime,
      routeAgentFunction,
      fifaIndicator,
      isTOWNCheck,
      subRequestTypeDefaultDate,
      defaultDueDate,
      townCheckDueDate,
      townCheckBusinessHours,
      isDateChanged,
      isTownCheckDateChanged,
      townCheckDueTime
    }
    if ((task && Object.keys(task).includes('taskClose') && !task.taskClose)
      || taskSaveStatus === 'PENDING') {
      switchTab(tabUniqId, taskData)
    }
    this.closeCalendar()
  }

  onFocusOut() {
    const {
      selectedRequest,
      selectedType,
      comment,
      cbr,
      sms,
      email,
      emailTooltipVisible,
      language,
      agentFunction,
      selectedLOB,
      agentFunctionList,
      priority,
      fieldValidation,
      isAllFieldValid,
      brand,
      isBusinessHours,
      showCalendar,
      reminderUnit,
      initState,
      isSelectedDate,
      dateTimeSelected,
      isSelectedTime,
      routeAgentFunction,
      fifaIndicator,
      minimized,
      index,
      dragPosition,
      rel,
      tabUniqId,
      isTOWNCheck
    } = this.state
    const taskData = {
      selectedRequest,
      selectedType,
      comment,
      cbr,
      sms,
      email,
      emailTooltipVisible,
      language,
      agentFunction,
      selectedLOB,
      agentFunctionList,
      priority,
      fieldValidation,
      isAllFieldValid,
      minimized,
      index,
      rel,
      dragPosition,
      // taskClose,
      brand,
      isBusinessHours,
      showCalendar,
      reminderUnit,
      initState,
      isSelectedDate,
      dateTimeSelected,
      isSelectedTime,
      routeAgentFunction,
      fifaIndicator,
      isTOWNCheck
    }
    const {
      switchTab
    } = this.props
    switchTab(tabUniqId, taskData)
  }

  async getRequestType(reqT) {
    const {
      selectedLOB,
      brand
    } = this.state
    if (reqT) {
      const {
        taskCascadeMenuItemList,
        udItemList: { subtype }
      } = this.props
      this.requestSubTypes = await getRequestOrTypeData({
        type: 'subtype', reqtype: reqT, selLOB: selectedLOB, brand, taskCascadeMenuItemList, subtype
      })
    }
    return []
  }

  async getRequest(lob) {
    const {
      brand
    } = this.state
    const { taskCascadeMenuItemList, udItemList: { request } } = this.props
    this.requestType = await getRequestOrTypeData({
      type: 'request', selLOB: lob, brand, taskCascadeMenuItemList, request
    })
  }

  setLanguageOption(ev) {
    const { trackUpdateInFields, updateTracker, tabUniqId } = this.props
    const { initState } = this.state
    this.setState({
      language: ev.target.value
    })
    if (initState.language !== ev.target.value) {
      if (!updateTracker.language) {
        trackUpdateInFields(tabUniqId, 'language', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'language', false)
    }
  }

  getAgentPriorityReminderForSubtype(val) {
    const obj = this.requestSubTypes.find((s) => {
      return s.value === val
    })
    return obj && obj.resultSet ? obj.resultSet : {}
  }

  setAgentFunction(e) {
    const { trackUpdateInFields, updateTracker, tabUniqId } = this.props
    const { initState } = this.state
    this.setState({ agentFunction: e.target.value })
    if (initState.agentFunction !== e.target.value) {
      if (!updateTracker.agentFunction) {
        trackUpdateInFields(tabUniqId, 'agentFunction', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'agentFunction', false)
    }
  }

  setFifaFunction(e) {
    const {
      trackUpdateInFields, updateTracker, tabUniqId
    } = this.props
    const { initState } = this.state
    this.setState({ fifaIndicator: e.target.checked })
    if (initState.fifaIndicator !== e.target.checked) {
      if (!updateTracker.fifaIndicator) {
        trackUpdateInFields(tabUniqId, 'fifaIndicator', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'fifaIndicator', false)
    }
  }

  async setAgentFunctionData(lob) {
    const { brand } = this.state
    const { taskCascadeMenuItemList } = this.props
    this.agentFunctionList = await getUniqueAgentFunctionList(lob, brand, taskCascadeMenuItemList)
  }

  async getLanguageOrSystem(type) {
    const { formData } = getCasaAppLocale().task
    const {
      taskUDTypeData,
      taskUDTypeDataStatus
    } = this.props
    if (
      taskUDTypeDataStatus !== 'PENDING'
      && taskUDTypeData
      && taskUDTypeData[type]
      && taskUDTypeData[type].length
    ) {
      return taskUDTypeData[type].map(s => ({
        value: s.value,
        text: formData.language[s.value]
      }))
    }
    return []
  }

  handleSmsChange = (data) => {
    const { trackUpdateInFields, updateTracker, tabUniqId } = this.props
    const { fieldValidation, initState } = this.state
    if (!fieldValidation.sms.valid) {
      fieldValidation.sms.valid = true
      fieldValidation.sms.message = ''
    }
    const inputSms = data.replace(/\.|-|\s/g, '').trim()
    this.setState({ sms: inputSms, fieldValidation })
    if (initState.sms !== inputSms) {
      if (!updateTracker.sms) {
        trackUpdateInFields(tabUniqId, 'sms', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'sms', false)
    }
  }

  SubTypeDateFormatCalendarDate(date) {
    const { subRequestTypeDefaultDate } = this.state
    const days = subRequestTypeDefaultDate && subRequestTypeDefaultDate._defaultDueDate / 1440
    let _date = momentTZ()
    if (typeof date === 'string') {
      _date = `${momentTZ(date.slice(0, 10)).add(days - 1, 'days').format()}`
    } else {
      _date = `${momentTZ(date).add(days - 1, 'days').format()}`
    }
    return _date
  }

  fetchSms() {
    const { agentIdentity: { employeeId } } = this.props
    const startTime = Date.now()
    const {
      tabUniqId, task: { lob, ban }, updateCreateTaskSms,
      banDetails, oldestActiveSubscriber
    } = this.props
    const {
      initState
    } = this.state
    const activeSMSNumber = {
      fetchSmsStatus: 'SUCCESS',
      sms: '',
      tabUniqId
    }
    if (!banDetails.isParent) {
      const url = `${getBaseUrl()}/billing-accounts/${lob}/${ban}/products-summary`
      fetchService(url)
        .then((response) => {
          return response.json()
        }).then((data) => {
          if (data && data.data && data.data.length) {
            const sortedSubscribers = data.data.sort(
              (a, b) => new Date(a.activationDate) - new Date(b.activationDate)
            )
            const sortedData = sortedSubscribers.find(
              s => s.productResourceValue && s.productStatus.toLowerCase() === 'a'
            )
            activeSMSNumber.sms = sortedData.productResourceValue
          }
          this.setState({
            sms: activeSMSNumber.sms,
            initState: {
              ...initState,
              sms: activeSMSNumber.sms
            }
          }, () => {
            pushTaskCasePageView({ employeeId, loadTime: Date.now() - startTime, name: 'casa/customer/new task' })
            updateCreateTaskSms(activeSMSNumber)
          })
        }).catch(() => {
          activeSMSNumber.fetchSmsStatus = 'ERROR'
          pushTaskCasePageView({ employeeId, loadTime: Date.now() - startTime, name: 'casa/customer/new task' })
          updateCreateTaskSms(activeSMSNumber)
        })
    } else {
      activeSMSNumber.sms = oldestActiveSubscriber
      this.setState({
        sms: activeSMSNumber.sms,
        initState: {
          ...initState,
          sms: activeSMSNumber.sms
        }
      }, () => {
        pushTaskCasePageView({ employeeId, loadTime: Date.now() - startTime, name: 'casa/customer/new task' })
        updateCreateTaskSms(activeSMSNumber)
      })
    }
  }

  validate() {
    const locale = getCasaAppLocale()
    let isAllFieldValid = true
    const fieldValidationState = _.cloneDeep(initFieldValidation)
    const {
      cbr,
      email
    } = this.state
    if (email.length) {
      const atPos = email.indexOf('@')
      const dotPos = email.lastIndexOf('.')
      if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= email.length) {
        fieldValidationState.email.valid = false
        fieldValidationState.email.message = ''
        isAllFieldValid = false
      }
    }
    if (cbr.trim().length) {
      const input = cbr.replace(/\.|-|\s/g, '').trim()
      const isNumeric = NUMERICREGEX.test(input)
      if (!(input.length === 10 && isNumeric)) {
        fieldValidationState.cbr.valid = false
        fieldValidationState.cbr.message = locale.task.form.validation.CBRFieldValidationMsg
        isAllFieldValid = false
      }
    }
    this.setState({ fieldValidation: fieldValidationState })
    return isAllFieldValid
  }

  validateMandatoryFields() {
    let isMandatoryFields = true
    const {
      dueDateStatus
    } = this.props
    const {
      comment,
      cbr,
      selectedRequest,
      selectedType,
      language,
      selectedLOB,
      agentFunction
    } = this.state

    if (!selectedRequest) {
      isMandatoryFields = false
    }
    if (!selectedType) {
      isMandatoryFields = false
    }
    if (!agentFunction) {
      isMandatoryFields = false
    }
    if (!dueDateStatus) {
      isMandatoryFields = false
    }
    if (!language) {
      isMandatoryFields = false
    }
    if (!selectedLOB) {
      isMandatoryFields = false
    }
    if (!comment) {
      isMandatoryFields = false
    }
    if (!cbr.trim().length) {
      isMandatoryFields = false
    }
    return isMandatoryFields
  }

  handleCbrChange(data) {
    const { trackUpdateInFields, updateTracker, tabUniqId } = this.props
    const { fieldValidation, initState } = this.state
    if (!fieldValidation.cbr.valid) {
      fieldValidation.cbr.valid = true
      fieldValidation.cbr.message = ''
    }
    const inputcbr = data.replace(/\.|-|\s/g, '').trim()
    this.setState({ cbr: inputcbr, fieldValidation })
    if (initState.cbr !== inputcbr) {
      if (!updateTracker.cbr) {
        trackUpdateInFields(tabUniqId, 'cbr', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'cbr', false)
    }
  }

  handleEmailChange(data, tooltipVisible) {
    const { trackUpdateInFields, updateTracker, tabUniqId } = this.props
    const { fieldValidation, initState } = this.state
    if (!fieldValidation.email.valid) {
      fieldValidation.email.valid = true
      fieldValidation.email.message = ''
    }
    this.setState({
      email: data,
      fieldValidation,
      emailTooltipVisible: !!tooltipVisible
    })
    if (initState.email !== data) {
      if (!updateTracker.email) {
        trackUpdateInFields(tabUniqId, 'email', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'email', false)
    }
  }

  handleLOBChange(e) {
    const {
      trackUpdateInFields, updateTracker, tabUniqId
    } = this.props
    const { initState } = this.state
    const { value } = e.target
    const fifaEvent = { target: { checked: value === 'HomeSolutions' ? initState.fifaIndicator : false } }
    const setRequestAgent = async () => {
      await this.getRequest(value)
      await this.setAgentFunctionData(value)
      this.requestSubTypes = []
      this.setState({
        selectedLOB: value,
        selectedRequest: '',
        selectedType: '',
        agentFunction: ''
      })
      if (initState.selectedLOB !== value) {
        if (!updateTracker.selectedLOB) {
          trackUpdateInFields(tabUniqId, 'selectedLOB', true)
        }
      } else {
        trackUpdateInFields(tabUniqId, 'selectedLOB', false)
      }
    }
    this.setFifaFunction(fifaEvent)
    setRequestAgent()
  }

  handleCommentChange(event) {
    const { trackUpdateInFields, updateTracker, tabUniqId } = this.props
    const { initState } = this.state
    if (event && event.currentTarget && event.currentTarget.innerText.length >= 0) {
      const formatComment = event.currentTarget.innerText.replace(/'/g, singleQuotes)
      this.setState({ comment: formatComment })
      if (initState.comment !== formatComment) {
        if (!updateTracker.comment) {
          trackUpdateInFields(tabUniqId, 'comment', true)
        }
      } else {
        trackUpdateInFields(tabUniqId, 'comment', false)
      }
    }
  }

  async alterSystemTypeOrLanguageData() {
    const { language } = this.state
    const { billingAcct } = this.props
    this.languageList = await this.getLanguageOrSystem('Language')
    this.setState(prevState => ({
      triggerState: !prevState.triggerState,
      language: language || billingAcct.preferredLanguage
        ? LANGUAGE_MAPPINGS[billingAcct.preferredLanguage]
        : 'English'
    }))
  }

  checkRouteAgentFunction(e) {
    const {
      trackUpdateInFields, updateTracker, tabUniqId
    } = this.props
    const { initState } = this.state
    this.setState({ routeAgentFunction: e.target.checked })
    if (initState.routeAgentFunction !== e.target.checked) {
      if (!updateTracker.routeAgentFunction) {
        trackUpdateInFields(tabUniqId, 'routeAgentFunction', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'routeAgentFunction', false)
    }
  }

  saveTask() {
    const {
      saveStandAloneTask,
      task,
      tabUniqId,
      agentIdentity,
      billingAcct,
      employeeRoles,
      currentCustomer: { isDashboard, isIws }
    } = this.props
    const {
      dueDate,
      dueTime,
      isBusinessHours,
      brand,
      routeAgentFunction,
      selectedType,
      isTOWNCheck,
      townCheckDueDate,
      townCheckDueTime,
      townCheckBusinessHours
    } = this.state

    let assignTo = { id: agentIdentity.employeeId, name: `${agentIdentity.firstName} ${agentIdentity.lastName}` }
    if (routeAgentFunction || selectedType === agentPolicy.APPOINTMENT) {
      assignTo = {
        id: '',
        name: ''
      }
    }
    const createdBy = { id: agentIdentity.employeeId, name: `${agentIdentity.firstName} ${agentIdentity.lastName}` }
    this.closeCalendar()

    if (!this.validate()) {
      this.setState({
        isAllFieldValid: false
      })
      return
    }
    const formatedDate = momentTZ(dueDate)
      .tz(TIMEZONE_MAPPING(billingAcct.timezone || 'MT')).format('YYYY-MM-DD')
    let updatedDate = convertDateTime(dueTime, formatedDate, billingAcct.timezone || 'MT', true)

    let _businessHours = isBusinessHours

    if (isTOWNCheck) {
      _businessHours = townCheckBusinessHours
      const towchCheckformatedDate = momentTZ(townCheckDueDate)
        .tz(TIMEZONE_MAPPING(billingAcct.timezone)).format('YYYY-MM-DD')
      updatedDate = convertDateTime(townCheckDueTime, towchCheckformatedDate, billingAcct.timezone || 'MT', true, true)
    }

    const {
      cbr,
      email,
      sms,
      language,
      comment,
      selectedLOB,
      selectedRequest,
      priority,
      agentFunction,
      fifaIndicator,
      reminderUnit,
      uuid,
      fieldValidation
    } = this.state

    const body = {
      eventType: 'StandAloneTaskCreate',
      domain: 'web',
      description: 'Stand Alone Task',
      timeOccurred: ((new Date()).toISOString()),
      systemSourceId: 'CasaUI',
      externalId: Date.now().toString(),
      event: {
        StandAloneTask: {
          description: 'This description is for stand alone task creation',
          request: selectedRequest,
          priority,
          type: selectedType,
          dueDate: updatedDate,
          timezone: billingAcct.timezone || 'MT',
          isBusinessHours: _businessHours,
          isFIFA: fifaIndicator,
          assignTo,
          routeAgentFunction,
          createdBy,
          language,
          cbr,
          phoneNumber: smsVisiblity(task.lob, selectedLOB) ? sms : undefined,
          email,
          comments: [{
            text: comment,
            createdBy: 'T-989898',
            createdAt: (new Date()).toISOString()
          }],
          lob: selectedLOB,
          accountRef: {
            accountNumber: task.ban.toString(),
            systemId: ''
          },
          brand,
          agentFunction,
          reminderUnit,
          agentRole: JSON.stringify(employeeRoles || [])
        }
      }
    }
    this.setState({

      // taskSaveStatus: 'PENDING',
      // taskClose: true
    }, () => {
      const checkValid = smsVisiblity(task.lob, selectedLOB)
        ? validateSms(sms, selectedLOB) : true
      fieldValidation.sms.valid = checkValid
      this.setState({
        fieldValidation
      })
      if (checkValid) {
        saveStandAloneTask(body, tabUniqId)
        // Push event to adobe to capture time taken by an agent to create standalone task
        const newTaskEndTime = Date.now()
        pushCreateTaskTimeEvent({
          accountInfo: {
            requestType: selectedRequest,
            subType: selectedType,
            lineOfBusiness: selectedLOB.toLowerCase() === 'mobility' ? 'mobility' : 'ffh',
            brand
          },
          endTime: momentTZ(newTaskEndTime).tz(momentTZ.tz.guess()).format('MM/DD/YYYY HH:mm:ss z'),
          startTime: momentTZ(this.newTaskStartTime).tz(momentTZ.tz.guess()).format('MM/DD/YYYY HH:mm:ss z'),
          loadTime: newTaskEndTime - this.newTaskStartTime,
          pageName: getAdobePageName({ isIws, isDashboard }),
          uuid
        })
      }
    })
  }

  selectRequest(ev) {
    const { trackUpdateInFields, updateTracker, tabUniqId } = this.props
    const { initState } = this.state
    const { value } = ev.target
    const setR = async () => {
      await this.getRequestType(value)
      this.setState({
        selectedRequest: value.toString(),
        selectedType: '',
        agentFunction: ''
      }, () => {
        if (this.requestSubTypes && this.requestSubTypes.length === 1) {
          const selectedSubType = this.requestSubTypes[0].value
          const selectedType = { target: { value: selectedSubType } }
          this.selectType(selectedType)
        }
        if (initState.selectedRequest !== value.toString()) {
          if (!updateTracker.selectedRequest) {
            trackUpdateInFields(tabUniqId, 'selectedRequest', true)
          }
        } else {
          trackUpdateInFields(tabUniqId, 'selectedRequest', false)
        }
      })
    }
    setR()
  }

  saveStateSwitchTab(prevState) {
    const { switchTab, task: { taskClose } } = this.props
    const { tabUniqId } = prevState
    const {
      selectedRequest,
      selectedType,
      comment,
      cbr,
      sms,
      email,
      emailTooltipVisible,
      language,
      agentFunction,
      selectedLOB,
      requestSubTypes,
      requestTypes,
      taskSaveStatus,
      minimized,
      index,
      rel,
      dragPosition,
      createTaskCalendar,
      // taskClose,
      brand,
      showCalendar,
      reminderUnit,
      dueDate,
      dueTime,
      isSelectedDate,
      dateTimeSelected,
      isSelectedTime,
      routeAgentFunction,
      fifaIndicator
    } = prevState
    const taskData = {
      selectedRequest,
      minimized,
      index,
      rel,
      dragPosition,
      createTaskCalendar,
      selectedType,
      comment,
      cbr,
      sms,
      email,
      emailTooltipVisible,
      language,
      agentFunction,
      selectedLOB,
      requestSubTypes,
      requestTypes,
      tabUniqId,
      saveTaskStatus: taskSaveStatus,
      brand,
      showCalendar,
      reminderUnit,
      dueDate,
      dueTime,
      isSelectedDate,
      dateTimeSelected,
      isSelectedTime,
      routeAgentFunction,
      fifaIndicator
    }

    if (!taskClose) {
      switchTab(tabUniqId, taskData)
    }
  }

  alterLOBOptionsData() {
    const lobList = []
    const { taskCascadeMenuItemList } = this.props
    const { formData } = getCasaAppLocale().task
    const {
      brand, selectedLOB, selectedRequest
    } = this.state
    if (taskCascadeMenuItemList && taskCascadeMenuItemList.length) {
      taskCascadeMenuItemList.forEach((brandObj) => {
        if (brandObj.key === brand.toUpperCase() && brandObj.lob && brandObj.lob.length) {
          brandObj.lob.forEach((lb) => {
            lobList.push(
              { value: lb.key, text: formData.lob[lb.key] }
            )
          })
        }
      })
    }

    const callRequestTypeAgent = async () => {
      await this.getRequest(selectedLOB)
      await this.setAgentFunctionData(selectedLOB)
      await this.getRequestType(selectedRequest)
      this.lobList = lobList
      this.setState(prevState => ({ triggerState: !prevState.triggerState }))
    }
    callRequestTypeAgent()
  }

  openCalendar(xValue,
    yValue,
    calendarTime,
    source,
    calendarDate,
    isBusiness,
    isTOWNCheck) {
    if (calendarTime) {
      this.setState({
        dueTime: calendarTime.trim()
      })
    }

    if (source === 'taskCreation') {
      this.setState({
        dueDate: calendarDate,
        dueTime: calendarTime,
        isBusinessHours: isBusiness,
        isTOWNCheck
      })
    }
    if (isTOWNCheck) {
      this.setState({
        defaultDueDate: calendarDate,
        defaultDueTime: calendarTime
      })
    } else {
      this.setState({
        dueDate: calendarDate,
        dueTime: calendarTime,
        defaultDueDate: calendarDate
      })
    }
    this.setState({
      datePositionX: xValue,
      datePositionY: yValue,
      showCalendar: true,
      isTOWNCheck
    })
  }

  closeCalendar() {
    const {
      dueTime,
      isBusinessHours,
      createTaskCalendar: {
        dueDate,
        townCheckBusinessHours
      }
    } = this.state

    this.setState({
      showCalendar: false,
      createTaskCalendar: {
        dueDate,
        dueTime,
        isBusinessHours,
        isChanged: false,
        errorMessage: '',
        timeErrorMessage: '',
        townCheckBusinessHours
      }
    })
  }

  changeDueDateStatus(status) {
    const { initState } = this.state
    const {
      tabUniqId, changeDueDateStatus, trackUpdateInFields, updateTracker
    } = this.props
    changeDueDateStatus(tabUniqId, status)
    if (initState.dueDateStatus !== status) {
      if (!updateTracker.dueDateStatus) {
        trackUpdateInFields(tabUniqId, 'dueDateStatus', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'dueDateStatus', false)
    }
  }

  saveDueDate(selectedDate, selectedTime, isSelectedBusinessHours, calendarSource, isTOWNCheck) {
    const { billingAcct, switchTab } = this.props
    // const timeZoneBanDiff = momentTZ().tz(TIMEZONE_MAPPING(billingAcct.timezone)).format('Z')
    this.setState({
      isTOWNCheck
    })
    if (isTOWNCheck) {
      this.setState({
        isTownCheckDateChanged: true
      })
    } else {
      this.setState({
        isDateChanged: true
      })
    }
    const timeZoneAgentDiff = momentTZ().tz(momentTZ.tz.guess()).format('Z')
    let updateSelectedTime = convertDateTime(selectedTime, momentTZ(selectedDate)
      .tz(TIMEZONE_MAPPING(billingAcct.timezone || 'MT')).format('YYYY-MM-DD'), billingAcct.timezone || 'MT', true)
    if (selectedDate && typeof (selectedDate) === 'string' && selectedDate.endsWith(timeZoneAgentDiff)) {
      updateSelectedTime = convertDateTime(selectedTime, momentTZ(selectedDate)
        .format('YYYY-MM-DD'), billingAcct.timezone || 'MT', true)
    }
    if (selectedDate && selectedDate instanceof Object
        && selectedDate.format().endsWith(timeZoneAgentDiff)) {
      updateSelectedTime = convertDateTime(selectedTime, momentTZ(selectedDate)
        .format('YYYY-MM-DD'), billingAcct.timezone || 'MT', true)
    }
    // convertDateTime(selectedTime, momentTZ(selectedDate)
    // .format('YYYY-MM-DD'), billingAcct.timezone, true)
    const {
      updateDateTime,
      setDueDateTime,
      tabUniqId,
      updateCalendar,
      trackUpdateInFields,
      updateTracker
    } = this.props
    const {
      initState, createTaskCalendar: {
        dueDate,
        dueTime,
        isBusinessHours,
        timeErrorMessage
      }
    } = this.state
    updateDateTime(tabUniqId,
      updateSelectedTime,
      selectedTime, isSelectedBusinessHours, true, isTOWNCheck)
    if (isTOWNCheck) {
      this.setState({
        dateTimeSelected: true,
        townCheckDueDate: updateSelectedTime,
        defaultDueDate: updateSelectedTime,
        defaultDueTime: selectedTime,
        townCheckDueTime: selectedTime,
        townCheckBusinessHours: isSelectedBusinessHours,
        showCalendar: false,
        calendarDetails: {
          dueTime: selectedTime,
          isBusinessHours: isSelectedBusinessHours
        },
        createTaskCalendar: {
          dueDate,
          dueTime,
          isBusinessHours,
          townCheckBusinessHours: isSelectedBusinessHours
        }
      })
    } else {
      this.setState({
        dateTimeSelected: true,
        dueTime: selectedTime,
        dueDate: updateSelectedTime,
        isBusinessHours: isSelectedBusinessHours,
        showCalendar: false,
        calendarDetails: {
          dueDate: updateSelectedTime,
          dueTime: selectedTime,
          isBusinessHours: isSelectedBusinessHours
        }
      })
    }
    const taskData = {
      showCalendar: false,
      townCheckBusinessHours: isSelectedBusinessHours,
      createTaskCalendar: {
        townCheckBusinessHours: isSelectedBusinessHours,
        dueTime,
        dueDate,
        isBusinessHours,
        timeErrorMessage
      }
    }
    switchTab(tabUniqId, taskData)
    updateCalendar(tabUniqId, 'taskForm', updateSelectedTime, selectedTime, isSelectedBusinessHours, isTOWNCheck)
    if (calendarSource === 'taskCreation') {
      setDueDateTime(
        tabUniqId,
        updateSelectedTime,
        selectedTime,
        isSelectedBusinessHours
      )
    }

    if (momentTZ(initState.dueDate).format('MM/DD/YYYY') !== momentTZ(updateSelectedTime).format('MM/DD/YYYY')) {
      if (!updateTracker.dueDate) {
        trackUpdateInFields(tabUniqId, 'dueDate', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'dueDate', false)
    }
    if (initState.dueTime !== selectedTime) {
      if (!updateTracker.dueDate) {
        trackUpdateInFields(tabUniqId, 'dueTime', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'dueTime', false)
    }
    if (initState.isBusinessHours !== isSelectedBusinessHours) {
      if (!updateTracker.isBusinessHours) {
        trackUpdateInFields(tabUniqId, 'isBusinessHours', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'isBusinessHours', false)
    }
  }

  convertDateLanguage(newDate) {
    const month = newDate.split(' ')[1]
    const date = newDate.split(' ')[0]
    const year = newDate.split(' ')[2]
    const _month = convertMonthToEnglish(month)
    const finalDate = `${_month} ${date}, ${year}`
    return finalDate
  }

  selectType(ev) {
    const {
      trackUpdateInFields,
      updateTracker,
      tabUniqId,
      udItemList: { subtype },
      taskCascadeMenuItemList,
      billingAcct,
      updateTownCheckDate
    } = this.props
    const {
      initState, selectedLOB, brand, selectedRequest,
      dueDate, isDateChanged
    } = this.state
    const { value } = ev.target
    const agentPriorityReminder = this.getAgentPriorityReminderForSubtype(value)
    const _subRequestTypeDefaultDate = getSubTypeDefaultDueDate({
      type: 'subtype', reqtype: selectedRequest, selLOB: selectedLOB, brand, taskCascadeMenuItemList, subtype, _subType: value
    })
    this.setState({
      selectedType: value,
      priority: agentPriorityReminder.priority,
      agentFunction: agentPriorityReminder.agentFunction,
      reminderUnit: agentPriorityReminder.reminderUnit,
      subRequestTypeDefaultDate: _subRequestTypeDefaultDate,
      isTownCheckDateChanged: false
    })
    if (value === 'TOWNcheck' || value === 'PostToPreMigrations') {
      this.changeDueDateStatus(true)
      const newDate = getSubTypeDateFormat(dueDate,
        false,
        _subRequestTypeDefaultDate,
        billingAcct.timezone || 'MT', true)

      const newTime = getSubTypeTimeFormat(_subRequestTypeDefaultDate._defaultTime)
      const d = getSubTypeDateFormat(momentTZ(this.convertDateLanguage(newDate)).format('ll'),
        false,
        _subRequestTypeDefaultDate,
        billingAcct.timezone, true)
      const townCheckFormatedDate = moment(this.convertDateLanguage(d)).format('YYYY-MM-DD')
      const townCheckMomentDate = momentTZ(townCheckFormatedDate).format('YYYY-MM-DD')
      const convertedDate = convertDateTime(newTime, townCheckMomentDate, 'MT', true)

      this.setState({
        isTOWNCheck: true,
        townCheckDueDate: convertedDate,
        townCheckDueTime: newTime,
        townCheckBusinessHours: true,
        defaultDueDate: momentTZ(newDate).format(),
        defaultDueTime: newTime
      })
      updateTownCheckDate(tabUniqId, convertedDate, true,
        _subRequestTypeDefaultDate)
    } else {
      if (!isDateChanged) {
        this.changeDueDateStatus(false)
        this.setState({
          isSelectedDate: false,
          isSelectedTime: false
        })
      } else {
        this.changeDueDateStatus(true)
      }
      this.setState({
        isTOWNCheck: false
      })
    }
    if (initState.selectedType !== value) {
      if (!updateTracker.selectedType) {
        trackUpdateInFields(tabUniqId, 'selectedType', true)
      }
    } else {
      trackUpdateInFields(tabUniqId, 'selectedType', false)
    }
  }

  updateTaskDetailHandler(item) {
    const {
      detail: { id }, updateTaskDetail, tabUniqId
    } = this.props
    this.setState({
      ...item
    })
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
      updateTaskDetail({
        values: valuesObj,
        id,
        tabId: tabUniqId,
        type: 'task-create',
        parent: 'modifieable'
      })
    }
  }

  removeTaskPopupHandler() {
    const {
      updateTracker:
      {
        selectedRequest, comment, cbr, email, selectedLOB, agentFunction,
        language, dueDate, dueTime, isBusinessHours, dueDateStatus, sms,
        routeAgentFunction, fifaIndicator
      },
      trackCloseModal, tabUniqId
    } = this.props
    let expression = false
    if (fifaIndicator !== undefined) {
      expression = expression || fifaIndicator
    }
    if (selectedRequest !== undefined) {
      expression = expression || selectedRequest
    }
    if (comment !== undefined) {
      expression = expression || comment
    }
    if (cbr !== undefined) {
      expression = expression || cbr
    }
    if (sms !== undefined) {
      expression = expression || sms
    }
    if (email !== undefined) {
      expression = expression || email
    }
    if (selectedLOB !== undefined) {
      expression = expression || selectedLOB
    }
    if (agentFunction !== undefined) {
      expression = expression || agentFunction
    }
    if (dueDate !== undefined) {
      expression = expression || dueDate
    }
    if (dueTime !== undefined) {
      expression = expression || dueTime
    }
    if (isBusinessHours !== undefined) {
      expression = expression || isBusinessHours
    }
    if (dueDateStatus !== undefined) {
      expression = expression || dueDateStatus
    }
    if (language !== undefined) {
      expression = expression || language
    }
    if (routeAgentFunction !== undefined) {
      expression = expression || routeAgentFunction
    }
    if (expression) {
      trackCloseModal(tabUniqId, expression)
    } else {
      this.closeHandler()
    }
  }

  returnAndSaveHandler() {
    const { trackCloseModal, tabUniqId } = this.props
    trackCloseModal(tabUniqId, false)
  }

  closeHandler() {
    const {
      removeTaskDetail, detail: { id }, tabUniqId, closeForm,
      trackCloseModal
    } = this.props
    // this.setState({ taskClose: true }, () => {
    trackCloseModal(tabUniqId, false)
    closeForm(tabUniqId)
    this.closeCalendar()
    removeTaskDetail({
      tabId: tabUniqId,
      type: 'task-create',
      id
    })
    // })
  }

  removeCloseModalHandler() {
    const { trackCloseModal, tabUniqId } = this.props
    trackCloseModal(tabUniqId, false)
  }

  rightAlignhandler(val) {
    this.setState({ rightAlignPosition: val })
  }

  updateCreateTaskCalendar(data, isTownCheck) {
    const { billingAcct, dueTime } = this.props
    const { dueDate, createTaskCalendar: { townCheckBusinessHours } } = this.state
    // const timeZoneBanDiff = momentTZ().tz(TIMEZONE_MAPPING(billingAcct.timezone)).format('Z')
    const timeZoneAgentDiff = momentTZ().tz(momentTZ.tz.guess()).format('Z')
    let selectedTime = convertDateTime(data.dueTime, momentTZ(data.dueDate)
      .tz(TIMEZONE_MAPPING(billingAcct.timezone || 'MT')).format('YYYY-MM-DD'), billingAcct.timezone || 'MT', true)
    if (data.dueDate && typeof (data.dueDate) === 'string' && data.dueDate.endsWith(timeZoneAgentDiff)) {
      selectedTime = convertDateTime(data.dueTime, momentTZ(data.dueDate)
        .format('YYYY-MM-DD'), billingAcct.timezone || 'MT', true)
    }
    if (isTownCheck) {
      this.setState({
        createTaskCalendar: {
          dueDate,
          dueTime,
          townCheckBusinessHours: data.isBusinessHours,
          isChanged: data.isChanged,
          errorMessage: data.errorMessage,
          timeErrorMessage: data.timeErrorMessage,
          isTownCheckChanged: data.isTownCheckChanged,
          townCheckDueDate: data.dueDate,
          townCheckDueTime: data.dueTime
        }
      })
    } else {
      this.setState({
        createTaskCalendar: {
          dueDate: selectedTime,
          dueTime: data.dueTime,
          isBusinessHours: data.isBusinessHours,
          isChanged: data.isChanged,
          errorMessage: data.errorMessage,
          timeErrorMessage: data.timeErrorMessage,
          townCheckBusinessHours,
          isTownCheckChanged: false,
          townCheckDueDate: selectedTime,
          townCheckDueTime: data.dueTime
        }
      })
    }
  }

  render() {
    const locale = getCasaAppLocale()
    const currentLocaleLang = momentTZ.locale()
    this.taskTabs = [
      {
        id: 'new_task_details',
        template: <Text>{locale.case.caseTabs.details}</Text>,
        label: 'details',
        tabWidth: '100%'
      }
    ]
    const {
      detail: {
        isOpen, dimensions, modifieable, highestZindex, type, highestPosition,
        isDraggable
      },
      taskUDTypeDataStatus,
      taskSaveStatus,
      task,
      taskCascadeMenuItemListStatus,
      dueTime,
      dueDate,
      dueDateStatus,
      billingAcct,
      switchTab,
      tabIdDetail,
      trackUpdateInFields,
      updateTracker,
      closeModalStatus
    } = this.props
    const {
      dragPosition, rel, index,
      minimized,
      selectedRequest,
      selectedType,
      comment,
      fieldValidation,
      cbr,
      email,
      selectedLOB,
      language,
      showCalendar,
      isBusinessHours,
      datePositionX,
      datePositionY,
      agentFunction,
      fifaIndicator,
      calendarDetails,
      tabUniqId,
      rightAlignPosition,
      brand,
      createTaskCalendar,
      emailTooltipVisible,
      isSelectedDate,
      isSelectedTime,
      dateTimeSelected,
      sms,
      routeAgentFunction,
      isTOWNCheck,
      townCheckDueDate,
      townCheckDueTime,
      townCheckBusinessHours,
      subRequestTypeDefaultDate,
      isTownCheckDateChanged,
      defaultDueDate,
      defaultDueTime
    } = this.state

    const sourceCalendar = 'taskForm'
    const dateTime = `${moment(dueDate).locale(moment().locale()).format('MMM D, YYYY,')} ${dueTime}`
    const checkboxName = 'create'
    const requestOptions = {
      id: 'request-type',
      placeholder: locale.task.form.placeHolder.defaultSelectDropDownTxtRequest,
      options: (this.requestType || []),
      value: selectedRequest,
      onChange: (this.selectRequest),
      label: locale.task.form.taskRequest,
      mandatory: true
    }
    const typeOptions = {
      id: 'request-subtype',
      placeholder: locale.task.form.placeHolder.defaultSelectDropDownTxtType,
      options: this.requestSubTypes || [],
      value: selectedType,
      onChange: this.selectType,
      label: locale.task.form.tasktype,
      mandatory: true
    }
    const agentOptions = {
      id: 'agent-function',
      placeholder: locale.task.form.placeHolder.defaultSelectDropDownAgentFunction,
      options: this.agentFunctionList,
      value: agentFunction,
      onChange: this.setAgentFunction,
      label: locale.task.form.agentFunction,
      borderLess: true,
      mandatory: true,
      isLabel: false
    }
    const fifaOptions = {
      id: 'fifa-option',
      value: fifaIndicator,
      onChange: this.setFifaFunction,
      label: locale.task.form.fifaIndicator,
      isVisible: selectedLOB === 'HomeSolutions'
    }
    const dueDateOptions = {
      label: locale.task.dueDate,
      id: 'task-calendar',
      value: dueDateStatus ? dateTime : '',
      dueTime,
      dueDate,
      isBusinessHours,
      mandatory: true
    }

    const townCheckdueDateOptions = {
      label: locale.task.dueDate,
      id: 'task-calendar',
      value: dueDateStatus ? `${momentTZ(townCheckDueDate).format('MMM D, YYYY,')}` : '',
      dueTime: townCheckDueTime,
      dueDate: townCheckDueDate,
      isBusinessHours: townCheckBusinessHours,
      mandatory: true
    }

    const addCommentOptions = {
      id: 'task-comment',
      placeholder: locale.task.form.placeHolder.defaultTextboxTxtComment,
      value: comment,
      onChange: this.handleCommentChange,
      label: locale.task.form.comments,
      mandatory: true,
      isVisible: true
    }
    const cbrOptions = {
      id: 'cbr_typed_select_cbr',
      value: cbr,
      onChange: this.handleCbrChange,
      label: locale.task.form.CBR,
      isValid: !fieldValidation.cbr.valid,
      isInputDisabled: false,
      isVisible: true
    }
    const emailOptions = {
      id: 'new-task-email',
      value: email,
      onChange: this.handleEmailChange,
      label: locale.task.form.Email,
      isValid: !fieldValidation.email.valid,
      isInputDisabled: false,
      tooltipVisible: emailTooltipVisible,
      isVisible: true,
      isUpdated: updateTracker.email
    }
    const languageOptions = {
      id: 'new-task-language',
      label: locale.task.form.customerLanguage,
      options: this.languageList || [],
      onChange: this.setLanguageOption,
      value: language,
      isLabel: false
    }

    const smsOptions = {
      id: 'new-task-sms',
      value: sms,
      onChange: this.handleSmsChange,
      label: locale.case.sms,
      isValid: !fieldValidation.sms.valid,
      isInputDisabled: false,
      visible: smsVisiblity(task.lob, selectedLOB),
      fetchSmsStatus: task.fetchSmsStatus
    }

    const routeOptions = {
      id: 'route-agents',
      value: routeAgentFunction,
      onChange: this.checkRouteAgentFunction,
      label: locale.task.form.routeAgents
    }

    const footerContent = !minimized && (
      <FooterContent minimized={minimized}>
        <HairlineDivider />
        <FooterContentInner
          minimized={minimized} localLang={currentLocaleLang}
          resTimeout={task.responseTimeOut}
        >
          <CasaBox display="flex">
            <CasaBox display="flex" flexDirection="row" justifyContent="flex-end" alignItems="center">
              <CasaBox display="flex" flexDirection="column" mr="10px">
                {
              taskSaveStatus === 'ERROR' && !task.responseTimeOut && (
                <ErrorContent localLang={currentLocaleLang} type="error">
                  <Notification variant="error" copy="en">
                    <Text>{locale.task.warningMsgs.taskNotCreate}</Text>
                  </Notification>
                </ErrorContent>
              )
            }
                {
              taskSaveStatus === 'ERROR' && task.responseTimeOut && (
                <ErrorContent localLang={currentLocaleLang}>
                  <Notification variant="warning" copy="en">
                    <Text>{locale.task.warningMsgs.taskTimeOut}</Text>
                  </Notification>
                </ErrorContent>
              )
            }
              </CasaBox>
              <CasaBox display="flex" flexDirection="column">
                <Spinner
                  spinning={taskSaveStatus === 'PENDING'}
                  size="small"
                  label={locale.task.spinnerMsg.taskSavingRequestMsg}
                  inline
                >
                  <SaveButton
                    id="save-task"
                    onClick={this.saveTask}
                    disabled={!this.validateMandatoryFields()}
                    taskTimeOut={task.responseTimeOut || taskSaveStatus === 'ERROR'}
                  >
                    {task.responseTimeOut ? locale.task.buttons.retry : locale.task.buttons.submit}
                  </SaveButton>
                </Spinner>
              </CasaBox>
            </CasaBox>
          </CasaBox>
        </FooterContentInner>
      </FooterContent>
    )
    const bodyContent = (
      <TaskBody
        dimensions={dimensions}
        minimized={minimized}
        onBlur={this.onFocusOut}
      >
        {
          showCalendar
            ? (
              <DueDateModal positionX={datePositionX} positionY={datePositionY}>
                <CalendarModal
                  key={`${tabUniqId}_taskcreate`}
                  calendarClose={this.closeCalendar}
                  dueDate={dueDate}
                  dueTime={dueTime}
                  dateTimeSelected={dateTimeSelected}
                  isSelectedDate={isSelectedDate}
                  isSelectedTime={isSelectedTime}
                  updateDate={val => this.setState({ isSelectedDate: val })}
                  updateTime={val => this.setState({ isSelectedTime: val })}
                  isBusiness={isBusinessHours}
                  saveDueDate={this.saveDueDate}
                  changeDueDateStatus={this.changeDueDateStatus}
                  dueDateStatus={dueDateStatus}
                  sourceOpen={sourceCalendar}
                  checkboxName={checkboxName}
                  calendarDetails={calendarDetails}
                  switchTab={switchTab}
                  createTaskCalendar={createTaskCalendar}
                  updateCreateTaskCalendar={this.updateCreateTaskCalendar}
                  trackUpdateInFields={trackUpdateInFields}
                  updateTracker={updateTracker || false}
                  enableSave={(isSelectedDate && isSelectedTime) || isTOWNCheck}
                  timezone={billingAcct.timezone || 'MT'}
                  isTOWNCheck={isTOWNCheck}
                  defaultDueDate={townCheckDueDate}
                  defaultDueTime={townCheckDueTime}
                  townCheckDefaultDate={defaultDueDate}
                  townCheckDefaultTime={defaultDueTime}
                />
              </DueDateModal>
            )
            : null
        }
        {
          taskCascadeMenuItemListStatus === 'PENDING' && taskUDTypeDataStatus === 'PENDING'
            ? (
              <Spinner spinning label={locale.task.spinnerMsg.loadingRequestTypeMsg} />
            )
            : (
              <GridContainer>
                <CardSection>
                  <LeftContainer>
                    <Box>
                      <LobWrapper>
                        {brand === 'koodo' ? <Koodo /> : <Telus />}
                        <CasaBox mt="8px">
                          <SelectInput
                            id="task-create-lob"
                            options={this.lobList || []}
                            onChange={this.handleLOBChange}
                            value={selectedLOB}
                            borderLess={true}
                            placeholder={locale.task.form.selectBtn}
                          />
                        </CasaBox>
                      </LobWrapper>
                      <CustomerDetailComponent
                        key={`${tabUniqId}_create_custDetails`}
                        billingAccountName={billingAcct.billingAccountName}
                        billingAcctNum={billingAcct.billingAcctNum}
                        cbr={cbrOptions}
                        email={emailOptions}
                        language={languageOptions}
                        isCardEditable={true}
                        sms={smsOptions}
                        editIconVisible={true}
                      />
                    </Box>
                  </LeftContainer>
                </CardSection>
                <TaskSection>
                  <DetailsSection className="details">
                    <ContentTabs
                      key="task_detail_modal_tabs_"
                      id="task_detail_modal_tabs_"
                      tabs={this.taskTabs}
                      activeTab={this.taskTabs[0]}
                      handleTabClick={() => { }}
                      regular={true}
                    />
                    <RightContainer>
                      <DetailComponent
                        key={`${tabUniqId}_create_formcomp`}
                        requestOptions={requestOptions}
                        subRequestTypeDefaultDate={subRequestTypeDefaultDate}
                        typeOptions={typeOptions}
                        fifaOptions={fifaOptions}
                        agentOptions={agentOptions}
                        dueDateOptions={dueDateOptions}
                        openCalendar={this.openCalendar}
                        addCommentOptions={addCommentOptions}
                        type={type}
                        timezone={billingAcct.timezone || 'MT'}
                        routeOptions={routeOptions}
                        parentComp="taskCreate"
                        _isTOWNcheck={isTOWNCheck}
                        SubTypeDateFormatCalendarDate={this.SubTypeDateFormatCalendarDate}
                        townCheckdueDateOptions={townCheckdueDateOptions}
                        getSubTypeDateFormat={getSubTypeDateFormat(townCheckdueDateOptions.dueDate,
                          dueDateOptions.isWarning,
                          subRequestTypeDefaultDate,
                          billingAcct.timezone || 'MT', isTOWNCheck, isTownCheckDateChanged)}
                      />
                    </RightContainer>
                  </DetailsSection>
                </TaskSection>
              </GridContainer>
            )
        }
      </TaskBody>
    )

    const headerContent = (
      <FlexGrid.Row distribute="between">
        <FlexGrid.Col xs={7} md={7} horizotalAlign="left">
          <EllipsesText>
            <Text>
              <MediumWeightText>
                {locale.task.taskCreation.subject}
              </MediumWeightText>
            </Text>
          </EllipsesText>
        </FlexGrid.Col>
      </FlexGrid.Row>
    )

    return (
      <>
        <PopupContainer
          posX={dragPosition.x}
          style={{
            left: minimized ? 'auto' : (dragPosition.x || `${((window.innerWidth - 988) / 2)}px`),
            right: rightAlignPosition,
            top: minimized ? 'auto' : (dragPosition.y || `${((window.innerHeight - 540) / 2)}px`),
            zIndex: index
          }}
          ref={this.popupContainer}
          minimized={minimized}
        >
          <DetailsPopup
            isOpen={isOpen}
            minimized={minimized}
            closeHandler={this.removeTaskPopupHandler}
            modifieable={{
              showMinimizeIcon: modifieable.showMinimizeIcon,
              showCloseIcon: taskSaveStatus !== 'PENDING',
              showFooter: modifieable.showFooter,
              showHeader: modifieable.showHeader,
              showBody: modifieable.showBody
            }}
            updateDetail={this.updateTaskDetailHandler}
            highestZindex={highestZindex}
            highestPosition={highestPosition}
            footerContent={footerContent}
            bodyContent={bodyContent}
            containerRef={this.popupContainer}
            rel={rel}
            dimensions={dimensions}
            index={index}
            headerContent={headerContent}
            tabIdDetail={tabIdDetail}
            type={type}
            rightAlignhandler={this.rightAlignhandler}
            isDraggable={isDraggable}
          />
        </PopupContainer>
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
      </>
    )
  }
}

Task.propTypes = {
  detail: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  updateTaskDetail: PropTypes.func.isRequired,
  removeTaskDetail: PropTypes.func.isRequired,
  billingAcct: PropTypes.object.isRequired,
  getTaskUDList: PropTypes.func.isRequired,
  saveStandAloneTask: PropTypes.func.isRequired,
  taskSaveStatus: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
  switchTab: PropTypes.func.isRequired,
  setDueDateTime: PropTypes.func.isRequired,
  getTaskCascadeList: PropTypes.func.isRequired,
  taskUDTypeData: PropTypes.object.isRequired,
  agentIdentity: PropTypes.object.isRequired,
  taskUDTypeDataStatus: PropTypes.string.isRequired,
  taskCascadeMenuItemList: PropTypes.array.isRequired,
  taskCascadeMenuItemListStatus: PropTypes.string.isRequired,
  updateDateTime: PropTypes.func.isRequired,
  dueTime: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  changeDueDateStatus: PropTypes.func.isRequired,
  dueDateStatus: PropTypes.bool.isRequired,
  cbrOptions: PropTypes.array.isRequired,
  updateCalendar: PropTypes.func.isRequired,
  tabIdDetail: PropTypes.array.isRequired,
  email: PropTypes.string.isRequired,
  updateTracker: PropTypes.object.isRequired,
  trackUpdateInFields: PropTypes.func.isRequired,
  trackCloseModal: PropTypes.func.isRequired,
  closeModalStatus: PropTypes.bool.isRequired,
  updateCreateTaskSms: PropTypes.func.isRequired,
  routeAgentFunction: PropTypes.bool.isRequired,
  employeeRoles: PropTypes.array.isRequired,
  tabUniqId: PropTypes.string.isRequired,
  currentCustomer: PropTypes.object.isRequired,
  udItemList: PropTypes.object.isRequired,
  updateTownCheckDate: PropTypes.func.isRequired,
  banDetails: PropTypes.object.isRequired,
  oldestActiveSubscriber: PropTypes.string.isRequired
}

export default Task
