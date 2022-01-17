import React from 'react'
import { mount } from 'enzyme'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import Immutable from 'immutable'
import * as redux from 'react-redux'
import {
  Fingerprint, Receipt, Heart, Warranty, ChartsLine
} from '@tds/core-decorative-icon'

import ConnectedView from '..'
import skeletons from '../skeletons'
import {
  NotificationIcon, NotificationText,
  NoteHeaderWrapper
} from '../styles'
import { NoRecordContainer } from '../../../../../components/Styled'
import Note from '../Note'
import NotesIcon from '../NotesIcon'
import {
  mockMobilityReducerData,
  mockMobNotes,
  mockFfhReducerData,
  mockFfhNotes
} from './mockData.json'

const middlewares = [thunk]
const mockStoreConfigure = configureStore(middlewares)
const Provider = jest.spyOn(redux, 'Provider')

const createMockStore = (mockData) => {
  const mockStore = mockStoreConfigure({
    tabs: Immutable.fromJS(mockData.tabs),
    ban: Immutable.fromJS(mockData.ban),
    notes: Immutable.fromJS(mockData.notes)
  })
  return mockStore
}

describe('Customeer 360 notes section', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should render skeleton if fetching notes', () => {
    const mockStore = createMockStore(mockMobilityReducerData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView />
      </Provider>
    )
    expect(wrapper.contains(skeletons)).toBe(true)
  })

  it('should render skeleton if fetching connected accounts', () => {
    const mockData = {
      ...mockMobilityReducerData,
      ban: {
        31910431: {
          fetchedConnectedAcctsStatus: true,
          parentId: '31910431_mobility',
          lineOfBusiness: 'mobility',
          fetchingLinkedAcctEndAt: false
        }
      }
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView />
      </Provider>
    )
    expect(wrapper.contains(skeletons)).toBe(true)
  })

  it('should display error icon in case of error', () => {
    const mockData = {
      ...mockMobilityReducerData,
      notes: {
        '31910431_mobility': {
          notes: [],
          isFetching: false,
          isError: true
        }
      },
      ban: {
        31910431: {
          fetchedConnectedAcctsStatus: true,
          parentId: '31910431_mobility',
          lineOfBusiness: 'mobility',
          fetchingLinkedAcctEndAt: true
        }
      }
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView />
      </Provider>
    )
    expect(wrapper.contains(NotificationIcon)).toBe(true)
    expect(wrapper.contains(NotificationText)).toBe(true)
  })

  it('should display mo record container if no data found', () => {
    const mockData = {
      ...mockMobilityReducerData,
      notes: {
        '31910431_mobility': {
          notes: [],
          isFetching: false,
          isError: false
        }
      },
      ban: {
        31910431: {
          fetchedConnectedAcctsStatus: false,
          parentId: '31910431_mobility',
          lineOfBusiness: 'mobility',
          fetchingLinkedAcctEndAt: true
        }
      }
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView />
      </Provider>
    )
    expect(wrapper.contains(NoRecordContainer)).toBe(true)
  })

  it('should render notes if everything is ok for mobility', () => {
    const mockData = {
      ...mockMobilityReducerData,
      notes: {
        '31910431_mobility': {
          notes: mockMobNotes,
          isFetching: false,
          isError: false
        }
      },
      ban: {
        31910431: {
          fetchedConnectedAcctsStatus: true,
          parentId: '31910431_mobility',
          lineOfBusiness: 'mobility',
          fetchingLinkedAcctEndAt: true
        }
      }
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView />
      </Provider>
    )
    expect(wrapper.contains(Note)).toBe(true)
  })

  it('should render no notes for mobility', () => {
    const mockData = {
      ...mockMobilityReducerData,
      notes: {
        '31910431_mobility': {
          isFetching: false,
          isError: false,
          notes: []
        }
      },
      ban: {
        31910431: {
          fetchedConnectedAcctsStatus: true,
          parentId: '31910431_mobility',
          lineOfBusiness: 'mobility',
          fetchingLinkedAcctEndAt: true
        }
      }
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView />
      </Provider>
    )
    expect(wrapper.find(NoRecordContainer).text()).toEqual('No notes were found')
  })

  it('should render on view all click ', () => {
    const mockData = {
      ...mockMobilityReducerData,
      notes: {
        '31910431_mobility': {
          notes: mockMobNotes,
          isFetching: false,
          isError: false
        }
      }
    }
    const mockStore = createMockStore(mockData)
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
    const fetchNotes = jest.fn()
    const updateTabView = jest.fn()
    const handleViewMoreClick = jest.fn()
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView />
      </Provider>
    )
    wrapper.find('#viewMore').at(1).simulate('click')
    useDispatchSpy.mockReturnValue(fetchNotes)
    useDispatchSpy.mockReturnValue(updateTabView)
    expect(handleViewMoreClick).not.toHaveBeenCalled()
  })

  it('should render error ', () => {
    const mockData = {
      ...mockMobilityReducerData,
      notes: {
        '31910431_mobility': {
          notes: mockMobNotes,
          isFetching: false,
          isError: true
        }
      },
      ban: {
        31910431: {
          fetchedConnectedAcctsStatus: false,
          parentId: '31910431_mobility',
          lineOfBusiness: 'mobility'
        }
      }
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView />
      </Provider>
    )
    expect(wrapper.contains(NotificationText)).toBe(true)
  })

  it('should render when click on header', () => {
    const mockData = {
      ...mockMobilityReducerData,
      notes: {
        '31910431_mobility': {
          notes: mockMobNotes,
          isFetching: false,
          isError: false
        }
      },
      ban: {
        31910431: {
          fetchedConnectedAcctsStatus: true,
          parentId: '31910431_mobility',
          lineOfBusiness: 'mobility',
          fetchingLinkedAcctEndAt: true
        }
      },
      detailPopups: {
        '31910431_mobility': [
          {
            type: 'selectedNote',
            id: '5.800616466E9',
            index: 4,
            minimized: false,
            position: 0,
            isDraggable: true,
            isOpen: true,
            modifieable: {
              showMinimizeIcon: true,
              showCloseIcon: true,
              showFooter: false,
              showHeader: true,
              showBody: true,
              dragPosition: {
                x: '25%',
                y: '177px'
              }
            }
          }
        ]
      }
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView />
      </Provider>
    )
    wrapper.find('#notes_header').get(1).props.onClick()
    const event = {
      preventDefault() {},
      target: { value: '_blank' }
    }
    wrapper.find('#note_id').get(1).props.onClick(event)
    expect(wrapper.contains(NotesIcon)).toBe(true)
    expect(wrapper.find(NotesIcon).at(0).find(NoteHeaderWrapper).text()).toEqual('BILE')
  })

  it('should show note icons EEQP in detail popup', () => {
    const wrapper = mount(
      <NotesIcon
        type="EEQP"
        templateData="note-popup"
      />
    )
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('EEQP')
  })

  it('should show note icons BILL in detail popup', () => {
    const wrapper = mount(
      <NotesIcon
        type="BILL"
        templateData="note-popup"
      />
    )
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('BILL')
    expect(wrapper.find(Receipt).prop('size')).toBe(20)
  })

  it('should show note icons FMM in detail popup', () => {
    const wrapper = mount(
      <NotesIcon
        type="FMM"
        templateData="note-popup"
      />
    )
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('FMM')
    expect(wrapper.find(Fingerprint).prop('size')).toBe(20)
  })

  it('should show note icons LNR in detail popup', () => {
    const wrapper = mount(
      <NotesIcon
        type="LNR"
        templateData="note-popup"
      />
    )
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('LNR')
    expect(wrapper.find(Heart).prop('size')).toBe(20)
  })

  it('should render notes if everything is ok for ffh', () => {
    const mockData = {
      ...mockFfhReducerData,
      notes: {
        '31910431_ffh': {
          notes: mockFfhNotes,
          isFetching: false,
          isError: false
        }
      },
      ban: {
        31910431: {
          fetchedConnectedAcctsStatus: true,
          parentId: '31910431_ffh',
          lineOfBusiness: 'ffh',
          fetchingLinkedAcctEndAt: true
        }
      }
    }
    const mockStore = createMockStore(mockData)
    const wrapper = mount(
      <Provider store={mockStore}>
        <ConnectedView />
      </Provider>
    )
    expect(wrapper.contains(Note)).toBe(true)
  })

  it('should show note icons EEQP in detail popup', () => {
    const wrapper = mount(
      <NotesIcon
        type="EEQP"
        templateData="note-popup"
      />
    )
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('EEQP')
    expect(wrapper.find(Warranty).prop('size')).toBe(20)
  })

  it('should show note icons BILL in detail popup', () => {
    const wrapper = mount(
      <NotesIcon
        type="BILL"
        templateData="note-popup"
      />
    )
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('BILL')
    expect(wrapper.find(Receipt).prop('size')).toBe(20)
  })

  it('should show note icons CLSA in detail popup', () => {
    const wrapper = mount(
      <NotesIcon
        type="CLSA"
        templateData="note-popup"
      />
    )
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('CLSA')
    expect(wrapper.find(ChartsLine).prop('size')).toBe(20)
  })
})
