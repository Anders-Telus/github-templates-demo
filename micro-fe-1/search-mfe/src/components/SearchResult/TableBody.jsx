import React from 'react'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'
import { Mobility, Home } from '@tds/core-decorative-icon'
import {
  TableRow, TableColumn, CenterAligned, OpenStatusIcon, HollowStatusIcon
} from './styles'

const brands = {
  telus: 'telus',
  koodo: 'koodo'
}

const billingAccountTypes = {
  telus: {
    BO: 'Business - Official',
    CQ: 'Corporate - PCS Enterprise',
    CX: 'Corporate - PCS Corporate',
    ER: 'Excp - Ctrl Regular',
    EC: 'Excp - Ctrl CNBS',
    BP: 'Business - Personal',
    RI: 'TELUS Home - Consumer',
    BF: 'Business Connect Regular',
    CZ: 'Corporate - Reseller',
    BA: 'Business Anywhere Regular',
    CF: 'Corporate - DO NOT USE',
    CG: 'Corporate - PCS Government',
    CI: 'Corporate - PCS Individual',
    IR: 'TELUS Mobility - Consumer',
    CH: 'Corporate - Fusion East Conv',
    IF: 'Consumer - TELUS Employee (PCS)',
    BN: 'Business Anywhere Personal',
    CN: 'Corporate - PCS National Strategic',
    CU: 'Corporate - PCS TMI Affiliate',
    IB: 'Consumer - WPP Prepaid Migrated',
    IE: 'Consumer - TELUS Employee',
    BB: 'Business - Dealer',
    CA: 'Corporate - Aboriginal',
    CL: 'Corporate - PCS Regional Strategic',
    IZ: 'Consumer - store (n)',
    CY: 'Corporate - Business Anywhere',
    EO: 'Excp - Ctrl 1SS',
    BG: 'Business Connect Personal',
    BX: 'Business - Regular Medium',
    BR: 'Business - Regular',
    CB: 'Corporate - PCS Federal Government',
    CE: 'Corporate - Employee',
    CK: 'Corporate - Key',
    CO: 'Corporate - Official',
    CV: 'Corporate - PCS TMI Division',
    IQ: 'Mobility - Prepaid'
  },
  koodo: {
    IR: 'Koodo - Consumer'
  }
}

export const formatPostalCode = (address) => {
  const postalCodeRegex = /([A-Za-z]\d[A-Za-z])(\d[A-Za-z]\d)/
  if (address) {
    return address.replace(postalCodeRegex, '$1 $2')
  }
  return address
}

export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = (`${phoneNumber}`).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  phoneNumber.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/)
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`
  }
  return phoneNumber
}

export const getBillingAccountType = (billingTypeSubtype, brand) => {
  const billingTypeType = (billingTypeSubtype.type + billingTypeSubtype.subtype)
  return (brand === brands.telus ? billingAccountTypes.telus[billingTypeType]
    : billingAccountTypes.koodo[billingTypeType])
}

//  eslint-disable-next-line react/display-name
const TableBody = React.forwardRef((props, ref) => {
  const {
    searchResults,
    togglePanel,
    customerBAN,
    isHistory
  } = props
  if (searchResults == null) return null
  return searchResults.map((data, index) => {
    const {
      billingAcctNum,
      billingAccountName,
      billingAcctType,
      transBillingAcctStatus,
      contactNum,
      lineOfBusiness,
      billingAddress,
      caseMgmt,
      latestActiveBanInd,
      billingTypeSubtype,
      brand
    } = data

    let caseMgmtTemplate = null
    if (caseMgmt && caseMgmt.isError) {
      caseMgmtTemplate = 'Error Notification'
    } else if (caseMgmt && (caseMgmt.hasOpenCase || caseMgmt.hasOpenTask)) {
      caseMgmtTemplate = 'Yes'
    } else if (caseMgmt && !(caseMgmt.hasOpenCase || caseMgmt.hasOpenTask)) {
      caseMgmtTemplate = 'No'
    } else {
      caseMgmtTemplate = ''
    }
    const uniqueKey = `${billingAcctNum}_${index}`
    return (
      <TableRow
        id={`row_${uniqueKey}`}
        onClick={() => togglePanel(data)}
        selected={data.billingAcctNum === customerBAN}
        hover='#F4F4FF' fonts='0.9em'
        paddingt='0.5em'
        fweight='400'
        paddingb='0.3em'
        key={`row_${uniqueKey}`}
        ref={ref}
      >
        <TableColumn width='70px' flex={2} flexLg={2} center key={`${billingAcctNum}_lob`} id={`value_${lineOfBusiness}`}>
          <CenterAligned>
            {lineOfBusiness === 'mobility' ? <Mobility /> : <Home />}
          </CenterAligned>
        </TableColumn>
        <TableColumn width='149px' flex={8} key={`${billingAcctNum}_${billingAccountName}`} id={`value_${billingAccountName}`}>
          {billingAccountName}
        </TableColumn>
        <TableColumn width='149px' flex={8} key={`${billingAcctNum}_type`} id={`value_${billingAcctType}`}>
          {billingTypeSubtype && getBillingAccountType(billingTypeSubtype, brand)}
        </TableColumn>
        <TableColumn width='98px' flex={5} key={`${billingAcctNum}_ban`} id={`value_${billingAcctNum}`}>
          <Box>
            {transBillingAcctStatus === 'Open' ? <OpenStatusIcon /> : <HollowStatusIcon />}
            {billingAcctNum}
          </Box>
        </TableColumn>

        {
          contactNum !== 'hidden' ? (
            <>
              <TableColumn width='113px' flex={6} key={`${billingAccountName}_contactNo`} id={`value_${contactNum}`}>
                {('latestActiveBanInd' in data) ? (
                  <Box>
                    {latestActiveBanInd === 'true' ? <OpenStatusIcon /> : <HollowStatusIcon />}
                    {formatPhoneNumber(contactNum)}
                  </Box>
                ) : formatPhoneNumber(contactNum)}
              </TableColumn>
              <TableColumn width='226px' flex={12} key={`${billingAcctNum}_address`} id={`value_${billingAddress}`}>
                {formatPostalCode(billingAddress)}
              </TableColumn>
            </>
          ) : (
            <>
              <TableColumn width='226px' flex={12} key={`${billingAcctNum}_address`} id={`value_${billingAddress}`}>
                {formatPostalCode(billingAddress)}
              </TableColumn>
              <TableColumn width='113px' flex={6} key={`${billingAccountName}_contactNo`} id={`value_${contactNum}`} />
            </>
          )
        }
        {isHistory && (
          <TableColumn width='38px' flex={6} key={`${billingAcctNum}_case_mgmt`}>
            {caseMgmtTemplate}
          </TableColumn>
        )}
      </TableRow>

    )
  })
})

TableBody.defaultProps = {
  customerBAN: '',
  isHistory: false
}

TableBody.propTypes = {
  searchResults: PropTypes.array.isRequired,
  togglePanel: PropTypes.func.isRequired,
  customerBAN: PropTypes.string,
  isHistory: PropTypes.bool
}

export default TableBody
