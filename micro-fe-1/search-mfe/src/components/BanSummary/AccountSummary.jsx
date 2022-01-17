import React, { useEffect } from 'react'
import Text from '@tds/core-text'
import FlexGrid from '@tds/core-flex-grid'
import Box from '@tds/core-box'
import PropTypes from 'prop-types'
import { NotificationWarning } from '@tds/core-feedback-icon'
import { withRouter } from 'react-router-dom';
import { useBolster } from '@mobilelive-inc/bolsterjs';
import Koodo from '../../assets/svgs/Koodo'
import { CasaRegularText, PositionedDiv, CasaBox } from '../Styled'
import {
  BanStatus,
  BanSection,
  NotificationIcon,
  NoteIconContainer,
  AccountSummaryGrid,
  KoodoContainer,
  AcDateBanStatus,
  Wrapper
} from './styles'
import ToggleButton from '../ToggleButton'
import Tooltip from '../Tooltip'
import {
  checkAcctType,
  getBillingAccountType,
  getCurrentLanguage,
  prepareDetailPopupObj
} from '../../shared/utils/helpers'
import { getCasaAppLocale } from '../../utils/locale'
import {
  getMobBanStatusTooltip,
  getFFHBanStatusTooltip
} from './helpers'
import ClickToCopy from '../ClickToCopy'
import LasBillAmount from './LasBillAmount'
import CurrentBalance from './CurrentBalance'
import NextCharge from './NextCharge'
import BillingAddress from './BillingAddress'
import DueDate from './DueDate'
import BillCycle from './BillCycle'
import AirTime from './AirTime'
import PapDetails from './PapDetails'
import ExpiryDate from './ExpiryDate'
import Ebill from './Ebill'
import ActivationDate from './ActivationDate'
import CreditValue from './CreditValue'
import AddTasks from './AddTasks'
import CreateNotes from './CreateNotes'

