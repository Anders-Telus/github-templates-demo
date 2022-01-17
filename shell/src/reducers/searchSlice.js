import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    customerState: {
      inputForm: {
        telephone: '',
        banOrEmail: '',
        customerID: '',
        caseOrTaskNumber: '',
        firstName: '',
        lastName: '',
        caseOrTask: 'task'
      },
      errorMsg: '',
      errorField: '',
      focusedFields: [],
      activeInput: null
    }
  },
  reducers: {
    setCustomerState: (state, action) => {
      state.customerState = { ...action.payload }
    },
  },
})

export const { setCustomerState } = searchSlice.actions

export default searchSlice.reducer