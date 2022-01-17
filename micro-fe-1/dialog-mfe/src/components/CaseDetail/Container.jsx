import React, { memo } from 'react'
import PropTypes from 'prop-types'
import __ from 'lodash'
import CaseDetailTemplate from './view'

const Container = ({
  detail, removeCaseDetail, currentTabCustomerId, updateCaseDetail,
  banDetails, addCaseDetail, caseModalTaskDetail, removeCaseTaskDetail,
  agentIdentity, updateTaskComment, updateCommentStatus,
  updateCommentText, updateCaseComment, updateCaseCommentStatus, tabIdDetail,
  updateCaseFields, fieldsStatus, updateTracker, trackUpdateInFields, trackCloseModal,
  closeModalStatus, saveCalendar, resetCalendar, dueDateDuration, taskHistoryDetail,
  updateCaseModalData, taskUDTypeData, fetchTasksUnderCase,
  updateCaseDetailItem, rtsCloseModalStatus, trackRTSCloseModal, addCaseHistoryDetail,
  tabUniqId, udItemListData, getNotificationModalDetail, addDetail, fetchNotificationData,
  getNotificationInfo, removeNotificationPopUpData,
  fetchNotificationListData,
  authData
}) => {
  return (
    detail.isOpen ? (
      <CaseDetailTemplate
        key={`${detail.id}-${detail.type}`}
        detail={detail}
        removeCaseDetail={removeCaseDetail}
        currentTabCustomerId={currentTabCustomerId}
        updateCaseDetail={updateCaseDetail}
        banDetails={banDetails}
        addCaseDetail={addCaseDetail}
        caseModalTaskDetail={caseModalTaskDetail}
        removeCaseTaskDetail={removeCaseTaskDetail}
        agentIdentity={agentIdentity}
        updateTaskComment={updateTaskComment}
        updateCommentStatus={updateCommentStatus}
        updateCommentText={updateCommentText}
        tabIdDetail={tabIdDetail}
        updateCaseComment={updateCaseComment}
        updateCaseCommentStatus={updateCaseCommentStatus}
        updateCaseFields={updateCaseFields}
        fieldsStatus={fieldsStatus}
        updateTracker={updateTracker}
        trackUpdateInFields={trackUpdateInFields}
        trackCloseModal={trackCloseModal}
        closeModalStatus={closeModalStatus}
        saveCalendar={saveCalendar}
        resetCalendar={resetCalendar}
        dueDateDuration={dueDateDuration}
        taskHistoryDetail={taskHistoryDetail}
        updateCaseModalData={updateCaseModalData}
        taskUDTypeData={taskUDTypeData}
        fetchTasksUnderCase={fetchTasksUnderCase}
        updateCaseDetailItem={updateCaseDetailItem}
        rtsCloseModalStatus={rtsCloseModalStatus}
        trackRTSCloseModal={trackRTSCloseModal}
        addCaseHistoryDetail={addCaseHistoryDetail}
        tabUniqId={tabUniqId}
        udItemListData={udItemListData}
        getNotificationModalDetail={getNotificationModalDetail}
        addDetail={addDetail}
        fetchNotificationData={fetchNotificationData}
        getNotificationInfo={getNotificationInfo}
        removeNotificationPopUpData={removeNotificationPopUpData}
        authData={authData}
        fetchNotificationListData={fetchNotificationListData}
      />
    ) : null
  )
}

Container.defaultProps = {
  fieldsStatus: '',
  tabIdDetail: [],
  dueDateDuration: {}
}

Container.propTypes = {
  detail: PropTypes.object.isRequired,
  removeCaseDetail: PropTypes.func.isRequired,
  currentTabCustomerId: PropTypes.string.isRequired,
  updateCaseDetail: PropTypes.func.isRequired,
  banDetails: PropTypes.object.isRequired,
  addCaseDetail: PropTypes.func.isRequired,
  caseModalTaskDetail: PropTypes.object.isRequired,
  removeCaseTaskDetail: PropTypes.func.isRequired,
  agentIdentity: PropTypes.object.isRequired,
  updateTaskComment: PropTypes.func.isRequired,
  updateCommentStatus: PropTypes.func.isRequired,
  updateCommentText: PropTypes.func.isRequired,
  tabIdDetail: PropTypes.array,
  updateCaseComment: PropTypes.func.isRequired,
  updateCaseCommentStatus: PropTypes.func.isRequired,
  updateCaseFields: PropTypes.func.isRequired,
  fieldsStatus: PropTypes.string,
  updateTracker: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]).isRequired,
  trackUpdateInFields: PropTypes.func.isRequired,
  trackCloseModal: PropTypes.func.isRequired,
  closeModalStatus: PropTypes.bool.isRequired,
  saveCalendar: PropTypes.func.isRequired,
  resetCalendar: PropTypes.func.isRequired,
  dueDateDuration: PropTypes.object,
  taskHistoryDetail: PropTypes.func.isRequired,
  updateCaseModalData: PropTypes.func.isRequired,
  taskUDTypeData: PropTypes.object.isRequired,
  fetchTasksUnderCase: PropTypes.func.isRequired,
  updateCaseDetailItem: PropTypes.func.isRequired,
  rtsCloseModalStatus: PropTypes.bool.isRequired,
  trackRTSCloseModal: PropTypes.func.isRequired,
  addCaseHistoryDetail: PropTypes.func.isRequired,
  tabUniqId: PropTypes.string.isRequired,
  udItemListData: PropTypes.object.isRequired,
  getNotificationModalDetail: PropTypes.object.isRequired,
  addDetail: PropTypes.func.isRequired,
  fetchNotificationData: PropTypes.func.isRequired,
  getNotificationInfo: PropTypes.array.isRequired,
  removeNotificationPopUpData: PropTypes.func.isRequired,
  fetchNotificationListData: PropTypes.func.isRequired,
  authData: PropTypes.object.isRequired
}

const areEqual = (prevProps, nextProps) => {
  return __.isEqual(prevProps, nextProps)
}

export default memo(Container, areEqual)
