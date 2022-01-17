import React from 'react'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import momentTZ from 'moment-timezone'
import * as fetchUtils from '../../../../../utils/fetch'
import ConnectedView from '../index'
import DetailComponent from '../FormComponent/view'
import store from '../../../../../__mocks__/data/mockStore'
import {
  mockTabsData,
  mockCustomerSearch,
  mockBanData,
  mockProductsReducer,
  mockNotes,
  // mockRequestTypeInitial,
  mockAgent,
  mockDetailPopups,
  caseModalAssociatedTasks,
  mockAuth,
  mockAddress,
  mockTaskCascadeMenuItemData,
  mockTaskUDSuccess,
  mockTaskUDFinal,
  tabIdDetail,
  mockRequestTypeInitialDuplicate
} from '../../../../../__mocks__/data/mockData'
import TaskForm from '../view'
import DetailsPopup from '../../../../../components/DetailsPopup/view'

import * as adobe from '../../../../../utils/adobe'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const duplicateStore = mockStore({
  tabs: Immutable.fromJS(mockTabsData),
  customerSearch: Immutable.fromJS(mockCustomerSearch),
  address: Immutable.fromJS(mockAddress),
  ban: Immutable.fromJS(mockBanData),
  product: Immutable.fromJS(mockProductsReducer),
  notes: Immutable.fromJS(mockNotes),
  task: mockRequestTypeInitialDuplicate,
  agent: Immutable.fromJS(mockAgent),
  detailPopups: Immutable.fromJS(mockDetailPopups),
  Case: Immutable.fromJS(caseModalAssociatedTasks),
  auth: Immutable.fromJS(mockAuth)
})

const dueDatePassed = momentTZ.tz('2019-01-24T00:00:00.00Z', 'America/Vancouver')
const dueTimePassed = '09:00'

const fieldValidation = {
  comment: {
    valid: true
  },
  cbr: {
    valid: true,
    message: ''
  },
  selectedRequest: {
    valid: true
  },
  dueDate: {
    valid: true
  },
  selectedType: {
    valid: true
  },
  assignTo: {
    valid: true
  },
  language: {
    valid: true
  },
  LOB: {
    valid: true
  },
  email: {
    valid: true,
    message: ''
  }
}

const townCheckTaskFormInfo = (data) => {
  return {
    ban: '70873913',
    lob: data.lob,
    brand: data.brand,
    taskFormOpen: true,
    tabUniqId: data.tabUniqId,
    request: '',
    type: '',
    selectedRequest: data.selectedRequest || '',
    isTOWNCheck: true,
    selectedType: data.selectedType || '',
    comment: data.comment || '',
    cbr: data.cbr || '',
    zIndex: {
      create: 1
    },
    language: data.language,
    assignTo: 'T-999999',
    system: data.system || '',
    disableTicketIdField: true,
    ticketId: data.ticketId || '',
    dragging: false,
    pos: {
      x: 0,
      y: 0
    },
    agentFunction: ['CR1', 'CR2'],
    rel: null,
    selectedLOB: data.selectedLOB,
    priority: data.priority || '',
    requestSubTypes: [],
    requestTypes: [],
    languageList: [],
    systemList: [],
    lobList: [],
    isAllFieldValid: true,
    saveTaskStatus: 'UNINIT',
    taskClose: data.taskClose || false,
    taskSaveStatus: data.taskSaveStatus || 'UNINIT',
    showCalendar: true,
    calendar: false,
    dueDate: dueDatePassed,
    createTaskCalendar: {
      dueDate: '2020-10-04T10:00:00.00Z',
      dueTime: '10:00am',
      isBusinessHours: false,
      isChanged: false,
      errorMessage: '',
      timeErrorMessage: ''
    },
    email: 'abc@gmail.com',
    sms: '123456789',
    fieldValidation: {
      cbr: {
        valid: true,
        message: ''
      },
      email: {
        valid: true,
        message: ''
      },
      sms: {
        valid: true
      }
    },
    fetchSmsStatus: 'PENDING'
  }
}

const taskFormInfo = (data) => {
  return {
    ban: '70873913',
    lob: data.lob,
    brand: data.brand,
    taskFormOpen: true,
    tabUniqId: data.tabUniqId,
    request: '',
    type: '',
    selectedRequest: data.selectedRequest || '',
    selectedType: data.selectedType || '',
    comment: data.comment || '',
    cbr: data.cbr || '',
    zIndex: {
      create: 1
    },
    language: data.language,
    assignTo: 'T-999999',
    system: data.system || '',
    disableTicketIdField: true,
    ticketId: data.ticketId || '',
    dragging: false,
    pos: {
      x: 0,
      y: 0
    },
    agentFunction: ['CR1', 'CR2'],
    rel: null,
    selectedLOB: data.selectedLOB,
    priority: data.priority || '',
    requestSubTypes: [],
    requestTypes: [],
    languageList: [],
    systemList: [],
    lobList: [],
    isAllFieldValid: true,
    saveTaskStatus: 'UNINIT',
    taskClose: data.taskClose || false,
    taskSaveStatus: data.taskSaveStatus || 'UNINIT',
    showCalendar: true,
    calendar: false,
    dueDate: dueDatePassed,
    createTaskCalendar: {
      dueDate: '2020-10-04T10:00:00.00Z',
      dueTime: '10:00am',
      isBusinessHours: false,
      isChanged: false,
      errorMessage: '',
      timeErrorMessage: ''
    },
    email: 'abc@gmail.com',
    sms: '123456789',
    fieldValidation: {
      cbr: {
        valid: true,
        message: ''
      },
      email: {
        valid: true,
        message: ''
      },
      sms: {
        valid: true
      }
    },
    fetchSmsStatus: 'PENDING'
  }
}

