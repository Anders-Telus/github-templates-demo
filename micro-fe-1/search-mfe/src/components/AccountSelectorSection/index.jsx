import React from 'react'
import PropTypes from 'prop-types'
import {
  Mobility,
  Home
} from '@tds/core-decorative-icon'
import Notification from '@tds/core-notification'
import Text from '@tds/core-text'
import { NotificationWarning } from '@tds/core-feedback-icon'
import { withRouter } from 'react-router-dom';
import { useBolster } from '@mobilelive-inc/bolsterjs'
import Card from '../Card'
import {
  Wrapper,
  WrapperContent,
  LobName,
  LOBDetails,
  Divider
} from './styles'
import {
  getMobBansData, getFFHBansData, getConnectedAccountError, getContactCardSectionError
} from './helper'
import BanDetails from './BanDetails'
import Tooltip from '../Tooltip'
import { NotificationIcon } from '../BanSummary/styles'
import Loader from './Loader'
import { getCasaAppLocale } from '../../utils/locale'

const Container = ({
  mobBans,
  ffhBans,
  parentBanLOB
}) => {
  const mobData = getMobBansData(mobBans)
  const ffhData = getFFHBansData(ffhBans)
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang);
  const ffhDataKeys = Object.keys(ffhData)

  let connectedAccountErrorTemplate = null
  let mobTemplate = null
  let ffhTemplate = null
  if (getConnectedAccountError(mobBans, ffhBans)) {
    connectedAccountErrorTemplate = (
      <Notification variant='warning' copy='en'>
        <Text size='small' id='product_Error'>{locale.app.ban.connectedAccountRetrivalError}</Text>
      </Notification>
    )
  }

  if (mobBans.length > 0) {
    mobTemplate = (
      <>
        <LOBDetails>
          <Mobility size='14' variant='default' />
          <LobName>{locale.app.case.mobility}</LobName>
        </LOBDetails>

        {mobData.map(acct => (
          <BanDetails
            acct={acct}
            key={`key_${acct.billingAcctNum}`}
            locale={locale}
          />
        ))}
      </>
    )
  }

  if (ffhBans.length > 0 && (ffhBans[0].isFetchingSummary === 'undefined' || ffhBans[0].isFetchingSummary)) {
    ffhTemplate = <Loader />
  } else if (ffhBans.length > 0) {
    ffhTemplate = (
      <>
        <LOBDetails>
          <Home size='14' variant='default' />
          <LobName>{locale.app.case.homeSolutions}</LobName>
        </LOBDetails>
        {
          ffhDataKeys.map(acct => (
            <BanDetails
              acct={ffhData[acct]}
              key={`key_${acct}`}
              locale={locale}
            />
          ))
        }
      </>
    )
  }

  const contactCardSectionHeader = (
    <>
      {locale.app.accountInfo}
      {getContactCardSectionError(mobBans, ffhBans) && (
        <Tooltip text={`${locale.app.ban.fetchError}`}>
          <NotificationIcon>
            <NotificationWarning copy='en' />
          </NotificationIcon>
        </Tooltip>
      )}
    </>
  )

  return (
    <Wrapper id='accountInfo'>
      <Card
        header={contactCardSectionHeader}
        collapsable
        margin='3px 5px 5px 0'
      >
        <WrapperContent>
          {connectedAccountErrorTemplate}
          {
            parentBanLOB === 'mobility' ? mobTemplate : ffhTemplate
          }
          {ffhDataKeys.length > 0 && mobData.length > 0 ? <Divider /> : null}
          {
            parentBanLOB === 'mobility' ? ffhTemplate : mobTemplate
          }
        </WrapperContent>
      </Card>
    </Wrapper>
  )
}

Container.defaultProps = {
  mobBans: [],
  ffhBans: []
}

Container.propTypes = {
  mobBans: PropTypes.array,
  ffhBans: PropTypes.array,
  parentBanLOB: PropTypes.string.isRequired
}

export default Container
