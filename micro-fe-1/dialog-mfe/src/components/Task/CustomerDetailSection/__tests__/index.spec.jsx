import React, { useRef } from 'react'
import moment from 'moment'
import { mount, shallow } from 'enzyme'
import CustomerDetailComponent from '../view'
import * as helper from '../../../../../../utils/helper'
import * as envToggle from '../../../../../../components/EnvToggle'

const mockFunction = jest.fn()
const mountWrapper = () => {
  return mount(
    <CustomerDetailComponent
      billingAccountName="Abc Xyz"
      billingAcctNum="12345566789"
      updateComment={jest.fn}
      cbr={
        {
          id: 'new-task-cbrr',
          value: '1234567890',
          onChange: mockFunction,
          label: 'CBR',
          isValid: true,
          isInputDisabled: false
        }
      }
      email={
        {
          id: 'new-task-email',
          value: 'abc@telus.com',
          onChange: mockFunction,
          label: 'email',
          isValid: true,
          isInputDisabled: false,
          isVisible: true
        }
      }
      language={
        {
          id: 'new-task-language',
          label: 'language',
          options: [],
          onChange: mockFunction,
          value: 'english'
        }
      }
      sms={
        {
          id: 'new-task-sms',
          value: '783838384',
          onChange: mockFunction,
          label: 'sms',
          isValid: true,
          isInputDisabled: false,
          visible: true,
          fetchSmsStatus: 'SUCCESS'
        }
      }
      isCardEditable={true}
    />
  )
}
jest.mock('react', () => {
  const originReact = jest.requireActual('react')
  const mUseRef = jest.fn()
  return {
    ...originReact,
    useRef: mUseRef
  }
})

describe('test customerdetails section', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })
  it('test if component exists and editable', () => {
    const wrapperComponent = mountWrapper()
    wrapperComponent.find('#link_button').at(wrapperComponent.find('#link_button').length - 1).simulate('click')
    wrapperComponent.find('#link_button').at(wrapperComponent.find('#link_button').length - 1).simulate('blur')
    expect(wrapperComponent).toBeTruthy()
  })
  it('test if component exists and locale is fr', () => {
    jest.spyOn(moment, 'locale').mockImplementation(() => 'fr')
    const wrapperComponent = mountWrapper()
    expect(wrapperComponent).toBeTruthy()
  })
  it('test if component exists and not editable', () => {
    const wrapperComponent = mountWrapper()
    wrapperComponent.setProps({
      isCardEditable: false
    })
    wrapperComponent.find('#link_button').at(wrapperComponent.find('#link_button').length - 1).simulate('click')
    expect(wrapperComponent).toBeTruthy()
  })
  it('onMouseOver should have been called', () => {
    const onMouseOver = jest.fn()
    const mRef = { current: { scrollWidth: 50, offsetWidth: 40 } }
    useRef.mockReturnValueOnce(mRef)
    const wrapper = shallow(
      <CustomerDetailComponent
        billingAccountName="Abc Xyz"
        billingAcctNum="12345566789"
        updateComment={jest.fn}
        cbr={
          {
            id: 'new-task-cbrr',
            value: '1234567890',
            onChange: mockFunction,
            label: 'CBR',
            isValid: true,
            isInputDisabled: false
          }
        }
        email={
          {
            id: 'new-task-email',
            value: 'abc@telus.com',
            onChange: mockFunction,
            label: 'email',
            isValid: true,
            isInputDisabled: false
          }
        }
        language={
          {
            id: 'new-task-language',
            label: 'language',
            options: [],
            onChange: mockFunction,
            value: 'english'
          }
        }
        sms={
          {
            id: 'new-task-sms',
            value: '783838384',
            onChange: mockFunction,
            label: 'sms',
            isValid: true,
            isInputDisabled: false,
            visible: true,
            fetchSmsStatus: 'SUCCESS'
          }
        }
        isCardEditable={true}
      />
    )
    wrapper.find('#banWrapper').simulate('mouseover', {})
    expect(onMouseOver).toBeTruthy()
  })
  it('launchGoSendInNewTab should have been called', () => {
    const launchGoSendInNewTab = jest.fn()
    helper.openWindowWithPost = jest.fn()
    envToggle.isFeatureEnabled = jest.fn(() => false)
    const wrapper = shallow(
      <CustomerDetailComponent
        billingAccountName="Abc Xyz"
        billingAcctNum="12345566789"
        updateComment={jest.fn}
        taskDetailsInfo={{
          lob: 'mobility',
          brand: 'KOODO',
          sms: '783838384',
          email: 'abc@telus.com',
          language: 'french'
        }}
        agentIdentity={{ employeeId: 'x213381', firstName: 'Prakash', lastName: 'Mishra' }}
        cbr={
          {
            id: 'new-task-cbrr',
            value: '1234567890',
            onChange: mockFunction,
            label: 'CBR',
            isValid: true,
            isInputDisabled: false
          }
        }
        email={
          {
            id: 'new-task-email',
            value: 'abc@telus.com',
            onChange: mockFunction,
            label: 'email',
            isValid: true,
            isInputDisabled: false
          }
        }
        language={
          {
            id: 'new-task-language',
            label: 'language',
            options: [],
            onChange: mockFunction,
            value: 'english'
          }
        }
        sms={
          {
            id: 'new-task-sms',
            value: '783838384',
            onChange: mockFunction,
            label: 'sms',
            isValid: true,
            isInputDisabled: false,
            visible: true,
            fetchSmsStatus: 'SUCCESS'
          }
        }
        isCardEditable={true}
      />
    )

    wrapper.find('Styled__CasaIconButton').simulate('click')
    expect(launchGoSendInNewTab).toBeTruthy()
    expect(envToggle.isFeatureEnabled).toBeTruthy()
    expect(helper.openWindowWithPost).toHaveBeenCalled()
  })
  it('launchGoSendInNewTab should have been called and isFeatureEnabled is true ', () => {
    const launchGoSendInNewTab = jest.fn()
    envToggle.isFeatureEnabled = jest.fn(() => true)
    const wrapper = shallow(
      <CustomerDetailComponent
        billingAccountName="Abc Xyz"
        billingAcctNum="12345566789"
        updateComment={jest.fn}
        taskDetailsInfo={{
          lob: 'mobility',
          brand: 'KOODO',
          sms: '783838384',
          email: 'abc@telus.com',
          language: 'french'
        }}
        agentIdentity={{ employeeId: 'x213381', firstName: 'Prakash', lastName: 'Mishra' }}
        cbr={
          {
            id: 'new-task-cbrr',
            value: '1234567890',
            onChange: mockFunction,
            label: 'CBR',
            isValid: true,
            isInputDisabled: false
          }
        }
        email={
          {
            id: 'new-task-email',
            value: 'abc@telus.com',
            onChange: mockFunction,
            label: 'email',
            isValid: true,
            isInputDisabled: false
          }
        }
        language={
          {
            id: 'new-task-language',
            label: 'language',
            options: [],
            onChange: mockFunction,
            value: 'english'
          }
        }
        sms={
          {
            id: 'new-task-sms',
            value: '783838384',
            onChange: mockFunction,
            label: 'sms',
            isValid: true,
            isInputDisabled: false,
            visible: true,
            fetchSmsStatus: 'SUCCESS'
          }
        }
        isCardEditable={true}
      />
    )

    wrapper.find('Styled__CasaIconButton').simulate('click')
    expect(launchGoSendInNewTab).toBeTruthy()
    expect(envToggle.isFeatureEnabled).toBeTruthy()
  })
})
