import { connect } from 'react-redux'
import {
  compose,
  mapImmutablePropsToPlainProps
} from '@telus/isomorphic-core'
import Container from './Container'
import {
  removeDetail,
  updateDetail,
  addDetail
} from '../../../../services/detailPopups/actions'
import { getCurrentTabCustomer } from '../../../../services/tabs/selectors'
import { getBanDetails } from '../../../../services/ban/selectors'
import {
  getCaseModalDetailItemByTabId,
  getUpdatedFieldsStatus,
  getUpdateTracker,
  getCloseModalStatus,
  getRTSCloseModalStatus,
  getNotificationData
} from '../../../../services/case/selector'
import {
  getDueDateDuration,
  getTaskUDTypeData,
  getUdItemListData
} from '../../../../services/task/selectors'
import {
  addCaseDetail,
  updateCaseDetail,
  removeCaseTaskDetail,
  addCaseTaskComment,
  updateCommentStatus,
  updateCommentText,
  addCaseComment,
  updateCaseCommentStatus,
  updateCaseFields,
  trackUpdateInFields,
  trackCloseModal,
  saveCalendar,
  resetCalendarStatus,
  taskHistoryDetail,
  updateCaseModalData,
  fetchTasksUnderCase,
  trackRTSCloseModal,
  addCaseHistoryDetail,
  fetchNotificationData,
  removeNotificationPopUpData,
  fetchStandAloneNotificationData
} from '../../../../services/case/actions'

import { getDetailItemByTabId, getTabId } from '../../../../services/detailPopups/selectors'
import { getAgentIdentity } from '../../../../services/agent/selectors'
import { getSearchedTask } from '../../../../services/customerSearch/selectors'
import getAuthData from '../../../../services/auth/selectors'

export const mapDispatchToProps = dispatch => ({
  removeCaseDetail: (detail) => {
    dispatch(removeDetail(detail))
  },
  updateCaseDetail: (detail) => {
    dispatch(updateDetail(detail))
  },
  addCaseDetail: (detail) => {
    dispatch(addCaseDetail(detail))
  },
  updateCaseDetailItem: (detail) => {
    dispatch(updateCaseDetail(detail))
  },
  removeCaseTaskDetail: (detail) => {
    dispatch(removeCaseTaskDetail(detail))
  },
  updateTaskComment: (detail, tabUniqId, taskId) => {
    dispatch(addCaseTaskComment(detail, tabUniqId, taskId))
  },
  updateCaseComment: (detail, tabUniqId, caseId) => {
    dispatch(addCaseComment(detail, tabUniqId, caseId))
  },
  updateCommentStatus: (tabUniqId, status, taskId) => {
    dispatch(updateCommentStatus(tabUniqId, status, taskId))
  },
  updateCaseCommentStatus: (tabUniqId, status) => {
    dispatch(updateCaseCommentStatus(tabUniqId, status))
  },
  updateCommentText: (tabUniqId, text) => {
    dispatch(updateCommentText(tabUniqId, text))
  },
  updateCaseFields: (body, tabUniqId, tasks, updatedCaseFields, agentIdentity) => {
    dispatch(updateCaseFields(body, tabUniqId, tasks, updatedCaseFields, agentIdentity))
  },
  trackUpdateInFields: (tabUniqId, type, status) => {
    dispatch(trackUpdateInFields(tabUniqId, type, status))
  },
  trackCloseModal: (tabUniqId, status) => {
    dispatch(trackCloseModal(tabUniqId, status))
  },
  saveCalendar: (detail, tabUniqId, taskId) => {
    dispatch(saveCalendar(detail, tabUniqId, taskId))
  },
  resetCalendar: (tabUniqId, taskId) => {
    dispatch(resetCalendarStatus(tabUniqId, taskId))
  },
  taskHistoryDetail: (tabUniqId, taskId) => {
    dispatch(taskHistoryDetail(tabUniqId, taskId))
  },
  updateCaseModalData: (payload) => {
    dispatch(updateCaseModalData(payload))
  },
  fetchTasksUnderCase: (payload) => {
    dispatch(fetchTasksUnderCase(payload))
  },
  trackRTSCloseModal: (tabUniqId, status) => {
    dispatch(trackRTSCloseModal(tabUniqId, status))
  },
  addCaseHistoryDetail: (caseId, tabUniqId) => {
    dispatch(addCaseHistoryDetail({ caseId, tabUniqId }))
  },
  addDetail: caseDetails => dispatch(addDetail(caseDetails)),
  fetchNotificationData: (tabUniqId, messageId) => {
    dispatch(fetchNotificationData(tabUniqId, messageId))
  },
  removeNotificationPopUpData: (tabUniqId, type) => {
    dispatch(removeNotificationPopUpData(tabUniqId, type))
  },
  fetchNotificationListData: (tabUniqId, ban, startDate, endDate, caseId, popUpType, source) => {
    dispatch(fetchStandAloneNotificationData(
      tabUniqId, ban, startDate, endDate, caseId, popUpType, source
    ))
  }
})

const mapStateToProps = (state) => {
  const { customerId, tabUniqId, billingAcctNum: parentBan } = getCurrentTabCustomer(state)
  const banDetails = getBanDetails(state)(parentBan)
  const caseModalTaskDetail = getCaseModalDetailItemByTabId(state, tabUniqId)
  const detail = getDetailItemByTabId(state, tabUniqId, 'case-detail')
  const agentIdentity = getAgentIdentity(state)
  const tabIdDetail = getTabId(state, tabUniqId)
  const fieldsStatus = getUpdatedFieldsStatus(state, tabUniqId)
  const updateTracker = getUpdateTracker(state, tabUniqId)
  const closeModalStatus = getCloseModalStatus(state, tabUniqId)
  const dueDateDuration = getDueDateDuration(state)
  const taskUDTypeData = getTaskUDTypeData(state)
  const rtsCloseModalStatus = getRTSCloseModalStatus(state, tabUniqId)
  const searchedTask = getSearchedTask(state)
  const udItemListData = getUdItemListData(state)
  const getNotificationModalDetail = type => getDetailItemByTabId(state, tabUniqId, type)
  const getNotificationInfo = type => getNotificationData(state, tabUniqId, type)
  const authData = getAuthData(state)
  return {
    currentTabCustomerId: customerId,
    banDetails,
    caseModalTaskDetail,
    detail,
    agentIdentity,
    tabIdDetail,
    fieldsStatus,
    updateTracker,
    closeModalStatus,
    dueDateDuration,
    taskUDTypeData,
    rtsCloseModalStatus,
    searchedTask,
    tabUniqId,
    udItemListData,
    getNotificationModalDetail,
    getNotificationInfo,
    authData
  }
}

const ConnectedView = compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapImmutablePropsToPlainProps
)(Container)

export default ConnectedView
