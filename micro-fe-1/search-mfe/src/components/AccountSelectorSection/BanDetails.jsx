import React from 'react'
import PropTypes from 'prop-types'
import {
  PhoneHome, Email
} from '@tds/core-decorative-icon'

import ExpandCollapse from '../../components/ExpandCollapse'
import { GraySkeleton } from '../../components/Styled'
import Tooltip from '../Tooltip'
import {
  CommDetails,
  SubHead,
  AuthDetails,
  BanHeader,
  BanNumber,
  PinContainer,
  FFHBanNumber,
  CID as CiD,
  AuthSection,
  SubSectionContainer,
  AuthEllipsisDetails
} from './styles'
import { OpenStatusIcon, HollowStatusIcon } from '../styles'
import { getTooltipText } from './helper'
import ClickToCopy from '../ClickToCopy'

const { BAN_SUMMARY_PIN_ERROR, PREFERRED_DETAILS_API_ERROR } = { BAN_SUMMARY_PIN_ERROR: 'BAN_SUMMARY_PIN_ERROR', PREFERRED_DETAILS_API_ERROR: 'PREFERRED_DETAILS_API_ERROR' }

const BanDetails = ({
  acct, locale
}) => {
  const koodoBan = acct.brand === 'koodo' ? `${locale.app.ban.bankdo} ${acct.billingAcctNum}` : `${locale.app.ban.ban} ${acct.billingAcctNum}`
  const headerVal = acct.lineOfBusiness === 'mobility'
    ? koodoBan
    : (
      <ClickToCopy text={acct.customerId} displayBlock>
        <CiD>
          {locale.app.ban.cid}
          {' '}
          {acct.customerId}
        </CiD>
      </ClickToCopy>
      )

  const banStatus = acct.transBillingAcctStatus === 'Open' ? <OpenStatusIcon margin='-3px 0 0 5px' /> : <HollowStatusIcon margin='-3px 0 0 5px' />

  let pinTemplate = (<span>{acct.pin || '-'}</span>)
  let authTemplate = (acct.authorizedUsers.length > 0 ? acct.authorizedUsers
    : locale.app.none)
  let languageTemplate = (acct.preferredLanguage || locale.app.none)
  let emailTemplate = (acct.email || '-')
  if (acct.isErrorSummary) {
    if (acct.errors === undefined) {
      pinTemplate = (<GraySkeleton id='pin-error' characters={3} />)
      authTemplate = (<GraySkeleton characters={4} />)
      languageTemplate = (<GraySkeleton characters={4} />)
      emailTemplate = (<GraySkeleton characters={8} />)
    }
    if (acct.errors && acct.errors.includes(BAN_SUMMARY_PIN_ERROR)) {
      pinTemplate = (<GraySkeleton id='pin-error' characters={3} />)
    }
    if (acct.errors && acct.errors.includes(PREFERRED_DETAILS_API_ERROR)) {
      authTemplate = (<GraySkeleton characters={4} />)
      languageTemplate = (<GraySkeleton characters={4} />)
      emailTemplate = (<GraySkeleton characters={8} />)
    }
  }

  const getCBRNumber = (contactNo) => {
    const cbrNumber = Object.values(contactNo)[0]
    let cbrTemplate = (cbrNumber ? `${cbrNumber.slice(0, 3)}-${cbrNumber.slice(3, 6)}-${cbrNumber.slice(6, 11)}` : '-')
    if (acct.isErrorSummary) {
      if (acct.errors === undefined || acct.errors.includes(PREFERRED_DETAILS_API_ERROR)) {
        cbrTemplate = (<GraySkeleton characters={4} />)
      }
    }
    return cbrTemplate
  }

  return (
    <ExpandCollapse
      expand={acct.isParent === true}
      insideCard
      header={(
        <BanHeader>
          <BanNumber id='ban-number'>
            {headerVal}
          </BanNumber>
          {acct.lineOfBusiness === 'mobility' && banStatus}
          <PinContainer onClick={event => event.stopPropagation()}>
            <span>
              {locale.app.ban.pin}
              {' '}
            </span>
            {pinTemplate}
          </PinContainer>
        </BanHeader>
      )}
      headerCSS={{
        background: '#FFF',
        padding: '2px',
        marginTop: '0px'
      }}
      iconCSS={{
        margin: '2px 0 0 -2px'
      }}
    >
      <CommDetails>
        {
          acct.bans && (
            <div>
              {acct.bans.map(ffhBan => (
                <React.Fragment key={`ffhInfo_${ffhBan.billingAcctNum}`}>
                  <BanHeader>
                    <FFHBanNumber>
                      {locale.app.ban.ban}
                      {' '}
                      {ffhBan.billingAcctNum}
                    </FFHBanNumber>
                    {ffhBan && ffhBan.transBillingAcctStatus === 'Open' ? <OpenStatusIcon margin='-3px 0 0 5px' /> : <HollowStatusIcon margin='-3px 0 0 5px' />}
                  </BanHeader>
                </React.Fragment>
              ))}
            </div>
          )
        }
        <AuthSection>
          <SubSectionContainer>
            <SubHead>{locale.app.ban.auth}</SubHead>
            <AuthDetails>
              {authTemplate}
            </AuthDetails>
          </SubSectionContainer>
          <SubSectionContainer>
            <SubHead>{locale.app.ban.language}</SubHead>
            <AuthDetails>{languageTemplate}</AuthDetails>
          </SubSectionContainer>
          <SubSectionContainer>
            <SubHead><Email size='14' variant='default' /></SubHead>
            <ClickToCopy text={emailTemplate} displayBlock={false}>
              <AuthEllipsisDetails>{emailTemplate}</AuthEllipsisDetails>
            </ClickToCopy>
          </SubSectionContainer>
          {
        acct.cbr.map((contactNo) => {
          const phoneTitle = Object.keys(contactNo)[0]
          return (
            <SubSectionContainer key={phoneTitle}>
              <SubHead><PhoneHome size='14' variant='default' /></SubHead>
              <AuthDetails>
                <Tooltip
                  variant='horizontal'
                  text={getTooltipText(phoneTitle, locale)}
                >
                  {getCBRNumber(contactNo)}
                </Tooltip>
              </AuthDetails>
            </SubSectionContainer>
          )
        })
          }
        </AuthSection>
      </CommDetails>
    </ExpandCollapse>
  )
}

BanDetails.defaultProps = {
  acct: { cbr: [] }
}

BanDetails.propTypes = {
  acct: PropTypes.object,
  locale: PropTypes.object.isRequired
}

export default BanDetails
