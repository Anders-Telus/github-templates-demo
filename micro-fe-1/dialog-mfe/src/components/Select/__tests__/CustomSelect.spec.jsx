import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import CustomSelect from '../CustomSelect'

const optionsArray = [{ text: 'Request', value: 'Request' }, { text: 'telus', value: 'telus' }, { text: 'subtype', value: 'subtype' }]
describe('Custom Select Test cases', () => {
  it('Should render custom Select with border', () => {
    const wrapper = mount(
      <CustomSelect
        id="custom_select"
        options={optionsArray}
        onChange={jest.fn()}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('should render custom select without border', () => {
    const wrapper = mount(
      <CustomSelect
        id="custom_select"
        options={optionsArray}
        onChange={jest.fn()}
        borderLess={true}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
