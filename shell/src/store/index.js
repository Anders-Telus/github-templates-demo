import { configureStore } from '@reduxjs/toolkit'
import search from '../reducers/searchSlice'

export default configureStore({
  reducer: {
    search,
  },
})