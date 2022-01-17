import React, { useState, useRef } from 'react'
import FlexGrid from '@tds/core-flex-grid'
import PropTypes from 'prop-types'
import moment from 'moment'
import SkeletonLoader from '@tds/community-skeleton'
import {
  PhoneHome, Email, Chat1
} from '@tds/core-decorative-icon'
import { Edit } from '@tds/core-interactive-icon'
import Editable from '../../../../../components/EditableField/view'
import SelectInput from '../../../../../components/Select/CustomSelect'
import { taskUpdateType, DEFAULT_MSG_TOPIC } from '../../../../../constant'
import {
  CaseCustomerDetail,
  CustomerDetailRow,
  DetailsColumn,
  SymbolColumn,
  MediumWeightText,
  ContactCard,
  Mandatory,
  RegularWeightText,
  CustomerNameWrapper
} from './style'
import {
  getCasaAppLocale,
  openWindowWithPost,
  getAgentLanguage
} from '../../../../../utils/helper'
import TooltipWrapper from '../../../../Search/components/FIFAEscalationForm/TooltipWrapper'
import { CasaIconButton } from '../../../../../components/Styled'
import SmsInverted from '../../../../../../assets/svgs/SmsInverted'
import EmailInverted from '../../../../../../assets/svgs/EmailInverted'
import uiConfig from '../../../../../../config/ui'
import ClickToCopy from '../../../../../components/ClickToCopy'
import { isFeatureEnabled } from '../../../../../components/EnvToggle'

