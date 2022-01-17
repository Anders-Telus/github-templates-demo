import { prepCategoriesList, prepFormPayload, isFormModified } from '../helper'

describe('create note helper section', () => {
  it('should return a list of categories', () => {
    const dummyObject = {
      general: 'General'
    }
    const optionsMap = prepCategoriesList(dummyObject)
    expect(optionsMap.length).toEqual(1)
  })

  it('should return a payload for form', () => {
    const dummyCustomerID = 41305487
    const dummyEmployeeID = 12345
    const dummySelectedCategory = { id: 2, text: 'General' }
    const dummyCommentText = 'abcd'
    const dummyEventTypeId = undefined
    const noteFormObj = prepFormPayload(
      dummySelectedCategory.text,
      dummyCustomerID,
      dummyEmployeeID,
      dummyCommentText
    )
    expect(noteFormObj).toEqual({
      formData: {
        agentId: 12345,
        category: undefined,
        commentText: 'abcd',
        customerId: 41305487,
        eventTypeId: dummyEventTypeId
      }
    })
  })

  it('should return is form modified as true', () => {
    const data = { id: '123', text: 'someText' }
    const isModified = isFormModified(data, '')
    expect(isModified).toBe(true)
  })

  it('should return is form modified as true', () => {
    const data = { id: '', text: '' }
    const isModified = isFormModified(data, 'someText')
    expect(isModified).toBe(true)
  })
})