const agentIdentity = {
  firstName: 'Amar',
  lastName: 'Nath Maurya',
  employeeId: 'X224648'
}

const mockJsonPromiseRequest = Promise.resolve(mockTaskUDSuccess)
const mockFetchPromiseRequest = Promise.resolve({
  json: () => mockJsonPromiseRequest
})

const mockSuccessSaveTask = {
  status: 200
}

const mockJsonPromiseSaveTask = Promise.resolve(mockSuccessSaveTask)
const mockFetchPromiseSaveTask = Promise.resolve({
  json: () => mockJsonPromiseSaveTask
})

const switchTab = jest.fn()

const createWrapper = (type) => {
  if (type === 'shallow') {
    return shallow(
      <TaskForm
        tabIdDetail={tabIdDetail}
        detail={mockDetailPopups[94676952][1]}
        task={taskFormInfo({
          fieldValidation,
          tabUniqId: '2869264',
          selectedLOB: '',
          lob: 'mobility'
        })}
        updateTaskDetail={jest.fn()}
        removeTaskDetail={jest.fn()}
        checkRouteAgentFunction={jest.fn()}
        currentTabCustomer="94676952"
        billingAcct={mockBanData[70873913]}
        getTaskUDList={jest.fn()}
        saveStandAloneTask={jest.fn()}
        taskSaveStatus="UNINIT"
        closeForm={jest.fn()}
        switchTab={switchTab}
        setDueDateTime={jest.fn()}
        currentCustomer={{ tabUniqId: 94676952 }}
        getTaskCascadeList={jest.fn()}
        taskUDTypeData={mockTaskUDFinal}
        agentIdentity={agentIdentity}
        taskUDTypeDataStatus="INIT"
        taskCascadeMenuItemList={mockTaskCascadeMenuItemData.taskCascadeMenuItemList}
        taskCascadeMenuItemListStatus="SUCCESS"
        updateDateTime={jest.fn()}
        dueTime={dueTimePassed}
        dueDate={dueDatePassed}
        isBanFIFA={true}
        pendingMoveOrProvideOrderExists={true}
        changeDueDateStatus={jest.fn()}
        dueDateStatus="SUCCESS"
        cbrOptions={[]}
        updateCalendar={jest.fn()}
        updateTracker={{
          customerDetails: false,
          caseComments: true,
          taskComments: true,
          calendarStatus: true
        }}
        trackUpdateInFields={jest.fn()}
        trackCloseModal={jest.fn()}
        closeModal={true}
        updateCreateTaskSms={jest.fn()}
        banDetails={{
          isParent: true
        }}
      />
    )
  }
  return mount(
    <Provider store={duplicateStore}>
      <ConnectedView />
    </Provider>
  )
}

const mountedComp = (taskData) => {
  return mount(
    <Provider store={store}>
      <TaskForm
        tabIdDetail={tabIdDetail}
        detail={taskData.mock || mockDetailPopups[94676952][1]}
        task={taskFormInfo(taskData)}
        updateTaskDetail={jest.fn()}
        removeTaskDetail={jest.fn()}
        checkRouteAgentFunction={jest.fn()}
        currentTabCustomer="94676952"
        billingAcct={mockBanData[70873913]}
        getTaskUDList={jest.fn()}
        saveStandAloneTask={jest.fn()}
        taskSaveStatus="UNINIT"
        closeForm={jest.fn()}
        switchTab={jest.fn()}
        setDueDateTime={jest.fn()}
        currentCustomer={{ tabUniqId: 94676952 }}
        getTaskCascadeList={jest.fn()}
        taskUDTypeData={mockTaskUDFinal}
        agentIdentity={agentIdentity}
        taskUDTypeDataStatus="INIT"
        taskCascadeMenuItemList={mockTaskCascadeMenuItemData.taskCascadeMenuItemList}
        taskCascadeMenuItemListStatus="SUCCESS"
        updateDateTime={jest.fn()}
        dueTime={dueTimePassed}
        dueDate={dueDatePassed}
        isBanFIFA={true}
        pendingMoveOrProvideOrderExists={true}
        changeDueDateStatus={jest.fn()}
        dueDateStatus="SUCCESS"
        cbrOptions={[]}
        updateCalendar={jest.fn()}
        updateTracker={{
          customerDetails: false,
          caseComments: true,
          taskComments: true,
          calendarStatus: true
        }}
        trackUpdateInFields={jest.fn()}
        trackCloseModal={jest.fn()}
        closeModal={true}
        updateCreateTaskSms={jest.fn()}
        banDetails={{
          isParent: true
        }}
      />
    </Provider>
  )
}

