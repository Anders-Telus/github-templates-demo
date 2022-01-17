import React from 'react'
import { mount } from 'enzyme'
import thunk from 'redux-thunk'
import * as redux from 'react-redux'
import configureStore from 'redux-mock-store'
import Immutable from 'immutable'

import {
  mockMobilityReducerData,
  mockMinimizedDetailPopup,
  mockModifeableDetailPopup
} from './mockData.json'
import ConnectedView from '..'
import { PopupContainer } from '../../NotesSection/styles'
import Form from '../Form'
import { WordCount } from '../styles'
import { OpenStatusIcon } from '../../../styles'
import { MinimizeContainer, CloseBtnContainer } from '../../../../../components/DetailsPopup/styles'
import TextAreaComponent from '../../../../../components/TextArea'
import CloseModal from '../../CaseDetail/components/CloseModal'
import Notification from '../../../../../components/Notification'

const middlewares = [thunk]
const mockStoreConfigure = configureStore(middlewares)
const Provider = jest.spyOn(redux, 'Provider')

const createMockStore = (mockData) => {
  const mockStore = mockStoreConfigure({
    tabs: Immutable.fromJS(mockData.tabs),
    ban: Immutable.fromJS(mockData.ban),
    notes: Immutable.fromJS(mockData.notes),
    detailPopups: Immutable.fromJS(mockData.detailPopups)
  })
  return mockStore
}

