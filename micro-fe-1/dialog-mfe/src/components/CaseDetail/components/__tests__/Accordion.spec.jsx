import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Accordion from '../Accordion'

describe('Accordion test cases', () => {
  it('Should match Accordion snapshot', () => {
    const wrapper = mount(
      <Accordion>
        <div
          label="123" key="123" isOpen={true}
        >
          <div>Hello Accordion</div>
        </div>
        <div
          label="123" key="123" isOpen={true}
        >
          <div>Hello Accordion</div>
        </div>
      </Accordion>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('Should Simulate the Click event ', () => {
    const wrapper = mount(
      <Accordion>
        <div
          label="123" key="123" isOpen={true}
        >
          <div>Hello Accordion</div>
        </div>
        <div
          label="1234" key="1234" isOpen={true}
        >
          <div>Hello Accordion</div>
        </div>
      </Accordion>
    )
    wrapper.find('#accordion_row_header').at(wrapper.find('#accordion_row_header').length - 1).simulate('click')
  })
  it('Should Simulate the Click event with single accordion open ', () => {
    const wrapper = mount(
      <Accordion allowMultipleOpen>
        <div
          label="123" key="123" isOpen={true}
        >
          <div>Hello Accordion</div>
        </div>
        <div
          label="1234" key="1234" isOpen={true}
        >
          <div>Hello Accordion</div>
        </div>
      </Accordion>
    )
    wrapper.find('#accordion_row_header').at(wrapper.find('#accordion_row_header').length - 1).simulate('click')
  })
  it('Should allow tooltip and allow multiple accordion open', () => {
    const wrapper = mount(
      <Accordion allowMultipleOpen>
        <div
          label="123" key="123" isOpen={true}
        >
          <div>Hello Accordion</div>
        </div>
        <div
          label="1234" key="1234" isOpen={true}
        >
          <div>Hello Accordion</div>
        </div>
      </Accordion>
    )
    wrapper.find('#accordion_row_header').at(wrapper.find('#accordion_row_header').length - 1).simulate('click')
  })
})
