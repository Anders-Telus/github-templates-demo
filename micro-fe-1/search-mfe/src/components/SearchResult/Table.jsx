import React from 'react'
import PropTypes from 'prop-types'
import Heading from '@tds/core-heading'
import { withRouter } from 'react-router-dom' 
import { useBolster } from '@mobilelive-inc/bolsterjs'
import TableBody from './TableBody'
import {
  TableWrapper,
  TableHeader,
  TableColumn,
  StickyHeader
} from './styles'
import { getCasaAppLocale } from '../../utils/locale'

const SearchResult = React.forwardRef((props, ref) => {
  const {
    searchResults,
    togglePanel,
    customerBAN,
    isHistory
  } = props

  if (searchResults == null) {
    return null
  }
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang);
  const isBan = searchResults.filter(el => el.contactNum.includes('hidden'))
  const getTableHeader = () => {
    if (isHistory) {
      return `History results (${searchResults.length})`
    }
    if (searchResults.length >= 0) {
      return `${searchResults.length} ${locale.app.searchResults}`
    }
  }

  return (
    <>
      <TableWrapper>
        <StickyHeader>
          <Heading level='h3'>
            {getTableHeader()}
          </Heading>
          <TableHeader>
            <TableColumn width='70px' flex={2} flexLg={2} />
            <TableColumn width='149px' flex={8}>
              {locale.app.keywords.customerName}
            </TableColumn>
            <TableColumn width='149px' flex={8}>
              {locale.app.keywords.accountType}
            </TableColumn>
            <TableColumn width='98px' flex={5}>
              BAN
            </TableColumn>
            {
              isBan.length === 0 ? (
                <>
                  <TableColumn width='113px' flex={6}>
                    {locale.app.keywords.telephone}
                  </TableColumn>
                  <TableColumn width='226px' flex={12}>
                    {locale.app.keywords.billingAddress}
                  </TableColumn>
                </>
              ) : (
                <>
                  <TableColumn width='226px' flex={12}>
                    {locale.app.keywords.billingAddress}
                  </TableColumn>
                  <TableColumn width='113px' flex={6} />
                </>
              )
            }
            {isHistory && (
              <TableColumn width='38px' flex={6}>
                Case/Task
              </TableColumn>
            )}
          </TableHeader>
        </StickyHeader>
        <TableBody
          searchResults={searchResults}
          togglePanel={togglePanel}
          customerBAN={customerBAN}
          ref={ref}
          isHistory={isHistory}
        />
      </TableWrapper>
    </>
  )
})

SearchResult.defaultProps = {
  customerBAN: '',
  isHistory: false
}

SearchResult.propTypes = {
  searchResults: PropTypes.array,
  togglePanel: PropTypes.func.isRequired,
  customerBAN: PropTypes.string,
  isHistory: PropTypes.bool
}

SearchResult.displayName = 'SearchResult'

export default SearchResult
