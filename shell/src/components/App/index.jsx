import React, { Suspense, useState, useEffect } from 'react'
import { Switch, Route, withRouter} from 'react-router-dom'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'
import CSSReset from '@tds/core-css-reset'
import bolster from '@mobilelive-inc/bolsterjs'
import { useAuth0 } from '@auth0/auth0-react'
import Spinner from '@tds/core-spinner'
import { useSelector, useDispatch } from 'react-redux'
import moment, { locale } from 'moment'
import Header from '../Header'
import Tabs from '../Tabs'
import { auth0RolesNamespace } from '../../shared/constants'
import { setCustomerState } from '../../reducers/searchSlice';

// Example of importing an experience to the container
const SearchExperience = bolster(import('searchexperience/experience'))
const CreateNoteExperience = bolster(import('createnoteexperience/experience'))
// Required to avoid css collisions
const generateClassName = createGenerateClassName({
  productionPrefix: 'mfxp-mve-co'
})

const ContainerComp = () => {
  const customerState = useSelector((state) => state.search.customerState)
  const dispatch = useDispatch()
  const [activeSearchTab, setActiveSearchTab] = useState(0)
  const { loginWithRedirect, isAuthenticated, isLoading: isAuthLoading, error, getIdTokenClaims } = useAuth0()
  const [searchResults, setSearchResults] = useState(null)
  const [address, setAddress] = useState('')
  const [searchResultTabs, setOpenSearchResultTabs] = useState([])
  const [activeSearchResult, setActiveSearchResult] = useState(null)
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState([])
  
  useEffect(() => {
    moment.locale('en')
  }, [])


  
  const openSearchResultTab = (result) => {
    console.log('open search result', result)
    setOpenSearchResultTabs([...searchResultTabs, result])
    setActiveSearchResult(searchResultTabs[searchResultTabs.length])
  }

  return (
    <>
   
      <CSSReset />
        <StylesProvider generateClassName={generateClassName}>
          {activeSearchResult ? <Spinner label='Loading' spinning={isAuthLoading || loading}>
              <div
                style={{ width: '100%', height: `${window.innerHeight}px` }}
              />
            </Spinner> :(
            <>
              {true && (
                <div>
                  <Header />
                  <Tabs
                    searchResultTabs={searchResultTabs}
                    setOpenSearchResultTabs={setOpenSearchResultTabs}
                    setActiveSearchResult={setActiveSearchResult}
                  />
                  <Suspense fallback='loading...'>
                    <Switch>
                      {/* Add microfrontends here */}
           
                        <SearchExperience
                          activeSearchTab={activeSearchTab}
                          setActiveSearchTab={setActiveSearchTab}
                          searchResults={searchResults}
                          setSearchResults={(data) => setSearchResults(data)}
                          address={address}
                          setAddress={setAddress}
                          customerState={customerState}
                          setCustomerState={(newState) => dispatch(setCustomerState(newState))}
                          openSearchResultTab={openSearchResultTab}
                          openTaskModal={() => {
                            setIsTaskOpen({
                              isOpen: true,
                              key: Math.random()
                            })
                          }}
                          requiresAuth ={false}
                          isAuthenticated={true}
                          searchResult={activeSearchResult}
                           roles={roles}
                        />
                 
                    </Switch>
                  </Suspense>
                  <Suspense fallback='loading...'>
                    <CreateNoteExperience key={isTaskOpen.key} isOpen={isTaskOpen.isOpen} setIsOpen={(val) => setIsTaskOpen(val)}/>
                  </Suspense>
                </div>
              )}
            </>
          )}
        </StylesProvider>
    </>
  )
}

export default ContainerComp;