import * as React from 'react'
import { mount } from 'enzyme'
import Textarea from '..'


describe('Textarea component', () => {
  it('should display textarea', () => {
    const wrapper = mount(
      <Textarea
        id="textarea"
      />
    )
    wrapper.find('#textarea').at(0).simulate('change')
    wrapper.find('#textarea').at(0).simulate('blur')
  })
})
