import React, { useState, useEffect } from 'react'
import { useBolster } from '@mobilelive-inc/bolsterjs'
import SearchTabs from './SearchTabs'
import AddressSearch from './AddressSearch'
import CustomerSearch from './CustomerSearch'

const Search = ({ onSubmit }) => {
  const { activeSearchTab, setActiveSearchTab } = useBolster()
  const [activeTab, setActiveTab] = useState(activeSearchTab === 0 ? 0 : 1)

  const handleTabSwitch = (index) => {
    setActiveTab(index)
    setActiveSearchTab(index)
  }

  useEffect(() => {}, [activeTab])

  return (
    <>
      <SearchTabs activeTab={activeTab} handleTabSwitch={handleTabSwitch} />
      {activeTab === 0 ? (
        <CustomerSearch
          onSubmit={onSubmit}
        />
      ) : (
        <AddressSearch
          onSubmit={onSubmit}
        />
      )}
    </>
  )
}

Search.propTypes = {}

export default Search
