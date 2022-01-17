import React from 'react'
// import { shallow } from 'enzyme'
import expect from 'expect'
import renderer from 'react-test-renderer'

import { DateTimeLabelContainer } from '../styles'


describe('RefreshOverlay', () => {
  it('match snapshot when a DateTimeLabelContainer warningn is true', () => {
    const component = (
      <DateTimeLabelContainer warning={true}>
        <span>Regresh</span>
      </DateTimeLabelContainer>
    )
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('match snapshot when a DateTimeLabelContainer warningn is false', () => {
    const component = (
      <DateTimeLabelContainer warning={false}>
        <span>Regresh</span>
      </DateTimeLabelContainer>
    )
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
