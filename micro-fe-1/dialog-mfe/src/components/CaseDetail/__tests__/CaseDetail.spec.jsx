import React from 'react'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import momentTZ from 'moment-timezone'

import * as helper from '../../../../../utils/helper'
import * as envToggle from '../../../../../components/EnvToggle'
import ConnectedView, { mapDispatchToProps } from '../index'
import store from '../../../../../__mocks__/data/mockStore'
import {
  mockBanData,
  mockTabsData,
  mockDetailPopups,
  mockCaseBanDetail,
  mockAgentData,
  caseModalAssociatedTasks,
  mockCaseTasksOnSuccess,
  tabIdDetail,
  mockTaskData,
  taskUDTypeDataCase,
  mockCustomerSearch,
  notificationMultipleData,
  mockAuth
} from '../../../../../__mocks__/data/mockData'
import CaseDetail from '../view'
import * as fetchUtils from '../../../../../utils/fetch'
import Container from '../Container'
import CloseModal from '../components/CloseModal'

const removeCaseDetail = jest.fn()
const banDetailWithKoodo = {
  contactNum: '7803615948',
  brand: 'koodo',
  contactCellPhone: '',
  contactDayPhone: '7803615948',
  billingAcctNum: '602963289',
  customerId: '94676952',
  billingAccountName: 'ADAM BOVIE'
}

const agentIdentity = {
  employeeId: '1234',
  firstName: 'John',
  lastName: 'Doe'
}

const createWrapper = (type) => {
  if (type === 'mount') {
    return mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          getNotificationModalDetail={mockDetailPopups['2869264_ffh'][4]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869270]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          resetCalendar={jest.fn()}
          dueDateDuration={{ value: 24 }}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false
          }}
          trackUpdateInFields={jest.fn()}
          taskHistoryDetail={jest.fn()}
          switchTabTrack={jest.fn()}
          getNotificationInfo={notificationMultipleData}
          authData={mockAuth}
        />
      </Provider>
    )
  }
  return shallow(
    <Provider store={store}>
      <CaseDetail
        tabIdDetail={tabIdDetail}
        detail={mockDetailPopups[94676952][0]}
        getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
        removeCaseDetail={removeCaseDetail}
        currentTabCustomerId="94676952"
        updateCaseDetail={jest.fn()}
        banDetails={mockCaseBanDetail}
        caseModalTaskDetail={caseModalAssociatedTasks.modal[2869270]}
        addCaseDetail={jest.fn()}
        removeCaseTaskDetail={jest.fn()}
        updateCommentStatus={jest.fn()}
        updateCommentText={jest.fn()}
        updateCaseComment={jest.fn()}
        updateCaseFields={jest.fn()}
        updateTracker={{
          customerDetails: true,
          caseComments: true,
          taskComments: true,
          calendarStatus: false
        }}
        trackUpdateInFields={jest.fn()}
        taskHistoryDetail={jest.fn()}
        switchTabTrack={jest.fn()}
        authData={mockAuth}
        resetCalendar={jest.fn()}
        updateCaseDetailItem={jest.fn()}
        getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
      />
    </Provider>
  ).dive().dive()
}