const AccountSummary = ({
  isRefresh,
  billingAcct,
  toggleHandler,
  toggle,
  currentCustomer,
  isAddTaskEnabled,
  createNewTask,
  openNoteForm,
  taskState,
  addDetail,
  fetchBillingAcctSummary,
  isNoteFormEnabled,
}) => {
  const {
    lineOfBusiness,
    treatmentIndicator,
    isErrorLastBill,
    pap,
    currentBalance,
    dueDate,
    billCycle,
    billMedium,
    lastBillAmt,
    transBillingAcctStatus,
    billingAcctStatus,
    billingAcctStatusDate,
    billingAcctNum,
    billingAddress,
    billingAcctType,
    brand,
    isErrorSummary,
    nextCharge,
    nextChargeDate,
    expiryDate,
    airtimeRate,
    billingAcctCreationDate,
    billingTypeSubtype,
    timezone,
    creditCardInfo,
    uuid,
    creditInfo
  } = billingAcct

  useEffect(() => {
    fetchBillingAcctSummary(billingAcct)
  }, [])
  const { openModal } = useBolster();
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang)
  const isStatusExcluded = billingAcctStatus === 'Open' || billingAcctStatus === 'Closed'
  const isPrepaid = checkAcctType(billingAcctType, 'prepaid')
  const marginLastBill = '12px'
  const marginNextCharge = getCurrentLanguage() === 'en' ? '0' : '-30px'
  let marginDueDate = '0px'
  if (isPrepaid) {
    marginDueDate = getCurrentLanguage() === 'en' ? '-16px' : '0px'
  }

  const showAddText = () => {
    openTaskModal()
  }

  const openNewNotePopUp = () => {
    const id = `create_note_form_${tabUniqId}`
    const dragPosition = { x: '1%', y: '49%' }
    // save data in pop up reducer
    addDetail(prepareDetailPopupObj({
      tabUniqId,
      id,
      dragPosition,
      type: 'CreateNote'
    }))
    // save data in notes reducer
    openNoteForm({ tabUniqId })
  }
  return (
    <PositionedDiv position='relative'>
      <FlexGrid>
        <FlexGrid.Row verticalAlign='middle'>
          <FlexGrid.Col lg={7} md={7}>
            <BanSection id={`banDetail_${billingAcctNum}`}>
              <Text size='large' bold>
                {locale.app.ban.ban}
              </Text>
              <ClickToCopy text={billingAcctNum}>
                <Text size='large' bold>
                  {`: ${billingAcctNum}`}
                </Text>
              </ClickToCopy>
              {transBillingAcctStatus === 'Open' && isErrorSummary && (
                <NoteIconContainer>
                  <Tooltip text={`${locale.app.ban.fetchError}`}>
                    <NotificationIcon>
                      <NotificationWarning copy='en' />
                    </NotificationIcon>
                  </Tooltip>
                </NoteIconContainer>
              )}
            </BanSection>
          </FlexGrid.Col>
          <FlexGrid.Col lg={5} md={5}>
          <Box inline between={1} style={{ display: 'block', paddingRight: '8px' }}>
              <Wrapper id='show_add_text' onClick={() => openModal('note')}>
                  <CreateNotes isEnabled={isNoteFormEnabled} />
              </Wrapper>
                <Wrapper id='show_add_text' onClick={() => openModal('task')}>
                  <AddTasks isEnabled={isAddTaskEnabled} />
                </Wrapper>
            </Box>
            <Box inline vertical={2} between={2}>
              <ToggleButton
                uniqueKey={billingAcctNum}
                isAuthenticated={toggle}
                clickHandler={toggleHandler}
              />
              <Box>
                <Text size='small' block id='banDetail_authenticatedornot'>
                  {toggle
                    ? locale.app.ban.authenticated
                    : locale.app.ban.notAuthenticated}
                </Text>
              </Box>
            </Box>
          </FlexGrid.Col>
        </FlexGrid.Row>
        <AcDateBanStatus>
          <FlexGrid.Row>
            <FlexGrid.Row>
              <ActivationDate
                lineOfBusiness={lineOfBusiness}
                billingAcctCreationDate={billingAcctCreationDate}
                billingAcctStatusDate={billingAcctStatusDate}
                transBillingAcctStatus={transBillingAcctStatus}
                isRefresh={isRefresh}
              />
            </FlexGrid.Row>
            <FlexGrid.Row>
              <div style={{ display: 'inline-flex', marginTop: '-5px' }}>
                <CreditValue
                  creditInfo={creditInfo}
                  lineOfBusiness={lineOfBusiness}
                  isRefresh={isRefresh}
                />
                <div style={{ marginLeft: '10px', display: 'inline-flex', marginTop: '7px' }}>
                  <Text
                    block
                    size='small'
                    style={{ color: '#4B286D' }}
                    id={`banDetail_${billingAcctType}`}
                  >
                    {billingTypeSubtype && getBillingAccountType(billingTypeSubtype, brand)}
                  </Text>
                  {billingAcctStatus && !isStatusExcluded ? (
                    <Tooltip
                      text={
                        lineOfBusiness === 'mobility'
                          ? getMobBanStatusTooltip(billingAcctStatus, locale)
                          : getFFHBanStatusTooltip(billingAcctStatus, locale)
                      }
                    >
                      <BanStatus
                        type={billingAcctStatus.toLowerCase()}
                        id={`banDetail_${billingAcctStatus}`}
                      >
                        {locale.app.ban.banStatus[billingAcctStatus.toLowerCase()]}
                      </BanStatus>
                    </Tooltip>
                  ) : (
                    ''
                  )}
                  {treatmentIndicator && treatmentIndicator === true ? (
                    <Tooltip
                      text={
                        lineOfBusiness === 'mobility'
                          ? getMobBanStatusTooltip('Delinquent', locale)
                          : getFFHBanStatusTooltip('In Treatment', locale)
                      }
                    >
                      <BanStatus
                        type='treatmentIndicator'
                        id='banDetail_treatmentIndicator'
                      >
                        {lineOfBusiness === 'mobility'
                          ? locale.app.ban.banStatus.delinquent
                          : locale.app.ban.banStatus.inTreatment}
                      </BanStatus>
                    </Tooltip>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </FlexGrid.Row>
            <FlexGrid.Col lg={4} md={4}>
              {billingAcctType && billingAcctType.toLowerCase() === 'koodo - consumer' ? (
                <KoodoContainer>
                  <Koodo />
                </KoodoContainer>
              ) : ''}
            </FlexGrid.Col>
          </FlexGrid.Row>
        </AcDateBanStatus>
        <FlexGrid.Row>
          <Box vertical={3}>
            <BillingAddress
              isRefresh={isRefresh}
              billingAddress={billingAddress}
              locale={locale}
              lineOfBusiness={lineOfBusiness}
            />
          </Box>
        </FlexGrid.Row>
        {/* Show account summary details grid format */}
        <AccountSummaryGrid mb={marginDueDate}>
          {isPrepaid ? (
            <FlexGrid.Row>
              <FlexGrid.Col lg={4} md={4}>
                <AirTime isRefresh={isRefresh} airtimeRate={airtimeRate} locale={locale} />
              </FlexGrid.Col>
              <FlexGrid.Col lg={4} md={4}>
                <Box style={{ display: 'block', marginLeft: marginNextCharge }}>
                  <NextCharge
                    nextCharge={nextCharge}
                    nextChargeDate={nextChargeDate}
                    isRefresh={isRefresh}
                    locale={locale}
                  />

                  <Box inline between={1}>
                    {!isPrepaid ? (<DueDate locale={locale} isRefresh={isRefresh} dueDate={dueDate} />) : ''}
                  </Box>
                </Box>
              </FlexGrid.Col>
              <FlexGrid.Col lg={4} md={4}>
                <Box inline between={1}>
                  <CurrentBalance
                    currentBalance={currentBalance}
                    isRefresh={isRefresh}
                    locale={locale}
                  />
                </Box>
                <ExpiryDate isRefresh={isRefresh} expiryDate={expiryDate} locale={locale} />
              </FlexGrid.Col>
            </FlexGrid.Row>
          ) : (
            <FlexGrid.Row>
              <FlexGrid.Col lg={2} md={2}>
                <Box style={{ display: 'inline' }}>
                  <PapDetails
                    pap={pap}
                    isRefresh={isRefresh}
                    locale={locale}
                    creditCardInfo={creditCardInfo}
                  />
                </Box>
              </FlexGrid.Col>
              <FlexGrid.Col lg={3} md={3}>
                <Box inline between={1}>
                  <Ebill isRefresh={isRefresh} billMedium={billMedium} locale={locale} />
                </Box>
              </FlexGrid.Col>
              <FlexGrid.Col lg={1} md={1}>
                <Box inline between={1}>
                  <div>
                    <BillCycle
                      locale={locale}
                      lineOfBusiness={lineOfBusiness}
                      isRefresh={isRefresh}
                      billCycle={billCycle}
                    />
                  </div>
                </Box>
              </FlexGrid.Col>
              <FlexGrid.Col lg={3} md={3} sm={6}>
                <Box inline between={1} style={{ display: 'block', marginLeft: marginLastBill }}>
                  <div>
                    <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
                      {locale.app.ban.lastBillAmount}
                    </CasaRegularText>
                  </div>
                  <LasBillAmount
                    billingAmount={lastBillAmt}
                    uuid={uuid}
                    currentCustomer={currentCustomer}
                    isErrorLastBill={isErrorLastBill}
                    errorMsg={locale.app.ban.lastBillAmountError}
                    isRefresh={isRefresh}
                    lineOfBusiness={lineOfBusiness}
                    billingAcctNum={billingAcctNum}
                  />
                  <CasaBox display='flex' flexDirection='row' width='148px'>
                    <DueDate locale={locale} isRefresh={isRefresh} dueDate={dueDate} />
                  </CasaBox>
                </Box>
              </FlexGrid.Col>
              <FlexGrid.Col lg={3} md={3} sm={6}>
                <Box inline between={1}>
                  <CurrentBalance
                    currentBalance={currentBalance}
                    isRefresh={isRefresh}
                    locale={locale}
                  />
                </Box>
              </FlexGrid.Col>
            </FlexGrid.Row>
          )}
        </AccountSummaryGrid>
        {/* <FlexGrid.Row>
            <FlexGrid.Col lg={7} md={7}>
              {!isPrepaid && <Box>{banStatusDate}</Box>}
            </FlexGrid.Col>
          </FlexGrid.Row> */}
      </FlexGrid>
    </PositionedDiv>
  )
}

AccountSummary.defaultProps = {
  toggle: false,
  isRefresh: false
}

AccountSummary.propTypes = {
  billingAcct: PropTypes.object.isRequired,
  toggleHandler: PropTypes.func.isRequired,
  toggle: PropTypes.bool,
  createNewTask: PropTypes.func.isRequired,
  openNoteForm: PropTypes.func.isRequired,
  currentCustomer: PropTypes.object.isRequired,
  isRefresh: PropTypes.bool,
  addDetail: PropTypes.func.isRequired,
  taskState: PropTypes.object.isRequired,
  fetchBillingAcctSummary: PropTypes.func.isRequired,
  isNoteFormEnabled: PropTypes.bool.isRequired,
  isAddTaskEnabled: PropTypes.bool.isRequired
}

export default AccountSummary
