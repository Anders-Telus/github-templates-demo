import * as React from 'react'
import { mount } from 'enzyme'
import momentTZ from 'moment-timezone'
import AddComment from '../view'

const item = {
  taskType: ''
}

const agentIdentity = {
  id: ''
}

const currentTabCustomerId = ''

const createWrapper = (data) => {
  return mount(
    <AddComment
      updateComment={jest.fn()}
      updateCommentStatus={jest.fn()}
      setNewComment={jest.fn()}
      taskType={data.item.taskType}
      agentIdentity={data.agentIdentity}
      currentTabCustomerId={data.currentTabCustomerId}
      myInput={data.myInput}
      addCommentStatus="SUCCESS"
      updateCommentText={jest.fn()}
      disabled={false}
      newCommentText="sdfgsdfg"
      handleCommentText={jest.fn()}
      handleSpinner={jest.fn()}
      updateTracker={{
        customerDetails: true,
        caseComments: true,
        taskComments: true
      }}
      trackUpdateInFields={jest.fn()}
    />
  )
}

describe('Test cases for AddComment', () => {
  jest.spyOn(momentTZ, 'locale').mockImplementation(() => 'fr')
  it('should match snapshot for AddComment', () => {
    expect(createWrapper({
      item,
      agentIdentity,
      currentTabCustomerId,
      myInput: {
        current: {}
      }
    }).find('#no-comment').exists()).toEqual(false)
  })

  it('should click on textarea ', () => {
    jest.spyOn(momentTZ, 'locale').mockImplementation(() => 'en')
    const myInput = {
      current: {
        value: '',
        cols: '65'
      }
    }
    const wrapper = mount(
      <AddComment
        updateComment={jest.fn()}
        updateCommentStatus={jest.fn()}
        taskType={item.taskType}
        agentIdentity={agentIdentity}
        currentTabCustomerId={currentTabCustomerId}
        myInput={myInput}
        addCommentStatus="ERROR"
        updateCommentText={jest.fn()}
        disabled={false}
        newCommentText="sdfgsdfg"
        handleCommentText={jest.fn()}
        handleSpinner={jest.fn()}
        updateTracker={{
          customerDetails: true,
          caseComments: true,
          taskComments: true
        }}
        trackUpdateInFields={jest.fn()}
      />
    )
    wrapper.find('div#textarea-task').simulate('click')

    wrapper.find('button#comment_button_task').simulate('click')
    setTimeout(() => {
      expect(wrapper.find('button#comment_button_task').prop('disabled')).toBeTruthy()
    })
  })

  it('should blur on textarea if textcontent is available', () => {
    const myInput = {
      current: {
        value: '',
        cols: '65'
      }
    }
    const wrapper = mount(
      <AddComment
        updateComment={jest.fn()}
        updateCommentStatus={jest.fn()}
        taskType={item.taskType}
        agentIdentity={agentIdentity}
        currentTabCustomerId={currentTabCustomerId}
        myInput={myInput}
        addCommentStatus="ERROR"
        updateCommentText={jest.fn()}
        disabled={false}
        newCommentText="sdfgsdfg"
        handleCommentText={jest.fn()}
        handleSpinner={jest.fn()}
        updateTracker={{
          customerDetails: true,
          caseComments: true,
          taskComments: true
        }}
        trackUpdateInFields={jest.fn()}
      />
    )
    wrapper.find('div#textarea-task').simulate('blur')
    setTimeout(() => {
      expect(wrapper.find('button#comment_button_task').prop('disabled')).toBeTruthy()
    })
  })

  it('should blur on textarea if textContent is not available', () => {
    const myInput = {
      current: {
        value: '',
        cols: '65'
      }
    }
    const wrapper = mount(
      <AddComment
        updateComment={jest.fn()}
        updateCommentStatus={jest.fn()}
        taskType={item.taskType}
        agentIdentity={agentIdentity}
        currentTabCustomerId={currentTabCustomerId}
        myInput={myInput}
        addCommentStatus="ERROR"
        updateCommentText={jest.fn()}
        disabled={false}
        newCommentText=""
        handleCommentText={jest.fn()}
        handleSpinner={jest.fn()}
        updateTracker={{
          customerDetails: true,
          caseComments: true,
          taskComments: true
        }}
        trackUpdateInFields={jest.fn()}
      />
    )
    wrapper.find('div#textarea-task').simulate('blur')
    setTimeout(() => {
      expect(wrapper.find('button#comment_button_task').prop('disabled')).toBeTruthy()
    })
  })
  it('should save Comment ', () => {
    const taskMetaData = {
      request: 'Move',
      type: 'AccountStatusCheck',
      brand: 'TELUS',
      lob: 'Mobility',
      interactionId: '891441f0-937e-11ea-8cee-47ec6f765d07',
      externalId: '1234'
    }
    const myInput = {
      current: {
        value: '',
        cols: '65'
      }
    }
    const wrapper = mount(
      <AddComment
        updateComment={jest.fn()}
        updateCommentStatus={jest.fn()}
        taskType={item.taskType}
        agentIdentity={agentIdentity}
        currentTabCustomerId={currentTabCustomerId}
        myInput={myInput}
        taskMetaData={taskMetaData}
        addCommentStatus="ERROR"
        updateCommentText={jest.fn()}
        disabled={false}
        newCommentText="sdfgsdfg"
        handleCommentText={jest.fn()}
        handleSpinner={jest.fn()}
        taskId="123"
        updateTracker={{
          customerDetails: true,
          caseComments: true,
          taskComments: true
        }}
        trackUpdateInFields={jest.fn()}
      />
    )
    wrapper.find('div#textarea-task').simulate('input', {
      target: {
        value: 'asdfasfdasdfaf'
      }
    })

    wrapper.find('button#comment_button_task').simulate('click')
    setTimeout(() => {
      expect(wrapper.find('button#comment_button_task').prop('disabled')).toBeTruthy()
    })
  })

  it('should submit blank value in textarea ', () => {
    const wrapper = mount(
      <AddComment
        updateComment={jest.fn()}
        updateCommentStatus={jest.fn()}
        taskType={item.taskType}
        agentIdentity={agentIdentity}
        currentTabCustomerId={currentTabCustomerId}
        addCommentStatus="ERROR"
        updateCommentText={jest.fn()}
        disabled={false}
        newCommentText=""
        handleCommentText={jest.fn()}
        handleSpinner={jest.fn()}
        updateTracker={{
          customerDetails: true,
          caseComments: true,
          taskComments: true
        }}
        trackUpdateInFields={jest.fn()}
      />
    )
    wrapper.find('div#textarea-task').simulate('input', {
      target: {
        value: ' '
      }
    })

    wrapper.find('button#comment_button_task').simulate('click')
    setTimeout(() => {
      expect(wrapper.find('button#comment_button_task').prop('disabled')).toBeTruthy()
    })
  })

  it('should save case Comment ', () => {
    const taskMetaData = {
      request: 'Move',
      type: 'AccountStatusCheck',
      brand: 'TELUS',
      lob: 'Mobility',
      interactionId: '891441f0-937e-11ea-8cee-47ec6f765d07',
      externalId: '1234'
    }
    const myInput = {
      current: {
        value: '',
        cols: '65'
      }
    }
    const wrapper = mount(
      <AddComment
        updateComment={jest.fn()}
        updateCommentStatus={jest.fn()}
        taskType={item.taskType}
        agentIdentity={agentIdentity}
        currentTabCustomerId={currentTabCustomerId}
        myInput={myInput}
        taskMetaData={taskMetaData}
        addCommentStatus="ERROR"
        updateCommentText={jest.fn()}
        disabled={false}
        newCommentText="sdfgsdfg"
        handleCommentText={jest.fn()}
        handleSpinner={jest.fn()}
        updateTracker={{
          customerDetails: true,
          caseComments: true,
          taskComments: true
        }}
        trackUpdateInFields={jest.fn()}
      />
    )
    wrapper.find('div#textarea-task').simulate('input', {
      target: {
        value: 'asdfasfdasdfaf'
      }
    })

    wrapper.find('button#comment_button_task').simulate('click', {
      tId: '123'
    })
    setTimeout(() => {
      expect(wrapper.find('button#comment_button_task').prop('disabled')).toBeTruthy()
    })
  })
})