describe('Task form test cases', () => {
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
  it('render task form', () => {
    const wrapper = createWrapper()
    wrapper.find(TaskForm).props().switchTab()
    wrapper.find(TaskForm).props().setDueDateTime()
    wrapper.find(TaskForm).props().removeTaskDetail()
    wrapper.find(TaskForm).props().updateCreateTaskSms()
    wrapper.find(TaskForm).props().trackUpdateInFields()
    wrapper.find(TaskForm).props().trackCloseModal()
    wrapper.find(TaskForm).props().closeForm()
    expect(wrapper.find(DetailsPopup).exists()).toEqual(true)
  })
  it('render task form with oppposite values', () => {
    adobe.pushTaskCasePageView = jest.fn()
    const wrapper = mountedComp({
      mock: mockDetailPopups[94676952][4],
      selectedRequest: 'Install',
      selectedType: 'PromiseToContact',
      comment: 'Testing comment',
      system: 'OMS',
      ticketId: '12345',
      selectedLOB: 'Mobility',
      priority: 'high',
      taskClose: false,
      taskSaveStatus: 'SUCCESS',
      tabUniqId: '',
      brand: '',
      cbr: '',
      language: 'English'
    })
    expect(wrapper.find(DetailsPopup).exists()).toEqual(true)
    wrapper.unmount()
  })
  it('render task form with lob homesolutions', () => {
    const wrapper = mountedComp({
      selectedRequest: 'Install',
      selectedType: 'PromiseToContact',
      comment: 'Testing comment',
      system: 'OMS',
      ticketId: '12345',
      priority: 'high',
      taskClose: true,
      taskSaveStatus: 'SUCCESS',
      tabUniqId: '',
      lob: 'homesolutions',
      brand: 'telus',
      cbr: '123456789',
      language: 'English'
    })
    const instance = wrapper.find(TaskForm).instance()
    instance.setState({ selectedLOB: 'HomeSolutions' })
    expect(instance.state.selectedLOB).toEqual('HomeSolutions')
  })

  it('should trigger change in props', () => {
    const derivedValues = TaskForm.getDerivedStateFromProps(
      {
        task: {},
        billingAcct: {},
        detail: { minimized: false }
      },
      {
        tabUniqId: '1234',
        language: 'English'
      }
    )
    expect(derivedValues.selectedRequest).toEqual(undefined)
  })

  it('should save due date', () => {
    const wrapper = mountedComp({
      selectedRequest: 'Install',
      selectedType: 'PromiseToContact',
      comment: 'Testing comment',
      system: 'OMS',
      ticketId: '12345',
      priority: 'high',
      taskClose: true,
      taskSaveStatus: 'SUCCESS',
      tabUniqId: '',
      lob: 'random',
      brand: 'telus',
      cbr: '123456789',
      language: 'English'
    })
    const instance = wrapper.find(TaskForm).instance()
    instance.setState({ showCalendar: true })
    wrapper.update()
    wrapper.find('#save-calendar').at(wrapper.find('#save-calendar').length - 1).simulate('change', {
    })
    expect(instance.state.showCalendar).toBe(true)
  })
  xit('should check if Form is closed', () => {
    const wrapper = mountedComp({
      selectedRequest: 'Install',
      selectedType: 'PromiseToContact',
      comment: 'Testing comment',
      system: 'OMS',
      ticketId: '12345',
      priority: 'high',
      taskClose: true,
      taskSaveStatus: 'SUCCESS',
      tabUniqId: '',
      lob: 'random',
      brand: 'telus',
      cbr: '123456789',
      language: 'English'
    })
    wrapper.setProps({
      currentTabCustomer: '2869264'
    })
    const com = wrapper.find(TaskForm)
    const instance = com.instance()
    instance.setState({
      pos: { x: 0, y: 0 }
    })
    instance.changeDueDateStatus()
    instance.saveDueDate(dueDatePassed, '11:30 AM', true, 'taskForm')
    wrapper.update()
    expect(com.state().taskClose).toEqual(true)
  })
  it('should fire componentDidUpdate with mismatching customer Ids', () => {
    const props = {
      task: taskFormInfo({
        selectedRequest: 'Install',
        selectedType: 'PromiseToContact',
        comment: 'Testing comment',
        system: 'OMS',
        ticketId: '12345',
        priority: 'high',
        taskClose: true,
        taskSaveStatus: 'SUCCESS',
        tabUniqId: '6789012',
        lob: 'mobility',
        brand: 'koodo',
        cbr: '123456789',
        language: 'English',
        email: 'abc@gmail.com'
      })
    }
    const wrapper = createWrapper('shallow')
    wrapper.instance().componentDidUpdate(props, {})
    wrapper.instance().componentDidUpdate(props, { taskClose: true })
    expect(switchTab).toHaveBeenCalled()
  })
  it('should call save task', () => {
    window.adobeDataLayer = []
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseRequest)
    const spy = jest.spyOn(TaskForm.prototype, 'validate').mockImplementationOnce(() => true)
    const spyMandatory = jest.spyOn(TaskForm.prototype, 'validateMandatoryFields').mockImplementationOnce(() => true)
    const wrapper = createWrapper()
    wrapper.find('#task-comment').at(wrapper.find('#task-comment').length - 1).simulate('change', {
      target: {
        value: 'Initial Comment'
      }
    })
    jest.spyOn(fetchUtils, 'fetchService').mockImplementation(() => mockFetchPromiseSaveTask)
    wrapper.find('#save-task').at(wrapper.find('#save-task').length - 1).simulate('click')
    expect(spy).toHaveBeenCalled()
    expect(spyMandatory).toHaveBeenCalled()
    wrapper.unmount()
  })
  it('should select LOB', () => {
    const saveStandAloneTask = jest.fn()
    const closeTask = jest.fn()
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedView
          detail={mockDetailPopups[94676952][1]}
          task={taskFormInfo({
            selectedRequest: 'Install',
            selectedType: 'PromiseToContact',
            comment: 'Testing comment',
            system: 'OMS',
            ticketId: '12345',
            priority: 'high',
            taskClose: true,
            taskSaveStatus: 'SUCCESS',
            tabUniqId: '6789012',
            lob: 'random',
            brand: 'telus',
            cbr: '1234567890',
            language: 'English'
          })}
          updateTaskDetail={jest.fn()}
          removeTaskDetail={jest.fn()}
          formData={{}}
          closeTask={closeTask}
          openCalendar={jest.fn()}
          dueDate={dueDatePassed}
          dueTime={dueTimePassed}
          isBusinessHours={true}
          closeCalendar={jest.fn()}
          saveStandAloneTask={saveStandAloneTask}
          taskUDTypeData={mockTaskUDFinal}
          getTaskUDList={jest.fn()}
          taskCascadeMenuItemList={[]}
          taskCascadeMenuItemListStatus="UNINIT"
          getTaskCascadeList={jest.fn()}
          taskSaveStatus="UNINIT"
          agentIdentity={agentIdentity}
          switchTab={jest.fn()}
          updateTracker={{
            selectedRequest: true,
            selectedType: true,
            comment: true,
            cbr: true,
            email: true,
            selectedLOB: true,
            agentFunction: true,
            language: true,
            dueDate: true,
            dueTime: true,
            isBusinessHours: true,
            dueDateStatus: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModal={true}
        />
      </Provider>
    )
    const com = wrapper.find(TaskForm)
    const instance = com.instance()
    instance.setState({
      selectedRequest: '1',
      selectedType: 'TelusFollowup',
      assignTo: '123456',
      language: 'English',
      selectedLOB: 'HomeSolutions'
    })
    wrapper.find('#save-task').at(wrapper.find('#save-task').length - 1).simulate('click')
    wrapper.find('#task-create-lob').at(wrapper.find('#task-create-lob').length - 1).simulate('change', {
      target: { value: 'HomeSolutions' }
    })
    expect(com.state().selectedLOB).toEqual('HomeSolutions')
  })
  it('should select LOB and validate opposite conditions', () => {
    const saveStandAloneTask = jest.fn()
    const closeTask = jest.fn()
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedView
          detail={mockDetailPopups[94676952][1]}
          task={taskFormInfo({
            selectedRequest: '',
            selectedType: '',
            language: '',
            selectedLOB: '',
            comment: 'Testing comment',
            system: 'OMS',
            ticketId: '12345',
            priority: 'high',
            taskClose: true,
            taskSaveStatus: 'SUCCESS',
            tabUniqId: '6789012',
            lob: 'random',
            brand: 'telus',
            cbr: '123456789'
          })}
          updateTaskDetail={jest.fn()}
          removeTaskDetail={jest.fn()}
          formData={{}}
          closeTask={closeTask}
          openCalendar={jest.fn()}
          dueDate={dueDatePassed}
          dueTime={dueTimePassed}
          isBusinessHours={true}
          closeCalendar={jest.fn()}
          saveStandAloneTask={saveStandAloneTask}
          taskUDTypeData={mockTaskUDFinal}
          getTaskUDList={jest.fn()}
          taskCascadeMenuItemList={[]}
          taskCascadeMenuItemListStatus="UNINIT"
          getTaskCascadeList={jest.fn()}
          taskSaveStatus="UNINIT"
          agentIdentity={agentIdentity}
          switchTab={jest.fn()}
          updateTracker={{
            selectedRequest: true,
            selectedType: true,
            comment: true,
            cbr: true,
            email: true,
            selectedLOB: true,
            agentFunction: true,
            language: true,
            dueDate: true,
            dueTime: true,
            isBusinessHours: true,
            dueDateStatus: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModal={true}
        />
      </Provider>
    )
    const com = wrapper.find(TaskForm)
    const instance = com.instance()
    instance.setState({
      selectedRequest: '',
      selectedType: '',
      assignTo: '123456',
      language: '',
      selectedLOB: '',
      cbr: '',
      comment: 'testing comment'
    })
    wrapper.find('#save-task').at(wrapper.find('#save-task').length - 1).simulate('click')
    wrapper.find('#task-create-lob').at(wrapper.find('#task-create-lob').length - 1).simulate('change', {
      target: { value: '' }
    })
    expect(com.state().selectedLOB).toEqual('')
  })
  xit('should close Form', () => {
    const saveStandAloneTask = jest.fn()
    const closeTask = jest.fn()
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedView
          detail={mockDetailPopups[94676952][1]}
          task={taskFormInfo({
            selectedRequest: 'Install',
            selectedType: 'PromiseToContact',
            comment: 'Testing comment',
            system: 'OMS',
            ticketId: '12345',
            priority: 'high',
            taskClose: true,
            taskSaveStatus: 'SUCCESS',
            tabUniqId: '6789012',
            lob: 'random',
            brand: 'telus',
            cbr: '123456789',
            language: 'English'
          })}
          updateTaskDetail={jest.fn()}
          removeTaskDetail={jest.fn()}
          formData={{}}
          closeForm={jest.fn()}
          closeTask={closeTask}
          openCalendar={jest.fn()}
          dueDate={dueDatePassed}
          dueTime={dueTimePassed}
          isBusinessHours={true}
          closeCalendar={jest.fn()}
          saveStandAloneTask={saveStandAloneTask}
          taskUDTypeData={mockTaskUDFinal}
          getTaskUDList={jest.fn()}
          taskCascadeMenuItemList={[]}
          taskCascadeMenuItemListStatus="UNINIT"
          getTaskCascadeList={jest.fn()}
          taskSaveStatus="UNINIT"
          agentIdentity={agentIdentity}
          switchTab={jest.fn()}
          setDueDateTime={jest.fn()}
          minimizeMaximize={jest.fn()}
          updateTracker={{
            selectedRequest: true,
            selectedType: true,
            comment: true,
            cbr: true,
            email: true,
            selectedLOB: true,
            agentFunction: true,
            language: true,
            dueDate: true,
            dueTime: true,
            isBusinessHours: true,
            dueDateStatus: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModal={true}
        />
      </Provider>
    )
    wrapper.setProps({
      currentTabCustomer: '2869264'
    })
    const com = wrapper.find(TaskForm)
    const instance = com.instance()
    instance.setState({
      pos: { x: 0, y: 0 }
    })
    instance.changeDueDateStatus()
    instance.saveDueDate(dueDatePassed, '11:30 AM', true, 'taskForm')
    wrapper.update()
    expect(com.state().taskClose).toEqual(false)
  })
  it('should select language option', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedView
          detail={mockDetailPopups[94676952][1]}
          task={taskFormInfo({
            selectedRequest: 'Install',
            selectedType: 'PromiseToContact',
            comment: 'Testing comment',
            system: 'OMS',
            ticketId: '12345',
            priority: 'high',
            taskClose: true,
            taskSaveStatus: 'SUCCESS',
            tabUniqId: '6789012',
            lob: 'random',
            brand: 'telus',
            cbr: '123456789',
            language: 'English'
          })}
          updateTaskDetail={jest.fn()}
          removeTaskDetail={jest.fn()}
          closeTask={jest.fn()}
          openCalendar={jest.fn()}
          dueDate={dueDatePassed}
          dueTime={dueTimePassed}
          isBusinessHours={true}
          closeCalendar={jest.fn()}
          saveStandAloneTask={jest.fn()}
          taskUDTypeDataStatus="SUCCESS"
          taskUDTypeData={mockTaskUDFinal}
          getTaskUDList={jest.fn()}
          taskCascadeMenuItemList={mockTaskCascadeMenuItemData.taskCascadeMenuItemList}
          taskCascadeMenuItemListStatus="SUCCESS"
          getTaskCascadeList={jest.fn()}
          taskSaveStatus="UNINIT"
          agentIdentity={agentIdentity}
          updateTracker={{
            selectedRequest: true,
            selectedType: true,
            comment: true,
            cbr: true,
            email: true,
            selectedLOB: true,
            agentFunction: true,
            language: true,
            dueDate: true,
            dueTime: true,
            isBusinessHours: true,
            dueDateStatus: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModal={true}
        />
      </Provider>
    )
    wrapper.find('#new-task-language').at(wrapper.find('#new-task-language').length - 1).simulate('change', {
      target: { value: 'English' }
    })
    const instance = wrapper.find(TaskForm).instance()
    expect(instance.state.language).toEqual('English')
  })
  it('should handle cbr change, request type, sub type and agent function', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedView
          detail={mockDetailPopups[94676952][1]}
          task={taskFormInfo({
            selectedRequest: 'Install',
            selectedType: 'PromiseToContact',
            comment: 'Testing comment',
            system: 'OMS',
            ticketId: '12345',
            priority: 'high',
            taskClose: true,
            taskSaveStatus: 'SUCCESS',
            tabUniqId: '6789012',
            lob: 'random',
            brand: 'telus',
            cbr: '123456789',
            language: 'English'
          })}
          updateTaskDetail={jest.fn()}
          removeTaskDetail={jest.fn()}
          closeTask={jest.fn()}
          openCalendar={jest.fn()}
          dueDate={dueDatePassed}
          dueTime={dueTimePassed}
          isBusinessHours={true}
          closeCalendar={jest.fn()}
          saveStandAloneTask={jest.fn()}
          taskUDTypeDataStatus="SUCCESS"
          taskUDTypeData={mockTaskUDFinal}
          getTaskUDList={jest.fn()}
          taskCascadeMenuItemList={mockTaskCascadeMenuItemData.taskCascadeMenuItemList}
          taskCascadeMenuItemListStatus="SUCCESS"
          getTaskCascadeList={jest.fn()}
          taskSaveStatus="UNINIT"
          agentIdentity={agentIdentity}
          updateTracker={{
            selectedRequest: true,
            selectedType: true,
            comment: true,
            cbr: true,
            email: true,
            selectedLOB: true,
            agentFunction: true,
            language: true,
            dueDate: true,
            dueTime: true,
            isBusinessHours: true,
            dueDateStatus: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModal={true}
        />
      </Provider>
    )
    wrapper.find('#request-type').at(wrapper.find('#request-type').length - 1).simulate('change', {
      target: { value: 'Repair' }
    })
    wrapper.find('#request-subtype').at(wrapper.find('#request-subtype').length - 1).simulate('change', {
      target: { value: 'Promise To Contact' }
    })
    wrapper.find('#agent-function').at(wrapper.find('#agent-function').length - 1).simulate('change', {
      target: { value: 'TS' }
    })
    wrapper.find('input#cbr_typed_select_cbr').simulate('click')
    wrapper.find('input#cbr_typed_select_cbr').simulate('change', { target: { value: '7786894835' } })
    wrapper.find('Editable#new-task-email').props().onChange('abc@telus.com')
    const instance = wrapper.find(TaskForm).instance()
    expect(instance.state.selectedType).toEqual('Promise To Contact')
    expect(instance.state.agentFunction).toEqual('TS')
    expect(instance.state.cbr).toEqual('7788997788')
  })


  it('should handle cbr change, request type, sub type and agent function when town check is true', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedView
          detail={mockDetailPopups[94676952][1]}
          task={townCheckTaskFormInfo({
            selectedRequest: 'Install',
            selectedType: 'PromiseToContact',
            comment: 'Testing comment',
            system: 'OMS',
            ticketId: '12345',
            priority: 'high',
            taskClose: true,
            taskSaveStatus: 'SUCCESS',
            tabUniqId: '6789012',
            lob: 'random',
            brand: 'telus',
            cbr: '123456789',
            language: 'English'
          })}
          SubTypeDateFormatCalendarDate={null}
          updateTaskDetail={jest.fn()}
          removeTaskDetail={jest.fn()}
          closeTask={jest.fn()}
          openCalendar={jest.fn()}
          dueDate={dueDatePassed}
          dueTime={dueTimePassed}
          isBusinessHours={true}
          closeCalendar={jest.fn()}
          saveStandAloneTask={jest.fn()}
          taskUDTypeDataStatus="SUCCESS"
          taskUDTypeData={mockTaskUDFinal}
          getTaskUDList={jest.fn()}
          taskCascadeMenuItemList={mockTaskCascadeMenuItemData.taskCascadeMenuItemList}
          taskCascadeMenuItemListStatus="SUCCESS"
          getTaskCascadeList={jest.fn()}
          taskSaveStatus="UNINIT"
          agentIdentity={agentIdentity}
          updateTracker={{
            selectedRequest: true,
            selectedType: true,
            comment: true,
            cbr: true,
            email: true,
            selectedLOB: true,
            agentFunction: true,
            language: true,
            dueDate: true,
            dueTime: true,
            isBusinessHours: true,
            dueDateStatus: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModal={true}
        />
      </Provider>
    )
    wrapper.find('#request-type').at(wrapper.find('#request-type').length - 1).simulate('change', {
      target: { value: 'Repair' }
    })
    wrapper.find('#request-subtype').at(wrapper.find('#request-subtype').length - 1).simulate('change', {
      target: { value: 'Promise To Contact' }
    })
    wrapper.find('#agent-function').at(wrapper.find('#agent-function').length - 1).simulate('change', {
      target: { value: 'TS' }
    })
    wrapper.find('input#cbr_typed_select_cbr').simulate('click')
    wrapper.find('input#cbr_typed_select_cbr').simulate('change', { target: { value: '7786894835' } })
    wrapper.find('Editable#new-task-email').props().onChange('abc@telus.com')
    const instance = wrapper.find(TaskForm).instance()
    expect(instance.state.selectedType).toEqual('Promise To Contact')
    expect(instance.state.agentFunction).toEqual('TS')
    expect(instance.state.cbr).toEqual('7788997788')
  })
  it('render Calendar and Task component', () => {
    const setDueDateTime = jest.fn()
    const currentCustomer = { tabUniqId: '2869264' }
    const wrapper = mount(
      <Provider store={store}>
        <TaskForm
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][2]}
          billingAcct={mockBanData}
          task={taskFormInfo({
            selectedRequest: 'Install',
            selectedType: 'PromiseToContact',
            comment: 'Testing comment',
            system: 'OMS',
            ticketId: '12345',
            priority: 'high',
            taskClose: true,
            taskSaveStatus: 'SUCCESS',
            tabUniqId: '6789012',
            lob: 'random',
            brand: 'telus',
            cbr: '7786894835',
            email: 'abc@gmail.com',
            language: 'English',
            fieldValidation: {
              comment: {
                valid: true
              },
              cbr: {
                valid: false,
                message: ''
              },
              email: {
                valid: false,
                message: ''
              },
              sms: {
                valid: true
              },
              dueDate: {
                valid: true
              },
              selectedType: {
                valid: true
              },
              assignTo: {
                valid: true
              },
              language: {
                valid: true
              },
              LOB: {
                valid: true
              }
            }
          })}
          updateTaskDetail={jest.fn()}
          removeTaskDetail={jest.fn()}
          closeTask={jest.fn()}
          openCalendar={jest.fn()}
          dueDate={dueDatePassed}
          dueTime={dueTimePassed}
          isBusinessHours={true}
          closeCalendar={jest.fn()}
          taskUDTypeDataStatus="INIT"
          taskUDTypeData={{}}
          getTaskUDList={jest.fn()}
          taskCascadeMenuItemList={[]}
          taskCascadeMenuItemListStatus="SUCCESS"
          getTaskCascadeList={jest.fn()}
          switchTab={jest.fn()}
          agentIdentity={agentIdentity}
          setDueDateTime={setDueDateTime}
          updateCreateIndex={jest.fn()}
          updateDateTime={jest.fn()}
          currentCustomer={currentCustomer}
          updateCalendar={jest.fn()}
          changeDueDateStatus={jest.fn()}
          updateTracker={{
            selectedRequest: true,
            selectedType: true,
            comment: true,
            cbr: true,
            email: true,
            selectedLOB: true,
            agentFunction: true,
            language: true,
            dueDate: true,
            dueTime: true,
            isBusinessHours: true,
            dueDateStatus: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModal={true}
          updateCreateTaskSms={jest.fn()}
          banDetails={{
            isParent: true
          }}
        />
      </Provider>
    )
    const instance = wrapper.find(TaskForm).instance()
    instance.setState({ dueTimeEdit: true })
    wrapper.update()
    wrapper.find('input#cbr_typed_select_cbr').simulate('click')
    wrapper.find('input#cbr_typed_select_cbr').simulate('change', { target: { value: '7786894835' } })
    wrapper.find('#task_creation_duedate_label').at(wrapper.find('#task_creation_duedate_label').length - 1).simulate('click')
    wrapper.find('#task_due_date').at(wrapper.find('#task_due_date').length - 1).simulate('click')
    wrapper.find('#save-calendar').at(wrapper.find('#save-calendar').length - 1).simulate('click')
    wrapper.find('#task_creation_duedate_label').at(wrapper.find('#task_creation_duedate_label').length - 1).simulate('click')
    wrapper.find('#task_due_date').at(wrapper.find('#task_due_date').length - 1).simulate('click')
    wrapper.find('#cancel-calendar').at(wrapper.find('#cancel-calendar').length - 1).simulate('click')
    expect(instance.state.cbr).toEqual('7786894835')
    expect(wrapper.find('#cancel-calendar').exists()).toBeFalsy()
  })

  it('render Calendar and Task component  for towncheck', () => {
    const setDueDateTime = jest.fn()
    const currentCustomer = { tabUniqId: '2869264' }
    const wrapper = mount(
      <Provider store={store}>
        <TaskForm
          tabIdDetail={tabIdDetail}
          detail={mockDetailPopups[94676952][2]}
          billingAcct={mockBanData}
          task={townCheckTaskFormInfo({
            selectedRequest: 'Install',
            selectedType: 'PromiseToContact',
            comment: 'Testing comment',
            system: 'OMS',
            ticketId: '12345',
            priority: 'high',
            taskClose: true,
            taskSaveStatus: 'SUCCESS',
            tabUniqId: '6789012',
            lob: 'random',
            brand: 'telus',
            cbr: '7786894835',
            email: 'abc@gmail.com',
            language: 'English',
            fieldValidation: {
              comment: {
                valid: true
              },
              cbr: {
                valid: false,
                message: ''
              },
              email: {
                valid: false,
                message: ''
              },
              sms: {
                valid: true
              },
              dueDate: {
                valid: true
              },
              selectedType: {
                valid: true
              },
              assignTo: {
                valid: true
              },
              language: {
                valid: true
              },
              LOB: {
                valid: true
              }
            }
          })}
          updateTaskDetail={jest.fn()}
          removeTaskDetail={jest.fn()}
          closeTask={jest.fn()}
          openCalendar={jest.fn()}
          dueDate={dueDatePassed}
          dueTime={dueTimePassed}
          isBusinessHours={true}
          closeCalendar={jest.fn()}
          taskUDTypeDataStatus="INIT"
          taskUDTypeData={{}}
          getTaskUDList={jest.fn()}
          taskCascadeMenuItemList={[]}
          taskCascadeMenuItemListStatus="SUCCESS"
          getTaskCascadeList={jest.fn()}
          switchTab={jest.fn()}
          agentIdentity={agentIdentity}
          setDueDateTime={setDueDateTime}
          updateCreateIndex={jest.fn()}
          updateDateTime={jest.fn()}
          currentCustomer={currentCustomer}
          updateCalendar={jest.fn()}
          changeDueDateStatus={jest.fn()}
          updateTracker={{
            selectedRequest: true,
            selectedType: true,
            comment: true,
            cbr: true,
            email: true,
            selectedLOB: true,
            agentFunction: true,
            language: true,
            dueDate: true,
            dueTime: true,
            isBusinessHours: true,
            dueDateStatus: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModal={true}
          updateCreateTaskSms={jest.fn()}
          banDetails={{
            isParent: true
          }}
        />
      </Provider>
    )
    const instance = wrapper.find(TaskForm).instance()
    instance.setState({ dueTimeEdit: true })
    wrapper.update()
    wrapper.find('input#cbr_typed_select_cbr').simulate('click')
    wrapper.find('input#cbr_typed_select_cbr').simulate('change', { target: { value: '7786894835' } })
    wrapper.find('#accordion_data_due_time_value').at(wrapper.find('#accordion_data_due_time_value').length - 1).simulate('click')
    wrapper.find('#cancel-calendar').at(wrapper.find('#cancel-calendar').length - 1).simulate('click')
    expect(instance.state.cbr).toEqual('7786894835')
    expect(wrapper.find('#cancel-calendar').exists()).toBeFalsy()
  })

  it('should handle cbr change, request type, sub type and agent function', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedView
          detail={mockDetailPopups[94676952][1]}
          task={taskFormInfo({
            selectedRequest: 'Install',
            selectedType: 'PromiseToContact',
            comment: 'Testing comment',
            system: 'OMS',
            ticketId: '12345',
            priority: 'high',
            taskClose: true,
            taskSaveStatus: 'SUCCESS',
            customerId: '6789012',
            lob: 'random',
            brand: 'telus',
            cbr: '123456789',
            language: 'English'
          })}
          routeAgentFunction={true}
          updateTaskDetail={jest.fn()}
          removeTaskDetail={jest.fn()}
          closeTask={jest.fn()}
          openCalendar={jest.fn()}
          dueDate={dueDatePassed}
          dueTime={dueTimePassed}
          isBusinessHours={true}
          closeCalendar={jest.fn()}
          saveStandAloneTask={jest.fn()}
          taskUDTypeDataStatus="SUCCESS"
          taskUDTypeData={mockTaskUDFinal}
          getTaskUDList={jest.fn()}
          taskCascadeMenuItemList={mockTaskCascadeMenuItemData.taskCascadeMenuItemList}
          taskCascadeMenuItemListStatus="SUCCESS"
          getTaskCascadeList={jest.fn()}
          taskSaveStatus="UNINIT"
          agentIdentity={agentIdentity}
          updateTracker={{
            selectedRequest: true,
            selectedType: true,
            comment: true,
            cbr: true,
            email: true,
            selectedLOB: true,
            agentFunction: true,
            language: true,
            dueDate: true,
            dueTime: true,
            isBusinessHours: true,
            dueDateStatus: true
          }}
          trackUpdateInFields={jest.fn()}
          trackCloseModal={jest.fn()}
          closeModal={true}
          checkRouteAgentFunction={jest.fn()}
        />
      </Provider>
    )
    const e = { target: { checked: true } }
    const instance = wrapper.find(TaskForm).instance()
    instance.checkRouteAgentFunction(e)
    expect(instance.state.routeAgentFunction).toEqual(true)
    const eUpdate = { target: { checked: false } }
    instance.checkRouteAgentFunction(eUpdate)
    expect(instance.state.routeAgentFunction).toEqual(false)
  })

  it('should call default props SubTypeDateFormatCalendarDate', () => {
    const props = {
      requestOptions: {},
      typeOptions: {},
      agentOptions: {},
      dueDateOptions: {},
      openCalendar: () => {},
      addCommentOptions: {},
      type: ''
    }
    const wrapper = mount(<DetailComponent {...props} />)
    expect(wrapper.props().SubTypeDateFormatCalendarDate()).toEqual(undefined)
  })
})
