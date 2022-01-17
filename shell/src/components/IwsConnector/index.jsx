/* eslint-disable camelcase */
import React from 'react'
import Tooltip from '../Tooltip'
import Link from '../../assets/svgs/Link'
import StatusIcon from './styles'

const IwsConnector = () => {
  const iwsData = {
    isConnected: false
  }
  return (
    <Tooltip text='IWS Not Connected'>
      <StatusIcon>
        <Link isConnected={iwsData.isConnected} />
      </StatusIcon>
    </Tooltip>
  )
}

export default IwsConnector