describe('Create Note form', () => {
  it('renders Note form pop up named PopupContainer', () => {
    const mockStore = createMockStore(mockMobilityReducerData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="31910431_mobility"
        />
      </Provider>
    )
    const commentText = ' '.repeat(1001)
    wrapper.find('textarea').at(0).simulate('change', { target: { value: commentText } })
    wrapper.find('#save-note').at(0).simulate('click')
    wrapper.find('select').at(0).simulate('change')
    expect(wrapper.contains(PopupContainer)).toBe(true)
    expect(wrapper.find(PopupContainer).prop('style')).toStrictEqual({
      left: '1%', right: '1%', top: '458px', zIndex: 5, width: '56%'
    })
  })

  it('renders validate comment text', () => {
    const mockStore = createMockStore(mockMobilityReducerData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="31910431_mobility"
        />
      </Provider>
    )
    const commentText = '@'.repeat(10)
    wrapper.find('textarea').at(0).simulate('change', { target: { value: commentText } })
    wrapper.find('select').at(0).simulate('change', { target: { value: commentText } })
    wrapper.update()
    wrapper.find('#save-note').at(0).simulate('click')
    expect(wrapper.contains(Notification)).toBe(true)
  })

  it('should show CloseModal component on change textarea in CreateNote', () => {
    const mockStore = createMockStore(mockMobilityReducerData)
    const removeDetail = jest.fn()
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
    useDispatchSpy.mockReturnValue(removeDetail)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="31910431_mobility"
        />
      </Provider>
    )
    wrapper.find('textarea').simulate('change', { target: { value: 'new category' } })
    wrapper.update()
    wrapper.find(CloseBtnContainer).simulate('click')
    expect(wrapper.contains(CloseModal)).toBe(true)

    wrapper.find('#close-anyway-button').at(0).simulate('click')
    expect(removeDetail).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should dispatch removeDetail when commentText present on CreateNote', () => {
    const mockStore = createMockStore(mockMobilityReducerData)
    const removeDetail = jest.fn()
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
    useDispatchSpy.mockReturnValue(removeDetail)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="31910431_mobility"
        />
      </Provider>
    )
    wrapper.find(CloseBtnContainer).simulate('click')
    expect(removeDetail).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should dispatch updateDetail on CreateNote', () => {
    const mockStore = createMockStore(mockMobilityReducerData)
    const updateDetail = jest.fn()
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
    useDispatchSpy.mockReturnValue(updateDetail)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="31910431_mobility"
        />
      </Provider>
    )
    wrapper.find(MinimizeContainer).simulate('click')
    expect(updateDetail).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should dispatch saveNoteFormDetails on CreateNote', () => {
    const mockStore = createMockStore(mockMobilityReducerData)
    const saveNoteFormDetails = jest.fn()
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
    useDispatchSpy.mockReturnValue(saveNoteFormDetails)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="31910431_mobility"
        />
      </Provider>
    )
    wrapper.find('textarea').simulate('blur', { target: { value: 'new category' } })
    expect(saveNoteFormDetails).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should dispatch createNote on CreateNote', () => {
    const mockData = {
      ...mockMobilityReducerData,
      ban: {
        31910431: {
          fetchedConnectedAcctsStatus: true,
          parentId: '31910431_mobility',
          lineOfBusiness: 'ffh',
          fetchingLinkedAcctEndAt: true,
          transBillingAcctStatus: 'Open',
          customerId: '123456'
        }
      }
    }
    const mockStore = createMockStore(mockData)
    const createNote = jest.fn()
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
    useDispatchSpy.mockReturnValue(createNote)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="31910431_mobility"
        />
      </Provider>
    )
    const commentText = ' '.repeat(900)
    wrapper.find('textarea').at(0).simulate('change', { target: { value: commentText } })
    wrapper.update()
    wrapper.find('#save-note').at(0).simulate('click')
    expect(createNote).toHaveBeenCalledWith(expect.any(Function))
  })

  it('CasaBox should contain OpenStatusIcon component', () => {
    const mockData = {
      ...mockMobilityReducerData,
      ban: {
        31910431: {
          fetchedConnectedAcctsStatus: true,
          parentId: '31910431_mobility',
          lineOfBusiness: 'mobility',
          fetchingLinkedAcctEndAt: true,
          transBillingAcctStatus: 'Open'
        }
      }
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="31910431_mobility"
        />
      </Provider>
    )
    expect(wrapper.contains(OpenStatusIcon)).toBe(true)
  })

  it('should persist noteform input on tab switch', () => {
    // jest.mock('../../../../../utils/helper', () => {
    //   return 'en'
    // })
    const mockData = {
      ...mockMobilityReducerData,
      notes: {
        '31910431_mobility': {
          notes: [
            {
              id: '2.005866308E9',
              billingAccountNumber: '31910431',
              billingAcctType: 'Koodo - Consumer',
              type: 'BILE',
              date: '2019-09-10T12:07:13Z',
              lineOfBusiness: 'mobility',
              userId: '21011',
              brand: 'TELUS',
              notesText: 'The clients PIN has changed. null'
            }
          ],
          isFetching: true,
          isError: false
        }
      }
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="31910431_mobility"
        />
      </Provider>
    )
    expect(wrapper.contains(OpenStatusIcon)).toBe(true)
  })

  it('note form popup with minimze true in CreateNote', () => {
    const trackNoteCloseModal = jest.fn()
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
    useDispatchSpy.mockReturnValue(trackNoteCloseModal)
    const mockData = {
      ...mockMobilityReducerData,
      detailPopups: mockMinimizedDetailPopup
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="31910431_mobility"
        />
      </Provider>
    )
    expect(wrapper.find(PopupContainer).prop('style')).toStrictEqual({
      left: 'auto', right: '1%', top: 'auto', zIndex: 5, width: '56%'
    })
  })

  it('note form popup with modifeable empty in CreateNote', () => {
    const trackNoteCloseModal = jest.fn()
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
    useDispatchSpy.mockReturnValue(trackNoteCloseModal)
    const mockData = {
      ...mockMobilityReducerData,
      detailPopups: mockModifeableDetailPopup
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="31910431_mobility"
        />
      </Provider>
    )
    expect(wrapper.find(PopupContainer).prop('style')).toStrictEqual({
      left: '1%', right: '1%', top: '52%', zIndex: 5, width: '56%'
    })
  })

  it('should populate iws category in droop down', () => {
    const trackNoteCloseModal = jest.fn()
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
    useDispatchSpy.mockReturnValue(trackNoteCloseModal)
    const mockData = {
      tabs: {
        context: '1234_ffh',
        tabs: {
          '1234_ffh': {
            lineOfBusiness: 'ffh',
            name: 'JOEL WINKLER-ZZ',
            tabUniqId: '1234_ffh',
            billingAcctNum: '31910431',
            customerId: '31910431',
            template: 'profile',
            currentView: 'profile'
          }
        }
      },
      ban: {
        31910431: {
          fetchedConnectedAcctsStatus: true,
          parentId: '1234_ffh',
          lineOfBusiness: 'ffh',
          fetchingLinkedAcctEndAt: true
        }
      },
      detailPopups: {
        '1234_ffh': [
          {
            type: 'CreateNote',
            id: 'create_note_form_1234_ffh',
            dimensions: {
              height: '70vh',
              width: '75%'
            },
            index: 2,
            isOpen: true,
            minimized: false,
            isDraggable: true,
            position: 0,
            modifieable: {
              showMinimizeIcon: true,
              showCloseIcon: true,
              dragPosition: {
                x: '1%',
                y: '52%'
              },
              rel: {
                x: 0,
                y: 0
              },
              showFooter: false,
              showHeader: true,
              showBody: true
            }
          }
        ]
      },
      notes: Immutable.fromJS({
        '1234_ffh': { intent: 'basic' }
      })
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView
          tabUniqId="1234_ffh"
        />
      </Provider>
    )
    const selectedCategory = wrapper.find('select').at(0).childAt(1).text()
    expect(selectedCategory).toEqual('General')
  })

  it('should trigger onChange function in TextAreaComponent', () => {
    const setCommentText = jest.fn()
    const updateCommentText = jest.fn()
    const commentText = ''
    const mockEvent = { target: { value: 'new comment' } }
    const wrapper = mount(
      <TextAreaComponent
        rows="7"
        cols="58"
        maxLength="1000"
        placeHolder="Placeholder textarea"
        styles={{
          border: '1px solid #444',
          borderRadius: '5px'
        }}
        onChange={setCommentText}
        onBlur={updateCommentText}
        value={commentText}
      />
    )
    wrapper.find('textarea').simulate('change', mockEvent)
    expect(setCommentText).toHaveBeenCalledWith(expect.objectContaining(mockEvent))
  })

  it('should show error msg of limit exceed', () => {
    const commentText = ' '.repeat(1001)
    const wrapper = mount(
      <Form
        commentText={commentText}
        locale={{
          app: { ffh: 'ffh' },
          note: { ban: 'ban' },
          case: { comments: 'comments' }
        }}
      />
    )
    expect(wrapper.find(WordCount).text()).toEqual(' 1001/1000')
  })
})
