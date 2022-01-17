import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { experience, StandaloneExperience } from '@mobilelive-inc/bolsterjs'

function CustomComponent () {
  const [activeSearchTab, setActiveSearchTab] = useState(0)
  const [customerState, setCustomerState] = useState({
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
  })
  const [searchResults, setSearchResults] = useState(null)
  const [address, setAddress] = useState('')
  return (
    <StandaloneExperience
      activeSearchTab={activeSearchTab}
      setActiveSearchTab={setActiveSearchTab}
      searchResults={searchResults}
      setSearchResults={(data) => setSearchResults(data)}
      address={address}
      setAddress={setAddress}
      customerState={customerState}
      setCustomerState={setCustomerState}
      requiresAuth={false}
    />
  )
}

export default experience(App, ReactDOM.render, <CustomComponent />)
