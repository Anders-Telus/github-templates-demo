import { NOTES_CATEGORIES } from '../../../../constant'

export const prepCategoriesList = (options) => {
  const keys = Object.keys(options)
  const optionsMap = keys.map(key => ({ value: key, text: options[key] }))
  return optionsMap
}

// function here to prepare form payload
export const prepFormPayload = (
  selectedCategory, customerId, employeeId, commentText
) => {
  // define create note form obj
  const eventKey = selectedCategory.id
  const category = selectedCategory.text
  const eventId = NOTES_CATEGORIES[eventKey]
  const noteFormObj = {
    formData: {
      category,
      eventTypeId: eventId,
      customerId,
      agentId: employeeId,
      commentText
    }
  }
  return noteFormObj
}

/**
 * function too check if form has been modified
 */
export const isFormModified = (category, commentText) => {
  // extract selected options and comment text from payload
  return (category.id !== '' || commentText !== '')
}

/**
 * @description check whether note text contains any link & html script tags
 * @param {string} notetext
 * @returns boolean - true if no link & html tag included
 */
export const validateNoteText = (notetext) => {
  const htmlTagRegex = new RegExp(/<(.*?)>/gm)
  const linkRegex = new RegExp(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gm)
  return !htmlTagRegex.test(notetext) && !linkRegex.test(notetext)
}

/**
 * @description function to check default category for the form
 */
export const getDefaultCategory = (options, formData, iwsIntent) => {
  let category
  // first priority will go to stored form data
  if (formData.selectedCategory) {
    category = formData.selectedCategory
  } else if (iwsIntent) {
    const intent = iwsIntent.toLowerCase() === 'basic' ? 'general' : iwsIntent.toLowerCase()
    category = { id: intent, text: options[intent] }
  } else {
    const generalCategory = options.find(option => option.value === 'general')
    category = { id: generalCategory.value, text: generalCategory.text }
  }
  return category
}
