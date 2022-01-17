import React from 'react'
import { mount } from 'enzyme'
import {
  Warranty, Receipt, PiggyBank, Heart, ChartsLine, Layers, Donate,
  Fingerprint, PrivateCloud
} from '@tds/core-decorative-icon'

import FFHNoteIcon from '../NotesIcon'
import { NoteHeaderWrapper } from '../styles'
import * as notesLocale from '../../../../../../locales/en/note.json'

const locale = {
  note: notesLocale
}

describe('NotesSection', () => {
  it('renders Assure header', () => {
    const wrapper = mount(<FFHNoteIcon type="Assure" locale={locale} />)
    expect(wrapper.contains(Warranty)).toBe(true)
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('Assure')
  })

  it('renders Billing header', () => {
    const wrapper = mount(<FFHNoteIcon type="Billing" locale={locale} />)
    expect(wrapper.contains(Receipt)).toBe(true)
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('Billing')
  })

  it('renders Collections header', () => {
    const wrapper = mount(<FFHNoteIcon type="Collections" locale={locale} />)
    expect(wrapper.contains(PiggyBank)).toBe(true)
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('Collections')
  })

  it('renders L&R header', () => {
    const wrapper = mount(<FFHNoteIcon type="L&R" locale={locale} />)
    expect(wrapper.contains(Heart)).toBe(true)
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('L&R')
  })

  it('renders Sell header', () => {
    const wrapper = mount(<FFHNoteIcon type="Sell" locale={locale} />)
    expect(wrapper.contains(ChartsLine)).toBe(true)
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('Sell')
  })

  it('renders ORT header', () => {
    const wrapper = mount(<FFHNoteIcon type="ORT" locale={locale} />)
    expect(wrapper.contains(Layers)).toBe(true)
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('Order Resolution')
  })

  it('renders Proactive Assurance header', () => {
    const wrapper = mount(<FFHNoteIcon type="Proactive Assurance" locale={locale} />)
    expect(wrapper.contains(Donate)).toBe(true)
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('Proactive Assurance')
  })

  it('renders PFraud header', () => {
    const wrapper = mount(<FFHNoteIcon type="Fraud" locale={locale} />)
    expect(wrapper.contains(Fingerprint)).toBe(true)
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('Fraud')
  })

  it('renders Internet Abuse header', () => {
    const wrapper = mount(<FFHNoteIcon type="Internet Abuse" locale={locale} />)
    expect(wrapper.contains(PrivateCloud)).toBe(true)
    expect(wrapper.find(NoteHeaderWrapper).text()).toEqual('Internet Abuse')
  })
})
