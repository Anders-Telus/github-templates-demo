import { connect } from 'react-redux'
import moment from 'moment'
import {
  compose
} from '@telus/isomorphic-core'

import view from './view'

import {
  getTaskData,
  getTaskUDTypeData,
  getTaskUDTypeStatus,
  getTaskCascadeMenuItemList,
  getTaskCascadeMenuItemListStatus,
  getCreateTaskIndex,
  pendingMoveOrProvideOrderExists,
  getCloseModalStatus,
  getUpdateTracker,
  getUdItemListData
} from '../../../../services/task/selectors'
import { getCurrentTabCustomer } from '../../../../services/tabs/selectors'
import {
  getTaskCascadeData, saveStandAloneTask, switchTabUpdateTask, closeTaskForm,
  getTaskUDData, updateDateTime,
  changeDueDateStatusAction, updateCalendar, setCalendarValues, trackCloseModal,
  trackUpdateInFields, updateCreateTaskSms, updateTownCheckDate
} from '../../../../services/task/actions'
import { getAgentIdentity } from '../../../../services/agent/selectors'
import { getUpliftBanDetails, getCBROptionList, getBanDetails } from '../../../../services/ban/selectors'
import { banFifaIndicator, getOldestActiveSubscriber } from '../../../../services/product/selectors'
import { getDetailItemByTabId, getTabId } from '../../../../services/detailPopups/selectors'
import getAuthData from '../../../../services/auth/selectors'
import {
  removeDetail,
  updateDetail
} from '../../../../services/detailPopups/actions'

const mapDispatchToProps = dispatch => ({
  getTaskUDList: (tabUniqId) => {
    dispatch(getTaskUDData(tabUniqId))
  },
  saveStandAloneTask: (body, tabUniqId) => dispatch(saveStandAloneTask(body, tabUniqId)),
  updateTownCheckDate: (tabUniqId, townCheckDate, isTownCheckDateChanged,
    subRequestTypeDefaultDate) => {
    return dispatch(updateTownCheckDate(tabUniqId, townCheckDate, isTownCheckDateChanged,
      subRequestTypeDefaultDate))
  },
  switchTab: (tabUniqId, taskData) => {
    dispatch(switchTabUpdateTask(tabUniqId, taskData))
  },
  closeForm: tabUniqId => dispatch(closeTaskForm(tabUniqId)),
  getTaskCascadeList: (tabUniqId) => {
    dispatch(getTaskCascadeData(tabUniqId))
  },
  updateDateTime: (tabUniqId, date, time, isBusiness, status, isTOWNCheck) => {
    return dispatch(updateDateTime(tabUniqId, date, time, isBusiness, status, isTOWNCheck))
  },
  changeDueDateStatus: (tabUniqId, minimized) => {
    dispatch(changeDueDateStatusAction(tabUniqId, minimized))
  },
  updateCalendar: (tabUniqId, form, dueDate, dueTime, isBusiness, isTOWNCheck) => {
    dispatch(updateCalendar(tabUniqId, form, dueDate, dueTime, isBusiness, isTOWNCheck))
  },
  setDueDateTime: (tabUniqId, selectedDate, selectedTime, isSelectedBusinessHours) => {
    dispatch(setCalendarValues(tabUniqId, selectedDate, selectedTime, isSelectedBusinessHours))
  },
  updateTaskDetail: (detail) => {
    dispatch(updateDetail(detail))
  },
  removeTaskDetail: (detail) => {
    dispatch(removeDetail(detail))
  },
  trackUpdateInFields: (tabUniqId, type, status) => {
    dispatch(trackUpdateInFields(tabUniqId, type, status))
  },
  trackCloseModal: (tabUniqId, status) => {
    dispatch(trackCloseModal(tabUniqId, status))
  },
  updateCreateTaskSms: (payload) => {
    dispatch(updateCreateTaskSms(payload))
  }
})

