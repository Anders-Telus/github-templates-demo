import React, { useEffect, useState } from 'react'
import Box from '@tds/core-box'
import { Home, Phone } from '@tds/core-decorative-icon'
import DimpleDivider from '@tds/core-dimple-divider'
import HairlineDivider from '@tds/core-hairline-divider'
import Notification from '@tds/core-notification'
import Text from '@tds/core-text'
import Heading from '@tds/core-heading'
import Spinner from '@tds/core-spinner'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { useBolster } from '@mobilelive-inc/bolsterjs'
import Card from '../Card'
import ContentTabs from '../ContentTabs'
import ExpandCollapse from '../ExpandCollapse'
import {
  AlignCenter,
  CasaBox, CasaRegularText,
  CounterBadge, NoRecordContainer
} from '../Styled'
import { OpenStatusIcon, HollowStatusIcon } from '../styles'
import AccountSummary from './AccountSummary'
import { Align, DataContainerSection, LoaderContainer } from './styles'
import { getCasaAppLocale } from '../../utils/locale'

const Container = ({
  createNewTask,
  currentCustomer,
  selectedBanHandler,
  openBansSummary,
  closedBansSummary,
  isTaskOpen,
  isNoteFormWindowOpen,
  addDetail,
  parentBanDetail,
  taskState,
  isBanSummarDetaillsNotExists,
  fetchBillingAcctSummary,
  openNoteForm,
}) => {
  const { customerId } = currentCustomer
  const { mobility: openMobility, ffh: openFfh } = openBansSummary
  const { mobility: closedMobility, ffh: closedFfh } = closedBansSummary
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang)
  const allBans = [...openFfh, ...closedFfh, ...openMobility, ...closedMobility]

  const [activeTab, setActiveTab] = useState({
    mob: openMobility.length ? 'Open' : 'Closed',
    ffh: openFfh.length ? 'Open' : 'Closed'
  })

  const [toggle, setToggle] = useState(allBans.reduce((map, account) => (
    map.set(account.billingAcctNum, account.isAuthenticated)
  ), new Map()))
  useEffect(() => {
    setActiveTab({
      mob: openMobility.length ? 'Open' : 'Closed',
      ffh: openFfh.length ? 'Open' : 'Closed'
    })
  }, [openMobility.length, openFfh.length])

  /**
   * Build and return a template for a billing account
   * @param {object} billingAcct a single billing account detail object
   * @param {string} [type] additional template description
   */
  const buildTemplate = (billingAcct, type) => {
    const {
      billingAcctNum, lineOfBusiness, isSelectedBan, brand
    } = billingAcct
    const isAuth = toggle.get(billingAcctNum)
    let template = null
    const isKoodo = !!(brand && brand.toLowerCase() === 'koodo')
    template = (
      <>
        <DataContainerSection
          isKoodo={isKoodo}

        >
          <DimpleDivider />
          <ExpandCollapse
            uniqId={`ban_${billingAcctNum}`}
            key={`ban_${lineOfBusiness}_${billingAcctNum}_${!!isSelectedBan}`}
            headerCSS={{
              marginTop: '-33px'
            }}
            iconCSS={{
              paddingTop: '15px',
              paddingLeft: '8px'
            }}
            header={(
              <AccountSummary
                isRefresh={type === 'refresh'}
                billingAcct={billingAcct}
                toggleHandler={() => setToggle(prev => new Map(prev).set(billingAcctNum, !isAuth))}
                toggle={isAuth}
                createNewTask={createNewTask}
                openNoteForm={openNoteForm}
                currentCustomer={currentCustomer}
                isAddTaskEnabled={false}
                isNoteFormEnabled={true}
                addDetail={addDetail}
                taskState={taskState}
                isBanSummarDetaillsNotExists={isBanSummarDetaillsNotExists}
                fetchBillingAcctSummary={fetchBillingAcctSummary}
              />
            )}
            expand={!!isSelectedBan}
            openSummary
            banListHandler={selectedBanHandler}
          >
            <Notification variant='warning' copy='en'>
              <Text size='small' id='product_Error'>{locale.app.product.productError}</Text>
            </Notification>
          </ExpandCollapse>
        </DataContainerSection>
      </>
    )
    return template
  }

  /**
   * Create summary, error, and spinner templates from the given billing accounts
   * @param {object[]} billingAccounts a list of billing account detail objects
   */
  const createTemplateList = billingAccounts => billingAccounts.reduce((summaries, acct) => {
    const spinner = (label = 'Loading') => {
      const template = (
        <LoaderContainer key={`loader_container_${acct.billingAcctNum}`}>
          <AlignCenter><Spinner spinning label={label} /></AlignCenter>
        </LoaderContainer>
      )
      return template
    }

    // Creating templates based on response from fetching BAN summaries
    const { isFetchingSummary } = acct
    if (isFetchingSummary) {
      summaries.push(buildTemplate(acct, 'refresh'))
    } else {
      summaries.push(buildTemplate(acct))
    }

    // Handling Connected Billing Accounts fetch response
    const { isFetchingConnected } = acct
    if (typeof isFetchingConnected === 'boolean' && isFetchingConnected) {
      summaries.push(spinner('Loading Linked Billing Accounts'))
    }

    return summaries
  }, [])

  const getTabs = (lob, openCount, closedCount, header) => ([
    {
      id: `${customerId}_${lob}`,
      tabWidth: '60%',
      isBorderBottom: false,
      label: header,
      isOnClickTabItemDisabled: true,
      template: (
        <CasaBox display='flex' flexDirection='row' alignItems='center'>
          {header === 'Mobility' ? <Phone size='20' /> : <Home size='20' />}
          <Align>{header}</Align>
        </CasaBox>)
    },
    {
      id: `${customerId}_${lob}_ban_a`,
      tabWidth: '20%',
      isBorderBottom: false,
      label: 'Open',
      template: (
        <Box inline>
          <OpenStatusIcon />
          <CasaRegularText size='16px'>
            {`${locale.app.ban.openTab}`}
            &nbsp;
            <CounterBadge>{openCount}</CounterBadge>
          </CasaRegularText>
        </Box>)
    },
    {
      id: `${customerId}_${lob}_ban_b`,
      tabWidth: '20%',
      isBorderBottom: false,
      label: 'Closed',
      template: (
        <Box inline>
          <HollowStatusIcon />
          <CasaRegularText size='16px'>
            {`${locale.app.ban.closedTab}`}
            &nbsp;
            <CounterBadge style={{ padding: '0 7px', fontSize: '12px' }}>{closedCount}</CounterBadge>
          </CasaRegularText>
        </Box>)
    }
  ])
  const { mobilityHeader, ffhHeader } = locale.app.ban
  const mobilityTabs = getTabs('mob', openMobility.length, closedMobility.length, mobilityHeader)
  const ffhTabs = getTabs('ffh', openFfh.length, closedFfh.length, ffhHeader)

  const mobSection = {
    id: `mobilityBans_${customerId}_${activeTab.mob}`,
    isVisible: [...openMobility, ...closedMobility].length,
    tab: <ContentTabs
      key={`mobilityBanTab_${customerId}`}
      tabs={mobilityTabs}
      activeTab={activeTab.mob === 'Open' ? mobilityTabs[1] : mobilityTabs[2]}
      regular
      handleTabClick={((tab) => {
        setActiveTab({ ...activeTab, mob: tab.label })
      })}
         />,
    template: createTemplateList((activeTab.mob === 'Open') ? openMobility : closedMobility),
    sectionActiveTab: activeTab.mob,
    banCount: (activeTab.mob === 'Open') ? openMobility.length : closedMobility.length
  }

  const ffhSection = {
    id: `ffhBans_${customerId}_${activeTab.ffh}`,
    isVisible: [...openFfh, ...closedFfh].length,
    tab: <ContentTabs
      key={`ffhBanTab_${customerId}`}
      tabs={ffhTabs}
      activeTab={activeTab.ffh === 'Open' ? ffhTabs[1] : ffhTabs[2]}
      regular
      handleTabClick={((tab) => {
        setActiveTab({ ...activeTab, ffh: tab.label })
      })}
         />,
    template: createTemplateList(
      (activeTab.ffh === 'Open' ? openFfh : closedFfh)
        .map(acc => ({ ...acc }))
    ),
    sectionActiveTab: activeTab.ffh,
    banCount: (activeTab.ffh === 'Open') ? openFfh.length : closedFfh.length
  }

  const displaySections = parentBanDetail.lineOfBusiness === 'ffh'
    ? [ffhSection, mobSection] : [mobSection, ffhSection]

  return (
    <>
      <Box id={`billingDetails_${customerId}`} key={`billingDetails_${customerId}`}>
        {displaySections.map((section) => {
          const {
            id, template, sectionActiveTab, banCount, isVisible, tab
          } = section
          return isVisible ? (
            <Card
              key={id}
              collapsable={false}
              margin='10px 5px 0 0'
            >
              <Box id={id}>
                <Heading level='h2' tag='h3'>
                  <Box horizontal={2} id='header-name'>
                    <div>
                      {tab}
                      <HairlineDivider />
                    </div>
                  </Box>
                </Heading>
                {banCount ? template : (
                  <NoRecordContainer ma='25'>
                    {(sectionActiveTab === 'Open') ? locale.app.ban.noOpenBanExists
                      : locale.app.ban.noClosedBanExists}
                  </NoRecordContainer>
                )}
              </Box>
            </Card>
          ) : ''
        })}
      </Box>
    </>
  )
}

Container.defaultProps = {
  isBanSummarDetaillsNotExists: false
}

Container.propTypes = {
  closedBansSummary: PropTypes.object.isRequired,
  openBansSummary: PropTypes.object.isRequired,
  currentCustomer: PropTypes.object.isRequired,
  selectedBanHandler: PropTypes.func.isRequired,
  createNewTask: PropTypes.func.isRequired,
  openNoteForm: PropTypes.func.isRequired,
  sendSelectedCategory: PropTypes.func.isRequired,
  sendNotesText: PropTypes.func.isRequired,
  mobSharedDataUsage: PropTypes.object.isRequired,
  isTaskOpen: PropTypes.bool.isRequired,
  isNoteFormWindowOpen: PropTypes.bool.isRequired,
  addDetail: PropTypes.func.isRequired,
  parentBanDetail: PropTypes.object.isRequired,
  taskState: PropTypes.object.isRequired,
  isBanSummarDetaillsNotExists: PropTypes.bool,
  fetchBillingAcctSummary: PropTypes.func.isRequired
}

export default Container
