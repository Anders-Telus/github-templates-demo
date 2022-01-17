import React, { useState } from 'react'
import { useBolster } from '@mobilelive-inc/bolsterjs'
import Search from "./Search";
import Panel from "../Panel";
import Arrow from "../../../static/Arrow";
import SearchResult from "../SearchResult/Table";
import { ArrowIcon, AnimatedContainer, Spinner } from "./styles";
import { CasaBox } from "../Styled";
import { initialData } from '../../helpers/dataset'
import { keyMappings, permissions } from '../../helpers/constants'
import { hasAccess } from '../../helpers/auth'

export default () => {
  const { openSearchResultTab, requiresAuth, roles } = useBolster()
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = (formState, addressResult) => {
    if (requiresAuth && !hasAccess(roles, permissions.SEARCH_ACTION)) return
    let searchResults = []
    setLoading(true)

    if (formState) {
      const { inputForm } = formState;
      const { firstName, lastName } = inputForm;
      const formDetails = {
        ...inputForm,
        fullName: firstName || lastName ? `${firstName}/${lastName}` : "",
      };

      let url = '';
      if (formDetails.telephone) {
        url = `tel/${formDetails.telephone}`;
      } else if (formDetails.banOrEmail) {
        url = `ban/${formDetails.banOrEmail}`
      } else if (formDetails.customerID) {
        url = `id/${formDetails.customerID}`
      } else if (formDetails.caseOrTaskNumber) {
        url = `cases/${formDetails.caseOrTaskNumber}`
      } else if (formDetails.fullName) {
        url = `name/${formDetails.fullName}`
      }

      // fetch(`http://local.telus.com:3000/backend/customers/search/${url}`, { credentials: 'include' })
      // .then(res => res.json())
      // .then((data) => {
      //   setSearchResults(data.data)
      // }).finally(() => {
      //   setLoading(false)
      // });
      for (const [key, val] of Object.entries(keyMappings)) {
        if (formDetails[key]) {
          searchResults = initialData.filter((row) =>
            row[val]
              .toString()
              .toLowerCase()
              .includes(formDetails[key].toString().toLowerCase())
          )
        }
      }
    } else {
      searchResults = addressResult;
    }

    let timeout = 0 // set timeout to zero in case both are null (clear search result)
    if (formState || addressResult) {
      timeout = (Math.floor(Math.random() * 3) + 1) * 1000
    }
    setTimeout(() => {
      setSearchResults(searchResults)
      setLoading(false)
    }, timeout)
  }

  const togglePanel = (row) => {
    if (requiresAuth && !hasAccess(roles, permissions.SEARCH_RESULT_VIEW)) return
    openSearchResultTab(row)
  }

  return (
    <AnimatedContainer>
      <CasaBox display="inline-flex" inline>
        <CasaBox pt={2} width="25vw">
          <Panel
            hasRightBorder
            suppressHydrationWarning
            scrollbarStyle="overlay"
            padding={{ right: "16px", left: "16px" }}
          >
            <Search
              key="searchForm"
              onSubmit={(customerData, addressData) =>
                onSubmit(customerData, addressData)}
            />
          </Panel>
        </CasaBox>

        <ArrowIcon id="arrowIcon" alt="arrow" onClick={() => { }} show>
          <Arrow />
        </ArrowIcon>

        <Spinner label={<span>Loading</span>} spinning={loading} inline>
          <CasaBox pt={4} width="75vw">
            <Panel
              hasLeftBorder={!true}
              padding={{ right: "0px", left: "5px" }}
              style={{
                overflowY: "scroll",
                height: "84vh",
                overflowX: "hidden",
              }}
            >
              <SearchResult
                searchResults={searchResults}
                togglePanel={togglePanel}
                customerBAN=''
              />
            </Panel>
          </CasaBox>
        </Spinner>
      </CasaBox>
    </AnimatedContainer>
  );
};