const mapStateToProps = (state, props) => {
  const currentCustomer = getCurrentTabCustomer(state)
  const { tabUniqId } = currentCustomer
  const task = getTaskData(state) && getTaskData(state)[tabUniqId]
  && getTaskData(state)[tabUniqId].taskForm
  const taskUDTypeData = getTaskUDTypeData(state)
  const taskUDTypeDataStatus = getTaskUDTypeStatus(state)
  const taskSaveStatus = getTaskData(state)[tabUniqId].taskForm.saveTaskStatus
  const calendarStatus = getTaskData(state)[tabUniqId].taskForm.showCalendar
  const agentIdentity = getAgentIdentity(state)
  const zIndex = getCreateTaskIndex(state)
  const { minimized } = getTaskData(state)[tabUniqId].taskForm
  const { employeeRoles, applicationPolicies } = getAuthData(state)
  const {
    dueDateStatus,
    dueDate,
    dueTime,
    isBusinessHours
  } = getTaskData(state)[tabUniqId].taskForm
  const cascadeMenuItems = getTaskCascadeMenuItemList(state)
  const taskCascadeMenuItemList = JSON.parse(JSON.stringify(cascadeMenuItems))
  const taskCascadeMenuItemListStatus = getTaskCascadeMenuItemListStatus(state)
  // temporarily remove PRE Activation, PRE Billing, PRE Follow-up
  if (taskCascadeMenuItemListStatus === 'SUCCESS') {
    const telusItem = taskCascadeMenuItemList.findIndex(t => t.key && t.key.toLowerCase() === 'telus')
    if (telusItem !== -1) {
      const lobMobility = taskCascadeMenuItemList[telusItem].lob
        && Array.isArray(taskCascadeMenuItemList[telusItem].lob)
        && taskCascadeMenuItemList[telusItem].lob.findIndex(l => l.key && l.key.toLowerCase() === 'mobility')
      if (lobMobility !== -1) {
        const preActivation = taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType
          && Array.isArray(taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType)
          && taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType.findIndex(r => r.key && r.key.toLowerCase() === 'preactivation')
        taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType.splice(preActivation, 1)
        const preFollowup = taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType
          && Array.isArray(taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType)
          && taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType.findIndex(r => r.key && r.key.toLowerCase() === 'prefollowup')
        taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType.splice(preFollowup, 1)
        const preBilling = taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType
          && Array.isArray(taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType)
          && taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType.findIndex(r => r.key && r.key.toLowerCase() === 'prebilling')
        taskCascadeMenuItemList[telusItem].lob[lobMobility].requestType.splice(preBilling, 1)
      }
    }
  }
  const {
    formData,
    closeTask,
    openCalendar,
    closeCalendar
  } = props
  const billingAcct = getUpliftBanDetails(state)(task.ban, tabUniqId)
  const detail = getDetailItemByTabId(state, tabUniqId, 'task-create')

  let tabIdDetail = getTabId(state, tabUniqId)
  if (tabIdDetail) {
    tabIdDetail = tabIdDetail.toJS()
  }
  const updateTracker = getUpdateTracker(state, tabUniqId)
  const closeModalStatus = getCloseModalStatus(state, tabUniqId)
  const udItemList = getUdItemListData(state)
  const banDetails = getBanDetails(state)(task.ban)
  const oldestActiveSubscriber = getOldestActiveSubscriber(state)(task.ban)
  return {
    formData,
    taskUDTypeData,
    taskUDTypeDataStatus,
    taskSaveStatus,
    task,
    closeTask,
    dueDateStatus,
    openCalendar,
    dueDate: moment(dueDate).format(),
    dueTime,
    isBusinessHours,
    closeCalendar,
    taskCascadeMenuItemList,
    agentIdentity,
    taskCascadeMenuItemListStatus,
    billingAcct,
    zIndex,
    minimized,
    isBanFIFA: banFifaIndicator(state)(task.ban),
    pendingMoveOrProvideOrderExists: pendingMoveOrProvideOrderExists(state)(tabUniqId),
    cbrOptions: getCBROptionList(state)(task.ban),
    calendarStatus,
    detail,
    tabIdDetail,
    updateTracker,
    closeModalStatus,
    tabUniqId,
    employeeRoles,
    currentCustomer,
    udItemList,
    applicationPolicies,
    oldestActiveSubscriber,
    banDetails
  }
}

const ConnectTask = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(view)

export default ConnectTask
