import React from 'react'
import Text from '@tds/core-text'
import PropTypes from 'prop-types'
import HairlineDivider from '@tds/core-hairline-divider'
import { withRouter } from 'react-router-dom';
import {
  BanList,
  Modal,
  MenuLink
} from './styles'
import { CasaBox } from '../Styled'
import { getCasaAppLocale } from '../../../utils/locale';

const HamburgerMenu = ({ isHamburgerMenuOpen }) => {
  const locale = getCasaAppLocale('en');
  const mobilityBans = [
    {
      billingAcctNum: 1
    },
    {
      billingAcctNum: 2
    }
  ]
  const smartDesktopLinks = mobilityBans.map((ban) => {
    return (
      <BanList key={`onePortal${ban.billingAcctNum}`}>
        <MenuLink id={`onePortal${ban.billingAcctNum}`} type='button' onClick={() => {}}>
          <Text size='small' bold>{`Mobility BAN ${ban.billingAcctNum}`}</Text>
        </MenuLink>
      </BanList>
    )
  })

  const smartDesktopMenu = (
    <>
      <CasaBox pl={4}>
        <Text size='small'>{locale.app.smartDesktop}</Text>
      </CasaBox>
      {smartDesktopLinks}
    </>
  )

  const notificationsMenu = (
    <>
      <CasaBox pl={4}>
        <Text size='small'>
          Notifications
        </Text>
      </CasaBox>
      <BanList>
        <MenuLink>
          <Text size='small' bold>
            Notification 1
          </Text>
        </MenuLink>
      </BanList>
    </>
  )

  return (
    <Modal id='hamburgerMenu' isHamburgerMenuOpen={isHamburgerMenuOpen}>
      {smartDesktopMenu}
      {
        smartDesktopMenu ? <HairlineDivider /> : null
      }
      {notificationsMenu}
    </Modal>
  )
}

HamburgerMenu.propTypes = {
  isHamburgerMenuOpen: PropTypes.bool
}
export default HamburgerMenu
