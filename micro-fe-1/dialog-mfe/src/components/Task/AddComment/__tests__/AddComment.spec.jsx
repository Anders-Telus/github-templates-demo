import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddComment from '../view'

describe('Custom AddComment component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should match Snapshot', () => {
    const wrapper = mount(
      <AddComment
        id="add_new_comment"
        placeholder="Add Comment"
        addCommentHandler={jest.fn()}
        newCommentText=""
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('Should active on click and backgroud will be white', () => {
    const wrapper = mount(
      <AddComment
        id="add_new_comment"
        placeholder="Add Comment"
        addCommentHandler={jest.fn()}
        newCommentText="Test New Comment"
      />
    )
    wrapper.find('div#add_new_comment').simulate('click')
    wrapper.find('div#add_new_comment').simulate('input', {
      target: {
        value: ''
      }
    })
    expect(wrapper.find('div#add_new_comment').props().style.background).toEqual('white')
  })
  it('Should background transparent on blur', () => {
    const wrapper = mount(
      <AddComment
        id="add_new_comment"
        placeholder="Add Comment"
        addCommentHandler={jest.fn()}
        newCommentText=""
      />
    )
    wrapper.find('div#add_new_comment').simulate('click')
    expect(wrapper.find('div#add_new_comment').props().style.background).toEqual('white')
    wrapper.find('div#add_new_comment').simulate('blur')
    expect(wrapper.find('div#add_new_comment').props().style.background).toEqual('transparent')
  })
  it('Should type in comment at event onInput', () => {
    const wrapper = mount(
      <AddComment
        id="add_new_comment"
        placeholder="Add Comment"
        addCommentHandler={jest.fn()}
        newCommentText=""
      />
    )
    wrapper.find('div#add_new_comment').simulate('click')
    wrapper.find('div#add_new_comment').simulate('input', {
      target: {
        value: ''
      }
    })
    expect(wrapper.find('div#add_new_comment').props().content).toEqual('')
  })
})
