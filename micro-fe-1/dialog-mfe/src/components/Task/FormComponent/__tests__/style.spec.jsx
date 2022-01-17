
import expect from 'expect'
import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DateTimeLabelContainer, CheckBox } from '../style'

describe('Button Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(<DateTimeLabelContainer isWarning={true} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('renders correctly CheckBox', () => {
    const wrapper = mount(<CheckBox disabled={true} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
