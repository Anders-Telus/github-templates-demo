import React, { useEffect, useState } from 'react'
import { Container, TabItem, TabName, CloseIcon, Icon } from './styles'
import Hamburger from '../../assets/svgs/Hamburger'
import HamburgerMenu from './HamburgerMenu/menu'
import { getCasaAppLocale } from '../../utils/locale'
import { useBolster } from '@mobilelive-inc/bolsterjs'

export default ({
  searchResultTabs,
  setActiveSearchResult,
  setOpenSearchResultTabs,
  history
}) => {
  const [activeTab, setActiveTab] = useState(2)
  const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState(false)
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang);
  
  useEffect(() => {
    if (searchResultTabs.length) {
      setActiveSearchResult(searchResultTabs[searchResultTabs.length - 1])
      setActiveTab(2 + searchResultTabs.length)
      // history.push(`/${lang}/${prov}/search/result`)
    } else {
      // history.push(`/${lang}/${prov}/search`)
    }
  }, [searchResultTabs])

  return (
    <Container>
      <Hamburger
        id='imgHandler'
        alt='Hamburger'
        onClick={() => setHamburgerMenuOpen(!isHamburgerMenuOpen)}
      />
      <HamburgerMenu isHamburgerMenuOpen={isHamburgerMenuOpen} />
      <TabItem
        type='button'
        id='tabs'
        onClick={() => {
          setActiveSearchResult(null)
          setActiveTab(1)
          // history.push(`/${lang}/${prov}/`)
        }}
        isSelected={activeTab === 1}
      >
        <TabName>{locale.app.dashboard}</TabName>
      </TabItem>
      <TabItem
        type='button'
        id='tabs'
        onClick={() => {
          setActiveSearchResult(null)
          setActiveTab(2)
          // history.push(`/${lang}/${prov}/search`)
        }}
        isSelected={activeTab === 2}
      >
        <TabName>{locale.app.search}</TabName>
      </TabItem>
      {searchResultTabs.map((tab, index) => (
        <TabItem
          key={tab.customerId}
          type='button'
          id='tabs'
          onClick={() => {
            setActiveSearchResult(tab)
            setActiveTab(3 + index)
            // history.push(`/${lang}/${prov}/search/result`)
          }}
          isSelected={activeTab === 3 + index}
        >
          <TabName style={{ textTransform: 'uppercase' }}>{tab.billingAccountName}</TabName>
          <CloseIcon
            onClick={() => {
              searchResultTabs.splice(index, 1)
              setOpenSearchResultTabs([...searchResultTabs])
            }}
          >
            <Icon symbol='times' />
          </CloseIcon>
        </TabItem>
      ))}
    </Container>
  )
}