describe('Test cases for CaseDetail component', () => {
  beforeEach(() => {
    document.execCommand = () => {
      return {
        selectNodeContents: () => { 'range' },
        collapse: () => {},
        setStart: () => {},
        setEnd: () => {}
      }
    }
  })
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  const duplicateInitialStore = mockStore({
    customerSearch: Immutable.fromJS(mockCustomerSearch),
    tabs: Immutable.fromJS(mockTabsData),
    ban: Immutable.fromJS(mockBanData),
    Case: Immutable.fromJS(caseModalAssociatedTasks),
    detailPopups: Immutable.fromJS(mockDetailPopups),
    agent: Immutable.fromJS(mockAgentData),
    task: Immutable.fromJS(mockTaskData),
    auth: Immutable.fromJS(mockAuth)
  })
  const duplicateStore = mockStore({
    customerSearch: Immutable.fromJS(mockCustomerSearch),
    tabs: Immutable.fromJS(mockTabsData),
    ban: Immutable.fromJS(mockBanData),
    Case: Immutable.fromJS(caseModalAssociatedTasks),
    detailPopups: Immutable.fromJS(mockDetailPopups),
    agent: Immutable.fromJS(mockAgentData),
    task: Immutable.fromJS(mockTaskData),
    auth: Immutable.fromJS(mockAuth)
  })
  beforeEach(() => {
    window.getSelection = () => {
      return {
        type: 'Range',
        removeAllRanges: () => {},
        addRange: () => {},
        getRangeAt: () => {
          return {
            cloneRange: () => {
              return {
                selectNodeContents: () => {},
                setEnd: () => {}
              }
            }
          }
        }
      }
    }
    document.createRange = () => {
      return {
        selectNodeContents: () => { 'range' },
        collapse: () => {},
        setStart: () => {},
        setEnd: () => {}
      }
    }
  })
  beforeAll(() => {
    jest.spyOn(momentTZ.tz, 'guess').mockImplementation(() => {
      return 'America/Vancouver'
    })
    jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000)
  })
  const mockJsonPromiseRequest = Promise.resolve(mockCaseTasksOnSuccess)
  const mockFetchPromiseRequest = Promise.resolve({
    json: () => mockJsonPromiseRequest
  })
  it('should match snapshot on mount, call removeDetailsHandler & call componentWillUnmount', () => {
    jest.spyOn(momentTZ, 'locale').mockImplementation(() => 'fr')
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          removeNotificationPopUpData={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869267]}
          updateCaseDetailItem={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: false,
            caseComments: false,
            taskComments: false,
            calendarStatus: true,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          fieldsStatus="UNINT"
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          agentIdentity={agentIdentity}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    const instance = wrapper.find(CaseDetail).instance()
    instance.setState({ tasks: caseModalAssociatedTasks.modal['94676952'].tasks, popUpClosed: false })
    wrapper.find('CaseDetail').props().removeCaseDetail()
    wrapper.find('CaseDetail').props().updateCaseDetail()
    wrapper.find('CaseDetail').props().updateCaseDetailItem()
    wrapper.find('CaseDetail').props().removeCaseTaskDetail()
    // trigger go send tool on the click of sms icon
    helper.openWindowWithPost = jest.fn()
    envToggle.isFeatureEnabled = jest.fn(() => false)
    wrapper.find('#goSend_email_1234567890').at(0).simulate('click')
    expect(envToggle.isFeatureEnabled).toHaveBeenCalled()
    expect(helper.openWindowWithPost).toHaveBeenCalled()
    expect(wrapper.children().length).toBe(1)
    wrapper.unmount()
  })
  it('should call goSend function when isFeatured is true', () => {
    jest.spyOn(momentTZ, 'locale').mockImplementation(() => 'fr')
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          removeNotificationPopUpData={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869267]}
          updateCaseDetailItem={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: false,
            caseComments: false,
            taskComments: false,
            calendarStatus: true,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          fieldsStatus="UNINT"
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          agentIdentity={agentIdentity}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    const instance = wrapper.find(CaseDetail).instance()
    instance.setState({ tasks: caseModalAssociatedTasks.modal['94676952'].tasks, popUpClosed: false })
    wrapper.find('CaseDetail').props().removeCaseDetail()
    wrapper.find('CaseDetail').props().updateCaseDetail()
    wrapper.find('CaseDetail').props().updateCaseDetailItem()
    wrapper.find('CaseDetail').props().removeCaseTaskDetail()
    // trigger go send tool on the click of sms icon
    envToggle.isFeatureEnabled = jest.fn(() => true)
    global.open = jest.fn()
    wrapper.find('#goSend_email_1234567890').at(0).simulate('click')
    expect(global.open).toHaveBeenCalled()
    expect(envToggle.isFeatureEnabled).toHaveBeenCalled()
    expect(wrapper.children().length).toBe(1)
    wrapper.unmount()
  })
  it('should use default values in constructor when props are undefined', () => {
    jest.spyOn(momentTZ, 'locale').mockImplementation(() => 'en')
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={{
            ...caseModalAssociatedTasks.modal[2869267],
            isSMSValid: true,
            isCBRValid: true,
            isEmailValid: true,
            saveBtnDisabled: true,
            accordionHeight: 32
          }}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: false,
            caseComments: false,
            taskComments: false,
            calendarStatus: true,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    expect(wrapper.find('CaseDetail').exists()).toBe(true)
  })
  it('should fetch task matched cases', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const wrapper = shallow(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][1]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869265]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: false,
            caseComments: false,
            taskComments: false,
            calendarStatus: true,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    ).dive().dive()
    const didMount = wrapper.instance().fetchAssociatedTask()
    wrapper.instance().onChangeHandler()
    wrapper.instance().alterOptionHandler()
    didMount.then(() => {
      wrapper.update()
      expect(wrapper.find('AccorordionTaskData').length).toBe(1)
    })
  })
  it('on mouseOver state:nameTooltip should be set true when ellipsis is active', async () => {
    const wrapper = shallow(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][1]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869265]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: false,
            caseComments: false,
            taskComments: false,
            calendarStatus: true,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    ).dive().dive()
    wrapper.instance().nameLabelRef = { current: {} }
    wrapper.instance().nameLabelRef.current.scrollWidth = 50
    wrapper.instance().nameLabelRef.current.offsetWidth = 40

    wrapper.instance().state.nameTooltip = false
    wrapper.instance().onMouseOver()

    expect(wrapper.instance().state.nameTooltip).toBe(true)
  })
  it('on mouseOver state:nameTooltip should be set false when ellipsis is not active', async () => {
    const wrapper = shallow(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][1]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869265]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: false,
            caseComments: false,
            taskComments: false,
            calendarStatus: true,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    ).dive().dive()
    wrapper.instance().nameLabelRef = { current: {} }
    wrapper.instance().nameLabelRef.current.scrollWidth = 40
    wrapper.instance().nameLabelRef.current.offsetWidth = 40

    wrapper.instance().state.nameTooltip = true
    wrapper.instance().onMouseOver()

    expect(wrapper.instance().state.nameTooltip).toBe(false)
  })


  it('should test case methods', () => {
    const mockDataUpdatePopup = {
      dragPosition: { x: 0, y: 0 },
      rel: { x: 346, y: 25 },
      minimized: false,
      index: 3
    }
    const wrapper = shallow(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          removeNotificationPopUpData={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal['2869264_ffh']}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true,
            taskComplete: true,
            taskCancel: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    ).dive().dive()
    wrapper.instance().updateCaseDetailHandler(mockDataUpdatePopup)
    wrapper.instance().removeCasePopupHandler()
    wrapper.instance().returnAndSaveHandler()
    wrapper.instance().removeCloseModalHandler()
    wrapper.instance().handlerAccordionOpen({ taskId: 377816, isOpen: true })
    expect(wrapper.instance().state.dragPosition).toEqual(mockDataUpdatePopup.dragPosition)
  })
  it('should test case methods when minimized', () => {
    const mockDataUpdatePopup = {
      dragPosition: { x: 246, y: 22 },
      rel: { x: 346, y: 25 },
      minimized: true,
      index: 3,
      position: 1
    }
    const wrapper = shallow(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          removeNotificationPopUpData={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal['2869264_ffh']}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: true,
            cancelCloseCase: false
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    ).dive().dive()
    wrapper.instance().handleCaseSpinner('success')
    wrapper.instance().updateCaseDetailHandler({ ...mockDataUpdatePopup, type: 'case-detail' })
    wrapper.instance().updateCaseDetailHandler({ ...mockDataUpdatePopup, type: 'taskWithinCase' })
    wrapper.instance().updateCaseDetailHandler({ ...mockDataUpdatePopup, type: 'caseCommentNotificationPopup' })
    expect(wrapper).toBeTruthy()
    wrapper.instance().removeCasePopupHandler()
  })
  it('Should fetch task data from reducer', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          removeNotificationPopUpData={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[94676952]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: false,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: false
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    ).dive().dive()
    wrapper.instance().removeCasePopupHandler()
    expect(wrapper.instance().state.tasks).toEqual(caseModalAssociatedTasks.modal[94676952].tasks)
  })
  it('Should test areEqual in Container', () => {
    const wrapper = shallow(
      <Container
        tabIdDetail={tabIdDetail}
        detail={mockDetailPopups[94676952][0]}
        removeCaseDetail={removeCaseDetail}
        currentTabCustomerId="94676952"
        updateCaseDetail={jest.fn()}
        banDetails={banDetailWithKoodo}
        caseModalTaskDetail={caseModalAssociatedTasks.modal[94676952]}
        addCaseDetail={jest.fn()}
        removeCaseTaskDetail={jest.fn()}
        updateCommentStatus={jest.fn()}
        updateCommentText={jest.fn()}
        updateCaseFields={jest.fn()}
        updateTracker={{
          customerDetails: false,
          caseComments: false,
          taskComments: true,
          calendarStatus: false,
          cancelCloseCase: true
        }}
        trackUpdateInFields={jest.fn()}
        trackCloseModal={jest.fn()}
        closeModalStatus={false}
        taskHistoryDetail={jest.fn()}
        fetchTasksUnderCase={jest.fn()}
        updateCaseModalData={jest.fn()}
        taskUDTypeData={taskUDTypeDataCase}
        rtsCloseModalStatus={false}
        trackRTSCloseModal={jest.fn()}
        getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
        getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        authData={mockAuth}
      />

    )
    wrapper.setProps({ detail: {} })
    wrapper.update()
    expect(wrapper.props().detail).toStrictEqual(undefined)
  })
  it('should test mapStateToProps and dispatchers', () => {
    const wrapper = mount(
      <Provider store={duplicateInitialStore}>
        <ConnectedView
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          detail={mockDetailPopups['2869264_ffh'][0]}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        />
      </Provider>
    )
    expect(wrapper.find('Accordion').length).toBe(1)
    wrapper.unmount()
  })
  it('should test remove', () => {
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          detail={mockDetailPopups['2869264_ffh'][0]}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        />
      </Provider>
    )
    wrapper.find(CaseDetail).props().updateCommentStatus(123, 'UNINIT', 321)
    wrapper.find(CaseDetail).instance().removeCasePopupHandler()
    wrapper.find(CaseDetail).instance().fetchAssociatedTask('34619eb0-83ba-11ea-bb9e-e936f284b410')
    expect(wrapper.find('Accordion').length).toBe(1)
  })
  it('should save calendar', () => {
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          detail={mockDetailPopups['2869264_ffh'][0]}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        />
      </Provider>
    )
    wrapper.find(CaseDetail).props().saveCalendar(123, 123, 321)
    expect(wrapper.find('Accordion').length).toBe(1)
  })
  it('should reset calendar', () => {
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          detail={mockDetailPopups['2869264_ffh'][0]}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        />
      </Provider>
    )
    wrapper.find(CaseDetail).props().resetCalendar(123, 123)
    expect(wrapper.find('Accordion').length).toBe(1)
  })

  it('should handle tab click', () => {
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          detail={mockDetailPopups['2869264_ffh'][0]}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        />
      </Provider>
    )
    const item = { taskId: 30126265, isOpen: true }
    const tab = { id: 'task_detail_modal_history_tab_', label: 'history' }
    wrapper.find(CaseDetail).instance().handleTabClick(item, tab)
    expect(wrapper.find('Accordion').length).toBe(1)
  })

  it('should handle case comments tab click', () => {
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          detail={mockDetailPopups['2869264_ffh'][0]}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        />
      </Provider>
    )
    wrapper.find(CaseDetail).instance().handleCaseTabClick({ label: 'history' })
    expect(wrapper.find('Accordion').length).toBe(1)
  })
  it('should update case comment status', () => {
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          detail={mockDetailPopups['2869264_ffh'][0]}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        />
      </Provider>
    )
    wrapper.find(CaseDetail).props().updateCaseCommentStatus(123, 'UNINIT')
    expect(wrapper.children().length).toBe(1)
    wrapper.unmount()
  })

  it('should update task comment', () => {
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          detail={mockDetailPopups['2869264_ffh'][0]}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        />
      </Provider>
    )
    wrapper.find(CaseDetail).props().updateTaskComment({}, 123, 123)
    wrapper.find('CaseDetail').props().trackUpdateInFields(123, 'case', true)
    wrapper.find('CaseDetail').props().updateCaseDetail({ 2869264: { openCaseModel: false } })
    wrapper.find('CaseDetail').props().addCaseDetail({ 2869264: { openCaseModel: false, Case: { interactionId: '34619eb0-83ba-11ea-bb9e-e936f284b410' }, Id: '89069' } })
    wrapper.find('CaseDetail').props().taskHistoryDetail(2869264, 123)
    expect(wrapper.children().length).toBe(1)
    wrapper.unmount()
  })

  it('should update update case comment', () => {
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          detail={mockDetailPopups['2869264_ffh'][0]}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        />
      </Provider>
    )
    wrapper.find(CaseDetail).props().updateCaseComment({}, 123)
    expect(wrapper.children().length).toBe(1)
    wrapper.unmount()
  })

  it('should change field of sms', () => {
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          getNotificationModalDetail={mockDetailPopups['2869264_ffh'][4]}
          detail={mockDetailPopups['2869264_ffh'][0]}
        >
          <CaseDetail
            tabIdDetail={tabIdDetail}
            detail={mockDetailPopups[94676952][0]}
            removeCaseDetail={removeCaseDetail}
            currentTabCustomerId="94676952"
            updateCaseDetail={jest.fn()}
            banDetails={banDetailWithKoodo}
            caseModalTaskDetail={caseModalAssociatedTasks.modal['2869264_ffh']}
            addCaseDetail={jest.fn()}
            removeCaseTaskDetail={jest.fn()}
            updateCommentStatus={jest.fn()}
            updateCommentText={jest.fn()}
            updateCaseFields={jest.fn()}
            agentIdentity={agentIdentity}
            updateTracker={{
              customerDetails: true,
              caseComments: true,
              taskComments: true,
              calendarStatus: false,
              cancelCloseCase: true
            }}
            trackUpdateInFields={jest.fn()}
            trackCloseModal={jest.fn()}
            closeModalStatus={false}
            taskHistoryDetail={jest.fn()}
            fetchTasksUnderCase={jest.fn()}
            updateCaseModalData={jest.fn()}
            taskUDTypeData={taskUDTypeDataCase}
            rtsCloseModalStatus={false}
            trackRTSCloseModal={jest.fn()}
            getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
            getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
            authData={mockAuth}
          />
        </ConnectedView>
      </Provider>
    )
    wrapper.find('input#smsInput').simulate('click')
    wrapper.find('Editable#smsInput').props().onChange('1234')
    wrapper.find('#case-detail-complete-btn-89069').at(wrapper.find('#case-detail-complete-btn-89069').length - 1).simulate('focus')
    expect(wrapper.children().length).toBe(1)
    wrapper.unmount()
  })
  it('should not change field of sms', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal['2869264_ffh']}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          agentIdentity={agentIdentity}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: true,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('input#smsInput').simulate('click')
    wrapper.find('Editable#smsInput').props().onChange('')
    expect(wrapper.children().length).toBe(1)
    wrapper.unmount()
  })
  it('should change field of cbr', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal['2869264_ffh']}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          agentIdentity={agentIdentity}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('input#cbrInput').simulate('click')
    wrapper.find('Editable#cbrInput').props().onChange()
    expect(wrapper.children().length).toBe(1)
    wrapper.unmount()
  })
  it('should change field of email', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal['2869264_ffh']}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          agentIdentity={agentIdentity}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('div#emailInput').simulate('click')
    wrapper.find('Editable#emailInput').props().onChange()
    expect(wrapper.children().length).toBe(1)
    wrapper.unmount()
  })
  it('should save fields', () => {
    const updateCaseFields = jest.fn()
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal['2869264_ffh']}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={updateCaseFields}
          agentIdentity={agentIdentity}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('input#smsInput').simulate('click')
    wrapper.find('Editable#smsInput').props().onChange('1234567890')
    wrapper.find('div#emailInput').simulate('click')
    wrapper.find('Editable#emailInput').props().onChange('test@test.com')
    wrapper.find('input#cbrInput').simulate('click')
    wrapper.find('Editable#cbrInput').props().onChange('1234567890')
    wrapper.find('#case-detail-save-btn-89069').at(1).simulate('click')
    expect(updateCaseFields).toHaveBeenCalled()
    wrapper.unmount()
  })
  it('should save fields with cancelOrCloseItem not equal to CANCELLED', () => {
    const updateCaseFields = jest.fn()
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[94676952]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={updateCaseFields}
          agentIdentity={agentIdentity}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('input#smsInput').simulate('click')
    wrapper.find('Editable#smsInput').props().onChange('1234567890')
    wrapper.find('div#emailInput').simulate('click')
    wrapper.find('Editable#emailInput').props().onChange('test@test.com')
    wrapper.find('input#cbrInput').simulate('click')
    wrapper.find('Editable#cbrInput').props().onChange('1234567890')
    wrapper.find('#case-detail-save-btn-89069').at(1).simulate('click')
    expect(updateCaseFields).toHaveBeenCalled()
    wrapper.unmount()
  })
  it('should save fields with cancelOrCloseItem equal to existingData.caseCompleteCancelItem', () => {
    const updateCaseFields = jest.fn()
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869265]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={updateCaseFields}
          agentIdentity={agentIdentity}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('input#smsInput').simulate('click')
    wrapper.find('Editable#smsInput').props().onChange('1234567890')
    wrapper.find('div#emailInput').simulate('click')
    wrapper.find('Editable#emailInput').props().onChange('test@test.com')
    wrapper.find('input#cbrInput').simulate('click')
    wrapper.find('Editable#cbrInput').props().onChange('1234567890')
    wrapper.find('#case-detail-save-btn-89069').at(1).simulate('click')
    expect(updateCaseFields).toHaveBeenCalled()
    wrapper.unmount()
  })
  it('should not save fields when sms is invalid', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal['2869264_ffh']}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          agentIdentity={agentIdentity}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: true,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('input#smsInput').simulate('click')
    wrapper.find('Editable#smsInput').props().onChange('1234')
    wrapper.find('div#emailInput').simulate('click')
    wrapper.find('Editable#emailInput').props().onChange('test')
    wrapper.find('input#cbrInput').simulate('click')
    wrapper.find('Editable#cbrInput').props().onChange('1234567890')
    wrapper.find('#case-detail-save-btn-89069').at(1).simulate('click')
    expect(wrapper.find('CaseDetail').state().isEmailValid).toBe(false)
    wrapper.unmount()
  })
  it('should not save fields when email is invalid', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869266]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          agentIdentity={agentIdentity}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('input#smsInput').simulate('click')
    wrapper.find('Editable#smsInput').props().onChange('1234567890')
    wrapper.find('div#emailInput').simulate('click')
    wrapper.find('Editable#emailInput').props().onChange('test')
    wrapper.find('input#cbrInput').simulate('click')
    wrapper.find('Editable#cbrInput').props().onChange('123')
    wrapper.find('#case-detail-save-btn-89069').at(1).simulate('click')
    expect(wrapper.find('CaseDetail').state().isCBRValid).toBe(false)
    wrapper.unmount()
  })
  it('should not save fields when cbr is invalid', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal['2869264_ffh']}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          agentIdentity={agentIdentity}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('input#smsInput').simulate('click')
    wrapper.find('Editable#smsInput').props().onChange('12')
    wrapper.find('div#emailInput').simulate('click')
    wrapper.find('Editable#emailInput').props().onChange('test@test.com')
    wrapper.find('input#cbrInput').simulate('click')
    wrapper.find('input#cbrInput').simulate('change', { target: { value: '1234567890' } })
    wrapper.find('Editable#cbrInput').props().onChange('12345')
    wrapper.find('#case-detail-save-btn-89069').at(1).simulate('click')
    expect(wrapper.find('CaseDetail').state().isSMSValid).toBe(false)
    wrapper.unmount()
  })

  it('should focus on link when click', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal['2869264_ffh']}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          agentIdentity={agentIdentity}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={true}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('button#link_button').simulate('click')
    expect(wrapper.children().length).toBe(1)
    wrapper.unmount()
  })

  it('should not focus on link when status is CLOSED or REJECTED or CANCELLED', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869214]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          agentIdentity={agentIdentity}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={true}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={false}
          trackRTSCloseModal={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('button#link_button').simulate('click')
    expect(wrapper.children().length).toBe(1)
    wrapper.unmount()
  })

  it('should check for CloseModal component', () => {
    const wrapper = mount(<CloseModal
      returnAndSaveHandler={jest.fn()}
      closeHandler={jest.fn()}
      removeCloseModalHandler={jest.fn()}
    />)
    expect(wrapper.find('CloseModal').exists()).toBe(true)
  })

  it('click on close button in close modal', () => {
    const returnAndSaveHandler = jest.fn()
    const closeHandler = jest.fn()
    const removeCloseModalHandler = jest.fn()
    const wrapper = mount(<CloseModal
      returnAndSaveHandler={returnAndSaveHandler}
      closeHandler={closeHandler}
      removeCloseModalHandler={removeCloseModalHandler}
      closeBtnVal="xyz"
      saveBtnVal="xyz"
      warningMsg="xyz"
    />)
    wrapper.find('#times-close-modal').at(wrapper.find('#times-close-modal').length - 1).simulate('click')
    wrapper.find('#return-and-save-button').at(wrapper.find('#return-and-save-button').length - 1).simulate('click')
    wrapper.find('#close-anyway-button').at(wrapper.find('#close-anyway-button').length - 1).simulate('click')
    expect(returnAndSaveHandler).toHaveBeenCalled()
    expect(closeHandler).toHaveBeenCalled()
    expect(removeCloseModalHandler).toHaveBeenCalled()
    expect(wrapper.children().length).toBe(1)
  })
  it('click on close button in rts close modal', () => {
    const removeRTSCloseModalHandler = jest.fn()
    const retunAndSaveRTSHandler = jest.fn()
    const wrapper = mount(<CloseModal
      returnAndSaveHandler={removeRTSCloseModalHandler}
      closeHandler={retunAndSaveRTSHandler}
      removeCloseModalHandler={removeRTSCloseModalHandler}
      closeBtnVal="xyz"
      saveBtnVal="xyz"
      warningMsg="xyz"
    />)
    wrapper.find('#times-close-modal').at(wrapper.find('#times-close-modal').length - 1).simulate('click')
    wrapper.find('#return-and-save-button').at(wrapper.find('#return-and-save-button').length - 1).simulate('click')
    wrapper.find('#close-anyway-button').at(wrapper.find('#close-anyway-button').length - 1).simulate('click')
    expect(removeRTSCloseModalHandler).toHaveBeenCalled()
    expect(retunAndSaveRTSHandler).toHaveBeenCalled()
    expect(wrapper.contains(<CloseModal />)).toBe(false)
  })
  it('click on dueDate to open calendar when task is in future date', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const openCalendar = jest.spyOn(CaseDetail.prototype, 'openCalendar')
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869268]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )

    const accordionState = {
      taskId: 377895,
      isOpen: true
    }
    wrapper.find('Accordion').props().handlerAccordionOpen(accordionState)
    wrapper.find('span#accordion_data_due_date_value').simulate('click')
    expect(openCalendar).toHaveBeenCalled()
  })

  it('click on dueDate to open calendar task is notification type', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const openCalendar = jest.spyOn(CaseDetail.prototype, 'openCalendar')
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869299]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )

    const accordionState = {
      taskId: 377826,
      isOpen: true
    }
    wrapper.find('Accordion').props().handlerAccordionOpen(accordionState)
    wrapper.find('span#accordion_data_due_date_value').simulate('click')
    expect(openCalendar).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('click on dueDate to open calendar task date is past', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const openCalendar = jest.spyOn(CaseDetail.prototype, 'openCalendar')
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869269]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false,
            cancelCloseCase: true
          }}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )

    const accordionState = {
      taskId: 377815,
      isOpen: true
    }
    wrapper.find('Accordion').props().handlerAccordionOpen(accordionState)
    wrapper.find('span#accordion_data_due_date_value').simulate('click')
    expect(openCalendar).toHaveBeenCalled()
  })

  it('should close calendar', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const closeCalendar = jest.spyOn(CaseDetail.prototype, 'closeCalendar')
    const wrapper = createWrapper()
    const item = {
      calendar: {
        dueDate: '',
        dueTime: '12:00 PM',
        isBusiness: false
      },
      taskId: 377816
    }
    wrapper.instance().closeCalendar(item)
    expect(closeCalendar).toHaveBeenCalled()
  })

  it('should format date', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const formatDateTime = jest.spyOn(CaseDetail.prototype, 'formatDateTime')
    const wrapper = createWrapper()
    const date = '01-01-2020'
    wrapper.instance().formatDateTime(date, true)
    expect(formatDateTime).toHaveBeenCalled()
  })

  it('should convert warning message for under duration', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const convertWarningMessage = jest.spyOn(CaseDetail.prototype, 'convertWarningMessage')
    const wrapper = createWrapper()
    const msg = 'Task due date is within'
    wrapper.instance().convertWarningMessage(msg)
    expect(convertWarningMessage).toHaveBeenCalled()
  })

  it('should convert warning message for notification task', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const convertWarningMessage = jest.spyOn(CaseDetail.prototype, 'convertWarningMessage')
    const wrapper = createWrapper()
    const msg = 'You are unable to'
    wrapper.instance().convertWarningMessage(msg)
    expect(convertWarningMessage).toHaveBeenCalled()
  })

  it('should convert warning message for past due when duration is 1 hour', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const convertWarningMessage = jest.spyOn(CaseDetail.prototype, 'convertWarningMessage')
    const wrapper = shallow(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869270]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          resetCalendar={jest.fn()}
          dueDateDuration={{ value: 1 }}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false
          }}
          trackUpdateInFields={jest.fn()}
          taskHistoryDetail={jest.fn()}
          switchTabTrack={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    ).dive().dive()
    const msg = 'Task is past due'
    wrapper.instance().convertWarningMessage(msg)
    expect(convertWarningMessage).toHaveBeenCalled()
  })

  it('should convert warning message for past due', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const convertWarningMessage = jest.spyOn(CaseDetail.prototype, 'convertWarningMessage')
    const wrapper = createWrapper()
    const msg = 'Task is past due'
    wrapper.instance().convertWarningMessage(msg)
    expect(convertWarningMessage).toHaveBeenCalled()
  })

  it('should convert warning message for default message', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const convertWarningMessage = jest.spyOn(CaseDetail.prototype, 'convertWarningMessage')
    const wrapper = createWrapper()
    const msg = 'default message'
    wrapper.instance().convertWarningMessage(msg)
    expect(convertWarningMessage).toHaveBeenCalled()
  })

  it('should get warning message for pastDate when hour is one', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const getWarningMessage = jest.spyOn(CaseDetail.prototype, 'getWarningMessage')
    const wrapper = shallow(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869270]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          resetCalendar={jest.fn()}
          dueDateDuration={{ value: 1 }}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false
          }}
          trackUpdateInFields={jest.fn()}
          taskHistoryDetail={jest.fn()}
          switchTabTrack={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    ).dive().dive()
    const date = '01-01-2028'
    wrapper.instance().getWarningMessage(date)
    expect(getWarningMessage).toHaveBeenCalled()
  })

  it('should get warning message for pastDate when hour is 0', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const getWarningMessage = jest.spyOn(CaseDetail.prototype, 'getWarningMessage')
    const wrapper = shallow(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869270]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          resetCalendar={jest.fn()}
          dueDateDuration={{ value: 0 }}
          updateTracker={{
            customerDetails: true,
            caseComments: true,
            taskComments: true,
            calendarStatus: false
          }}
          trackUpdateInFields={jest.fn()}
          taskHistoryDetail={jest.fn()}
          switchTabTrack={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    ).dive().dive()
    const date = momentTZ().subtract(1 * 60 * 60, 'seconds')
    wrapper.instance().getWarningMessage(date)
    expect(getWarningMessage).toHaveBeenCalled()
  })

  it('click on complete custom dropdown', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const alterCompleteOptionHandler = jest.spyOn(CaseDetail.prototype, 'alterCompleteOptionHandler')
    const wrapper = createWrapper()
    const item = {
      taskId: 377816
    }
    wrapper.instance().alterCompleteOptionHandler('FollowUpCompleted', item)
    expect(alterCompleteOptionHandler).toHaveBeenCalled()
  })

  it('click on cancel custom dropdown', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const alterCancelOptionHandler = jest.spyOn(CaseDetail.prototype, 'alterCancelOptionHandler')
    const wrapper = createWrapper()
    const item = {
      taskId: 377816
    }
    wrapper.instance().alterCancelOptionHandler('AlreadyCompleted', item)
    expect(alterCancelOptionHandler).toHaveBeenCalled()
  })

  it('should call handleCaseCommentText', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const handleCaseCommentText = jest.spyOn(CaseDetail.prototype, 'handleCaseCommentText')
    const wrapper = createWrapper()
    const data = {
      newCommentText: '',
      saveButtonActive: false
    }
    wrapper.instance().handleCaseCommentText(377816, data)
    expect(handleCaseCommentText).toHaveBeenCalled()
  })

  it('should call saveCaseCalendar', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const saveCaseCalendar = jest.spyOn(CaseDetail.prototype, 'saveCaseCalendar')
    const wrapper = createWrapper()
    const item = {
      taskId: 377816
    }
    const data = {
      dueDate: '',
      dueTime: '',
      isBusinessHours: false,
      btnEnabled: false,
      errorMessage: ''
    }
    wrapper.instance().saveCaseCalendar(item, data)
    expect(saveCaseCalendar).toHaveBeenCalled()
  })

  it('should call rightAlignhandler', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const rightAlignhandler = jest.spyOn(CaseDetail.prototype, 'rightAlignhandler')
    const wrapper = createWrapper()
    wrapper.instance().rightAlignhandler('32px')
    expect(rightAlignhandler).toHaveBeenCalled()
  })

  it('should format fields', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const formatFields = jest.spyOn(CaseDetail.prototype, 'formatFields')
    const wrapper = createWrapper()
    wrapper.instance().formatFields('123-456-7890')
    expect(formatFields).toHaveBeenCalled()
  })

  it('should call cardBlurHandler', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const cardBlurHandler = jest.spyOn(CaseDetail.prototype, 'cardBlurHandler')
    const wrapper = createWrapper()
    wrapper.instance().cardBlurHandler()
    expect(cardBlurHandler).toHaveBeenCalled()
  })

  it('should call handleSpinner', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const handleSpinner = jest.spyOn(CaseDetail.prototype, 'handleSpinner')
    const calendar = {
      taskId: 377816,
      notificationType: true,
      calendar: {
        dueDate: '2011-04-15',
        dueTime: '12:00 PM',
        isBusinessHours: true
      }
    }
    const wrapper = createWrapper()
    wrapper.instance().handleSpinner()
    wrapper.instance().isUnderOrPastDue('2019-04-30T16:27:14.000Z')
    wrapper.instance().closeCalendar(calendar)
    wrapper.instance().closeCaseCalendar(calendar)
    wrapper.instance().mapTimezone(calendar)
    wrapper.instance().updateNoificationIndex({ index: 1 })
    expect(handleSpinner).toHaveBeenCalled()
  })
  it('should call handleSpinner', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const handleSpinner = jest.spyOn(CaseDetail.prototype, 'handleSpinner')
    const wrapper = createWrapper()
    wrapper.instance().handleSpinner()
    wrapper.instance().isUnderOrPastDue('2019-04-30T16:27:14.000Z')
    expect(handleSpinner).toHaveBeenCalled()
  })

  it('should call onCompleteBlur', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const onCompleteBlur = jest.spyOn(CaseDetail.prototype, 'onCompleteBlur')
    const wrapper = createWrapper()
    wrapper.instance().onCompleteBlur()
    expect(onCompleteBlur).toHaveBeenCalled()
  })

  it('should call onCompleteChangeHandler', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const onCompleteChangeHandler = jest.spyOn(CaseDetail.prototype, 'onCompleteChangeHandler')
    const wrapper = createWrapper()
    const e = {
      stopPropagation: () => {}
    }
    const item = {
      taskId: 377816
    }
    wrapper.instance().onCompleteChangeHandler(e, item)
    expect(onCompleteChangeHandler).toHaveBeenCalled()
  })

  it('should call handleCancelChange', () => {
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const handleCancelChange = jest.spyOn(CaseDetail.prototype, 'handleCancelChange')
    const wrapper = createWrapper()
    const e = {
      stopPropagation: () => {}
    }
    const item = {
      taskId: 377816
    }
    wrapper.instance().handleCancelChange(e, item)
    expect(handleCancelChange).toHaveBeenCalled()
  })

  it('Should Render Case Cancel complete button', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869270]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          updateCaseDetailItem={jest.fn()}
          updateTracker={{
            cancelCloseCase: true
          }}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          trackUpdateInFields={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('div#case-complete-id').at(wrapper.find('div#case-complete-id').length - 1).simulate('click')
    wrapper.find('div#FollowUpCompleted').at(wrapper.find('div#FollowUpCompleted').length - 1).simulate('click')
    expect(wrapper.find('CaseDetail').state().caseCompleteCancelItem).toEqual('FollowUpCompleted')
    wrapper.find('div#case-complete-id').at(wrapper.find('div#case-complete-id').length - 1).simulate('click')
    wrapper.find('div#NoLongerRequired').at(wrapper.find('div#NoLongerRequired').length - 1).simulate('click')
    expect(wrapper.find('CaseDetail').state().caseCompleteCancelItem).toEqual('NoLongerRequired')
  })
  it('Should Render Case Cancel complete button wth cancelCloseCase set to false', () => {
    const trackUpdateInFields = jest.fn()
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869270]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            cancelCloseCase: false,
            customerDetails: false
          }}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          updateCaseDetailItem={jest.fn()}
          trackUpdateInFields={trackUpdateInFields}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('div#case-complete-id').at(wrapper.find('div#case-complete-id').length - 1).simulate('click')
    wrapper.find('div#FollowUpCompleted').at(wrapper.find('div#FollowUpCompleted').length - 1).simulate('click')
    expect(wrapper.find('CaseDetail').state().caseCompleteCancelItem).toEqual('FollowUpCompleted')
    wrapper.find('div#case-complete-id').at(wrapper.find('div#case-complete-id').length - 1).simulate('click')
    wrapper.find('div#NoLongerRequired').at(wrapper.find('div#NoLongerRequired').length - 1).simulate('click')
    expect(wrapper.find('CaseDetail').state().caseCompleteCancelItem).toEqual('NoLongerRequired')
    wrapper.find('div#case-complete-id').at(wrapper.find('div#case-complete-id').length - 1).simulate('blur')
    expect(wrapper.find('CaseDetail').state().caseCompleteCancelDisplayOption).toBeFalsy()
    expect(trackUpdateInFields).toHaveBeenCalled()
  })
  it('should check for updated values', () => {
    const trackUpdateInFields = jest.fn()
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][0]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          banDetails={mockCaseBanDetail}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869270]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseComment={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            cancelCloseCase: false,
            customerDetails: false
          }}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          trackUpdateInFields={trackUpdateInFields}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('div#case-complete-id').at(wrapper.find('div#case-complete-id').length - 1).simulate('click')
    expect(trackUpdateInFields).toHaveBeenCalled()
  })
  it('should handle click event ', async () => {
    const trackRTSCloseModal = jest.fn()
    const addCaseHistoryDetail = jest.fn()
    const wrapper = shallow(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][1]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          agentIdentity={agentIdentity}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869271]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: false,
            caseComments: false,
            taskComments: false,
            calendarStatus: true,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={true}
          trackRTSCloseModal={trackRTSCloseModal}
          addCaseHistoryDetail={addCaseHistoryDetail}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    ).dive().dive()
    wrapper.instance().formatRTSWarningMsg('test')
    wrapper.instance().removeRTSCloseModalHandler()
    wrapper.instance().retunAndSaveRTSHandler()
    wrapper.instance().openRTSModalHandler()
    expect(wrapper.instance().state.popUpClosed).toBe(false)
    expect(trackRTSCloseModal).toHaveBeenCalled()
  })
  it('should update the rtsClosemodalStatus', () => {
    const trackRTSCloseModal = jest.fn()
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          trackRTSCloseModal={trackRTSCloseModal}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        />
      </Provider>
    )
    wrapper.find('CaseDetail').props().trackRTSCloseModal(2869264, false)
    wrapper.find('CaseDetail').props().addCaseHistoryDetail({ caseId: 1234, customerId: 4567 })
    expect(wrapper.find('CaseDetail').props().closeModalStatus).toBe(false)
  })

  it('should open notification modal', async () => {
    const trackRTSCloseModal = jest.fn()
    const addCaseHistoryDetail = jest.fn()
    const wrapper = mount(
      <Provider store={store}>
        <CaseDetail
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][1]}
          removeCaseDetail={removeCaseDetail}
          currentTabCustomerId="94676952"
          updateCaseDetail={jest.fn()}
          agentIdentity={agentIdentity}
          banDetails={banDetailWithKoodo}
          caseModalTaskDetail={caseModalAssociatedTasks.modal[2869272]}
          addCaseDetail={jest.fn()}
          removeCaseTaskDetail={jest.fn()}
          updateCommentStatus={jest.fn()}
          updateCommentText={jest.fn()}
          updateCaseFields={jest.fn()}
          updateTracker={{
            customerDetails: false,
            caseComments: false,
            taskComments: false,
            calendarStatus: true,
            cancelCloseCase: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModalStatus={false}
          taskHistoryDetail={jest.fn()}
          fetchTasksUnderCase={jest.fn()}
          updateCaseModalData={jest.fn()}
          taskUDTypeData={taskUDTypeDataCase}
          rtsCloseModalStatus={true}
          trackRTSCloseModal={trackRTSCloseModal}
          addCaseHistoryDetail={addCaseHistoryDetail}
          fetchNotificationData={jest.fn()}
          addDetail={jest.fn()}
          getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
          authData={mockAuth}
        />
      </Provider>
    )
    wrapper.find('#accordion_row_header').at(1).simulate('click')
    wrapper.find('#notification-link-89069').at(1).simulate('click')
    wrapper.find('#next-button-89069').at(1).simulate('click')
    expect(wrapper.find('CaseDetail').props().getNotificationModalDetail('taskWithinCase').isOpen).toBe(true)
    wrapper.find('#back-button-89069').at(1).simulate('click')
  })
  it('should dispatch removeNotificationPopUpData case detail', () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).removeNotificationPopUpData()
    expect(dispatch).toHaveBeenCalled()
  })
  it('should dispatch fetchNotificationListData case detail', () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).fetchNotificationListData()
    expect(dispatch).toHaveBeenCalled()
  })
  it('should dispatch updateCaseDetailItem case detail', () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).updateCaseDetailItem()
    expect(dispatch).toHaveBeenCalled()
  })
  it('should dispatch updateCommentText case detail', () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).updateCommentText()
    expect(dispatch).toHaveBeenCalled()
  })
  it('should dispatch updateCaseFields case detail', () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).updateCaseFields()
    expect(dispatch).toHaveBeenCalled()
  })
  it('should dispatch addDetail case detail', () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).addDetail()
    expect(dispatch).toHaveBeenCalled()
  })
  it('should dispatch fetchNotificationData case detail', () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).fetchNotificationData()
    expect(dispatch).toHaveBeenCalled()
  })
  it('should update the rtsClosemodalStatus', () => {
    const trackRTSCloseModal = jest.fn()
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          trackRTSCloseModal={trackRTSCloseModal}
          getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        />
      </Provider>
    )
    wrapper.find('CaseDetail').props().trackRTSCloseModal(2869264, false)
    wrapper.find('CaseDetail').props().addCaseHistoryDetail({ caseId: 1234, customerId: 4567 })
    expect(wrapper.find('CaseDetail').props().closeModalStatus).toBe(false)
  })

  it('minimize the case detail modal', async () => {
    const trackRTSCloseModal = jest.fn()
    const addCaseHistoryDetail = jest.fn()
    const detailData = mockDetailPopups[94676952][1]
    detailData.minimized = true
    const wrapper = mount(
      <CaseDetail
        tabIdDetail={tabIdDetail}
        detail={detailData}
        removeCaseDetail={removeCaseDetail}
        currentTabCustomerId="94676952"
        updateCaseDetail={jest.fn()}
        agentIdentity={agentIdentity}
        banDetails={banDetailWithKoodo}
        caseModalTaskDetail={caseModalAssociatedTasks.modal[2869271]}
        addCaseDetail={jest.fn()}
        removeCaseTaskDetail={jest.fn()}
        updateCommentStatus={jest.fn()}
        updateCommentText={jest.fn()}
        updateCaseFields={jest.fn()}
        updateTracker={{
          customerDetails: false,
          caseComments: false,
          taskComments: false,
          calendarStatus: true,
          cancelCloseCase: true
        }}
        trackUpdateInFields={jest.fn()}
        trackCloseModal={jest.fn()}
        closeModalStatus={false}
        taskHistoryDetail={jest.fn()}
        fetchTasksUnderCase={jest.fn()}
        updateCaseModalData={jest.fn()}
        taskUDTypeData={taskUDTypeDataCase}
        rtsCloseModalStatus={true}
        trackRTSCloseModal={trackRTSCloseModal}
        addCaseHistoryDetail={addCaseHistoryDetail}
        fetchNotificationData={jest.fn()}
        addDetail={jest.fn()}
        getNotificationModalDetail={jest.fn().mockImplementation(() => mockDetailPopups['2869264_ffh'][4])}
        getNotificationInfo={jest.fn().mockReturnValue(notificationMultipleData)}
        authData={mockAuth}
      />

    )
    expect(wrapper.find('#notification-popup-89069')).toEqual({})
  })

  it('should handle tab click', () => {
    const wrapper = mount(
      <Provider store={duplicateStore}>
        <ConnectedView
          detail={mockDetailPopups[2869264][0]}
        />
      </Provider>
    )
    const item = { taskId: 30126265, isOpen: true }
    const tab = { id: 'task_detail_modal_history_tab_', label: 'history' }
    wrapper.find(CaseDetail).instance().handleTabClick(item, tab)
    expect(wrapper.find('Accordion').length).toBe(1)
  })
})
