import React from 'react'
import expect from 'expect'
import renderer from 'react-test-renderer'

import { ErrorContent } from '../styles'


describe('RefreshOverlay', () => {
  it('match snapshot when a language is fr and type is error', () => {
    const component = (
      <ErrorContent localLang="fr" type="error">
        <span>Regresh</span>
      </ErrorContent>
    )
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('match snapshot when a language is fr and type is not error', () => {
    const component = (
      <ErrorContent localLang="fr">
        <span>Regresh</span>
      </ErrorContent>
    )
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('match snapshot when a language is en and type is error', () => {
    const component = (
      <ErrorContent localLang="en" type="error">
        <span>Regresh</span>
      </ErrorContent>
    )
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('match snapshot when a language is en and type is not error', () => {
    const component = (
      <ErrorContent localLang="en">
        <span>Regresh</span>
      </ErrorContent>
    )
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