const CustomerDetailComponent = ({
  billingAccountName, billingAcctNum, cbr, email, language,
  isCardEditable, disabled, sms, editIconVisible, taskDetailsInfo,
  updateComment, agentIdentity, isVisible, tabUniqId
}) => {
  const { status } = taskDetailsInfo
  const locale = getCasaAppLocale()
  const windowLocale = moment.locale()
  const langLabelGrid = windowLocale === 'en' ? 4 : 3
  const langSelectGrid = windowLocale === 'en' ? 8 : 9
  const cbrWidth = windowLocale === 'en' ? '125' : '137'
  const isGoSendDisabled = status === 'COMPLETED' || status === 'CANCELLED'
  const [isEditable, setIsEditable] = useState(false)
  const [nameTooltip, setNameTooltip] = useState(false)
  const nameLabelRef = useRef()
  const editClick = () => {
    if (isCardEditable) {
      setIsEditable(true)
    } else {
      setIsEditable(false)
    }
  }
  const setNameTooltipVisibility = (Visibility) => {
    setNameTooltip(Visibility)
  }
  const onMouseOver = () => {
    if (!nameTooltip && nameLabelRef.current.scrollWidth
      > nameLabelRef.current.offsetWidth) {
      setNameTooltipVisibility(true)
    }
  }
  const cardBlurHandler = () => {
    setIsEditable(false)
  }
  const launchGoSendInNewTab = (data, newCommentText) => {
    const { value, type } = data
    const {
      taskId,
      taskType,
      lob,
      brand,
      sms: phoneNumber,
      email: emailId,
      language: customerLanguage
    } = taskDetailsInfo

    if (!isFeatureEnabled('GO_SEND_NOTIFICATION_TASK') && (email || phoneNumber)) {
      const { goSendNotificationTool } = uiConfig.acctThirdPartyUtils
      const url = `${goSendNotificationTool}`
      const agentLanguage = getAgentLanguage()
      const messageObj = {
        characteristic: [{ name: 'taskId', valueType: 'String', value: taskId }],
        phonenumber: phoneNumber,
        customerfullname: billingAccountName,
        emailaddress: emailId,
        ban: billingAcctNum,
        customerlanguage: customerLanguage.toLowerCase() === 'french' ? 'FR' : 'EN',
        lob,
        topic: DEFAULT_MSG_TOPIC,
        brand: brand && brand.toLowerCase() === 'koodo' ? 3 : 1,
        agentlanguage: agentLanguage.toUpperCase(),
        notificationtype: type
      }
      openWindowWithPost(url, messageObj)
      const lastUpdatedBy = { id: agentIdentity.employeeId, name: `${agentIdentity.firstName} ${agentIdentity.lastName}` }
      const body = {
        event: {
          StandAloneTask: {
            taskId,
            lastUpdatedBy,
            comments: [
              {
                createdAt: (new Date()).toISOString(),
                createdBy: 'T-989898',
                text: newCommentText
              }
            ],
            accountRef: {
              accountNumber: taskDetailsInfo && taskDetailsInfo.billingAccNum,
              systemId: ''
            }
          }
        },
        taskType: taskUpdateType[taskType],
        eventType: 'UITaskUpdate',
        externalId: taskDetailsInfo && taskDetailsInfo.externalId,
        systemSourceId: 'CasaUI',
        timeOccurred: ((new Date()).toISOString()),
        traceId: taskDetailsInfo && taskDetailsInfo.interactionId,
        lob: taskDetailsInfo && taskDetailsInfo.lob,
        brand: taskDetailsInfo && taskDetailsInfo.brand
      }
      updateComment(body, taskId, tabUniqId)
    }
    if (isFeatureEnabled('GO_SEND_NOTIFICATION_TASK') && value) {
      const { goSendTool } = uiConfig.acctThirdPartyUtils
      const url = `${goSendTool}${value}`
      window.open(url, 'goSend')
      const lastUpdatedBy = { id: agentIdentity.employeeId, name: `${agentIdentity.firstName} ${agentIdentity.lastName}` }
      const body = {
        event: {
          StandAloneTask: {
            taskId,
            lastUpdatedBy,
            comments: [
              {
                createdAt: (new Date()).toISOString(),
                createdBy: 'T-989898',
                text: newCommentText
              }
            ],
            accountRef: {
              accountNumber: taskDetailsInfo && taskDetailsInfo.billingAccNum,
              systemId: ''
            }
          }
        },
        taskType: taskUpdateType[taskType],
        eventType: 'UITaskUpdate',
        externalId: taskDetailsInfo && taskDetailsInfo.externalId,
        systemSourceId: 'CasaUI',
        timeOccurred: ((new Date()).toISOString()),
        traceId: taskDetailsInfo && taskDetailsInfo.interactionId,
        lob: taskDetailsInfo && taskDetailsInfo.lob,
        brand: taskDetailsInfo && taskDetailsInfo.brand
      }
      updateComment(body, taskId, tabUniqId)
    }
  }
  const linkRef = React.createRef()
  return (
    <>
      <ContactCard>
        <CaseCustomerDetail>
          <CustomerDetailRow>
            <SymbolColumn>
              <TooltipWrapper text={billingAccountName} variant="vertical" toolTipBodyVisible={nameTooltip}>
                <MediumWeightText>
                  <CustomerNameWrapper ref={nameLabelRef} id="banWrapper" onMouseOver={onMouseOver}>
                    {billingAccountName}
                  </CustomerNameWrapper>
                </MediumWeightText>
              </TooltipWrapper>
            </SymbolColumn>
            {editIconVisible && (
              <DetailsColumn isEdit={true} disabled={!isEditable} editable={isEditable}>
                {
                  isVisible
                    ? (
                      <button
                        id="link_button"
                        type="button"
                        ref={linkRef}
                        disabled={disabled}
                        onClick={editClick}
                        onBlur={cardBlurHandler}
                      >
                        <Edit />
                      </button>
                    ) : null
                }
              </DetailsColumn>
            )}
          </CustomerDetailRow>
          <CustomerDetailRow>
            <SymbolColumn>
              <MediumWeightText>
                {`${locale.task.billingAccNumtxt}:`}
              </MediumWeightText>
              &nbsp;&nbsp;
              <RegularWeightText>
                {billingAcctNum}
              </RegularWeightText>
            </SymbolColumn>
          </CustomerDetailRow>
          {sms.visible && (
            (sms.fetchSmsStatus === 'SUCCESS' || sms.fetchSmsStatus === 'ERROR') ? (
              <CustomerDetailRow>
                <DetailsColumn isEdit={false}>
                  {
                      /* tool is taking only mob phone number as of now
                      * even in case of email need to trigger goSend with phone number
                      */
                     (!disabled && taskDetailsInfo && taskDetailsInfo.lob && taskDetailsInfo.lob.toLowerCase() === 'mobility' && sms && sms.value && sms.value.length && !isGoSendDisabled) ? (
                       <TooltipWrapper
                         text={locale.case.toolTips.clickToSendSMS}
                         variant="vertical"
                         toolTipBodyVisible
                       >
                         <CasaIconButton
                           onClick={() => launchGoSendInNewTab({ type: 'sms', value: sms.value }, { slugs: 'smsInitiated', text: 'smsInitiated' })}
                           a11yText="SMS"
                           id={`goSend_sms_${sms.value}`}
                         >
                           <SmsInverted />
                         </CasaIconButton>
                       </TooltipWrapper>
                     )
                       : <Chat1 size="16" variant="default" />
                    }
                </DetailsColumn>
                <SymbolColumn>
                  <MediumWeightText>
                    {`${locale.case.sms}:`}
                  </MediumWeightText>
                  <ClickToCopy text={sms.value}>
                    <Editable
                      id={sms.id}
                      key={`task_contact_sms_${sms.id}`}
                      type="sms"
                      maxLength="12"
                      onChange={e => sms.onChange(e)}
                      value={sms.value}
                      valid={!sms.isValid}
                      disabled={sms.isInputDisabled || disabled}
                      isEditable={isEditable}
                    />
                  </ClickToCopy>
                </SymbolColumn>
              </CustomerDetailRow>
            ) : (
              <SkeletonLoader characters={8} id="skeleton-sms" />
            )
          )}
          {email.isVisible && (
            <CustomerDetailRow>
              <DetailsColumn isEdit={false}>
                {
                      /* tool is taking only mob phone number as of now
                      * even in case of email need to trigger goSend with phone number
                      */
                 (!disabled && taskDetailsInfo && taskDetailsInfo.lob && taskDetailsInfo.lob.toLowerCase() === 'mobility' && sms && sms.value && sms.value.length && email && email.value && email.value.length && !isGoSendDisabled) ? (
                   <TooltipWrapper
                     text={locale.case.toolTips.clickToSendEmail}
                     variant="vertical"
                     toolTipBodyVisible
                   >
                     <CasaIconButton
                       onClick={() => launchGoSendInNewTab({ type: 'email', value: sms.value }, { slugs: 'emailInitiated', text: 'emailInitiated' })}
                       a11yText="Email"
                       id={`goSend_email_${email.value}`}
                     >
                       <EmailInverted />
                     </CasaIconButton>
                   </TooltipWrapper>
                 )
                   : <Email size="16" variant="default" />
                }
              </DetailsColumn>
              <SymbolColumn>
                <TooltipWrapper text={email.value} variant="vertical" toolTipBodyVisible={email.tooltipVisible}>
                  <ClickToCopy text={email.value} isInvisible={email.isUpdated} top={-6}>
                    <Editable
                      id={email.id}
                      type="email"
                      maxLength="100"
                      onChange={(e, toolTip) => email.onChange(e, toolTip)}
                      width={cbrWidth}
                      minWidth={cbrWidth}
                      value={email.value}
                      valid={!email.isValid}
                      disabled={email.isInputDisabled || disabled}
                      isEditable={isEditable}
                    />
                  </ClickToCopy>
                </TooltipWrapper>
              </SymbolColumn>
            </CustomerDetailRow>
          )}
          {cbr.isVisible && (
            <CustomerDetailRow>
              <DetailsColumn isEdit={false}>
                <PhoneHome size="16" variant="default" />
              </DetailsColumn>
              <SymbolColumn>
                { !disabled ? (
                  <Mandatory>
                    *&nbsp;
                  </Mandatory>
                ) : null
                }
                <MediumWeightText>
                  {`${locale.task.cbr}:`}
                </MediumWeightText>
                <ClickToCopy text={cbr.value}>
                  <Editable
                    id={cbr.id}
                    type="cbr"
                    maxLength="12"
                    onChange={e => cbr.onChange(e)}
                    value={cbr.value}
                    valid={!cbr.isValid}
                    disabled={cbr.isInputDisabled || disabled}
                    isEditable={isEditable}
                    placeholder={locale.task.form.placeHolder.defaultTextboxTxtComment}
                  />
                </ClickToCopy>
              </SymbolColumn>
            </CustomerDetailRow>
          )}
          <CustomerDetailRow>
            <SymbolColumn>
              <FlexGrid.Row distribute="between">
                <FlexGrid.Col xl={langLabelGrid} md={langLabelGrid} horizontalAlign="left">
                  <MediumWeightText>
                    {`${locale.task.form.language}:`}
                  </MediumWeightText>
                </FlexGrid.Col>
                <FlexGrid.Col xl={langSelectGrid} md={langSelectGrid}>
                  {language.isLabel ? (
                    <>
                      <RegularWeightText>
                        {language.text}
                      </RegularWeightText>
                    </>
                  ) : (
                    <SelectInput
                      id={language.id}
                      options={language.options}
                      onChange={language.onChange}
                      value={language.value}
                      borderLess={true}
                      disabled={disabled}
                      placeholder={locale.task.form.selectBtn}
                    />
                  )}
                </FlexGrid.Col>
              </FlexGrid.Row>
            </SymbolColumn>
          </CustomerDetailRow>
        </CaseCustomerDetail>
      </ContactCard>
    </>
  )
}
CustomerDetailComponent.defaultProps = {
  billingAccountName: '',
  billingAcctNum: '',
  isCardEditable: false,
  disabled: false,
  editIconVisible: true,
  agentIdentity: {},
  taskDetailsInfo: {},
  updateComment: () => {},
  isVisible: true,
  tabUniqId: ''
}
CustomerDetailComponent.propTypes = {
  billingAccountName: PropTypes.string,
  billingAcctNum: PropTypes.string,
  cbr: PropTypes.object.isRequired,
  email: PropTypes.object.isRequired,
  language: PropTypes.object.isRequired,
  isCardEditable: PropTypes.bool,
  disabled: PropTypes.bool,
  sms: PropTypes.object.isRequired,
  editIconVisible: PropTypes.bool,
  taskDetailsInfo: PropTypes.object,
  agentIdentity: PropTypes.object,
  updateComment: PropTypes.func,
  isVisible: PropTypes.bool,
  tabUniqId: PropTypes.string
}
export default CustomerDetailComponent
