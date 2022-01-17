import React from 'react'
import PropTypes from 'prop-types'
import FlexGrid from '@tds/core-flex-grid'
import Box from '@tds/core-box'
import momentTZ from 'moment-timezone'
import {
  Time
} from '@tds/core-decorative-icon'
import Checkbox from '@tds/core-checkbox'
import SelectInput from '../../../../../components/Select/CustomSelect'
import AddComment from '../AddComment/view'
import CommentList from '../CommentList/view'
import TooltipWrapper from '../../../../Search/components/FIFAEscalationForm/TooltipWrapper'
import UpdateCompleteToggle from '../../../../../components/UpdateCompleteToggle'
import {
  getSubTypeTimeFormat
} from '../../../../../utils/common'
import {
  getCasaAppLocale,
  TIMEZONE_MAPPING
} from '../../../../../utils/helper'
import {
  Mandatory,
  DetailsLabel,
  DateTimeLabelContainer,
  DueDate,
  RegularWeightText,
  TimeWrapper,
  BusinessHoursWrapper,
  TimezoneWrapper,
  DueDateValue,
  CheckBoxWrapper,
  CheckBox
} from './style'
import { isFeatureEnabled } from '../../../../../components/EnvToggle'
// import { inherits } from 'util';

let locale = getCasaAppLocale()
const DetailComponent = ({
  id, requestOptions, typeOptions, agentOptions, dueDateOptions, openCalendar, addCommentOptions,
  type, previousComments, disabled, isWarning, dusDateHoverVisible, isLOBChanged, LOBChangeWarning,
  timezone, fifaOptions, parentComp, underDuration, routeOptions, pastDue,
  subRequestTypeDefaultDate, townCheckdueDateOptions,
  _isTOWNcheck, SubTypeDateFormatCalendarDate, getSubTypeDateFormat, isAuthorized,
  openNotificationPopUp, taskId
}) => {
  locale = getCasaAppLocale()
  const formatDateTime = (date, flag) => {
    if (date && flag) {
      return `${momentTZ(date).tz(TIMEZONE_MAPPING(timezone)).format('ll')}`
    }
    return `${momentTZ(date).tz(TIMEZONE_MAPPING(timezone)).format('ll,')}`
  }

  let agentSize = 8
  let agentSizeMd = 8
  if (fifaOptions.isVisible === true) {
    agentSize = 3
    agentSizeMd = 4
  }

  const timeIcon = _isTOWNcheck
    ? townCheckdueDateOptions.value && townCheckdueDateOptions.isBusinessHours
    : dueDateOptions.value && dueDateOptions.isBusinessHours

  return (
    <Box between={2}>
      <Box between={1} id={id}>
        <FlexGrid limitWidth={false} gutter={false}>
          <FlexGrid.Row distribute="between">
            <FlexGrid.Col xl={4} md={4} horizontalAlign="left">
              <DetailsLabel>
                <Box inline between={1}>
                  {
                    requestOptions.mandatory ? (
                      <Mandatory>
                        *
                      </Mandatory>
                    )
                      : (
                        <span>
                          &nbsp;
                        </span>
                      )
                  }
                  <DetailsLabel>
                    {requestOptions.label}
                  </DetailsLabel>
                </Box>
              </DetailsLabel>
            </FlexGrid.Col>
            <FlexGrid.Col xl={8} md={8}>
              {type === 'task-detail'
                ? (
                  <RegularWeightText id={requestOptions.id}>
                    {requestOptions.value}
                  </RegularWeightText>
                )
                : (
                  <SelectInput
                    id={requestOptions.id}
                    options={requestOptions.options}
                    value={requestOptions.value}
                    onChange={requestOptions.onChange}
                    feedback={requestOptions.feedback}
                    borderLess={requestOptions.borderLess || false}
                    disabled={disabled}
                    placeholder={locale.task.form.selectBtn}
                  />
                )}
            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>
        <FlexGrid limitWidth={false} gutter={false}>
          <FlexGrid.Row distribute="between">
            <FlexGrid.Col xl={4} md={4} horizontalAlign="left">
              <DetailsLabel>
                <Box inline between={1}>
                  {
                    typeOptions.mandatory ? (
                      <Mandatory>
                        *
                      </Mandatory>
                    )
                      : (
                        <span>
                          &nbsp;
                        </span>
                      )
                  }
                  <DetailsLabel>
                    {typeOptions.label}
                  </DetailsLabel>
                </Box>
              </DetailsLabel>
            </FlexGrid.Col>
            <FlexGrid.Col xl={8} md={8}>
              {type === 'task-detail'
                ? (
                  <RegularWeightText id={typeOptions.id}>
                    {typeOptions.value}
                  </RegularWeightText>
                )
                : (
                  <SelectInput
                    id={typeOptions.id}
                    options={typeOptions.options}
                    value={typeOptions.value}
                    onChange={typeOptions.onChange}
                    feedback={typeOptions.feedback}
                    borderLess={typeOptions.borderLess || false}
                    disabled={disabled}
                    placeholder={locale.task.form.selectBtn}
                  />
                )}


            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>
      </Box>
      <Box between={3}>
        <FlexGrid limitWidth={false} gutter={false}>
          <FlexGrid.Row distribute="between">
            <FlexGrid.Col xl={4} md={4} horizontalAlign="left">
              <DetailsLabel>
                <Box inline between={1}>
                  {
                    agentOptions.mandatory ? (
                      <Mandatory>
                        *
                      </Mandatory>
                    )
                      : (
                        <span>
                          &nbsp;
                        </span>
                      )
                  }
                  <DetailsLabel>
                    {agentOptions.label}
                  </DetailsLabel>
                </Box>
              </DetailsLabel>
            </FlexGrid.Col>
            <FlexGrid.Col xl={agentSize} md={agentSizeMd}>
              <Box between={2}>
                {agentOptions.isLabel ? (
                  <RegularWeightText>
                    {agentOptions.text}
                  </RegularWeightText>
                ) : (
                  <SelectInput
                    id={agentOptions.id}
                    options={agentOptions.options}
                    value={agentOptions.value}
                    onChange={agentOptions.onChange}
                    feedback={agentOptions.feedback}
                    borderLess={agentOptions.borderLess || false}
                    disabled={disabled || underDuration || pastDue}
                    border={isLOBChanged}
                    placeholder={locale.task.form.selectBtn}
                  />
                )}
                {type === 'task-create' || (type === 'task-detail' && routeOptions.value && !isFeatureEnabled('ROUTE_TO_AGENT_FLAG'))
                  ? (
                    <CheckBoxWrapper disabled={routeOptions.disabled}>
                      <Checkbox
                        id={routeOptions.id}
                        checked={routeOptions.value}
                        onChange={routeOptions.onChange}
                        label={routeOptions.label}
                        disabled={routeOptions.disabled}
                      />
                    </CheckBoxWrapper>
                  )
                  : null
              }
              </Box>
            </FlexGrid.Col>
            {fifaOptions.isVisible ? (
              <FlexGrid.Col xl={4} md={4} xlOffset={1}>
                <CheckBox disabled={disabled || isAuthorized}>
                  <Box tag="fieldset" between={1}>
                    <Checkbox
                      disabled={disabled || isAuthorized}
                      checked={fifaOptions.value}
                      onChange={fifaOptions.onChange}
                      name={fifaOptions.id}
                      value="fifa"
                      label={fifaOptions.label}
                    />
                  </Box>
                </CheckBox>
              </FlexGrid.Col>
            ) : ''}
          </FlexGrid.Row>
          <FlexGrid.Row distribute="between">
            {isLOBChanged && LOBChangeWarning}
          </FlexGrid.Row>
        </FlexGrid>
        <FlexGrid limitWidth={false} gutter={false}>
          <FlexGrid.Row distribute="between">
            <FlexGrid.Col xl={4} md={4} horizontalAlign="left">
              <DetailsLabel>
                <Box inline between={1}>
                  {
                    dueDateOptions.mandatory ? (
                      <Mandatory>
                        *
                      </Mandatory>
                    )
                      : (
                        <span>
                          &nbsp;
                        </span>
                      )
                  }
                  <DetailsLabel>
                    {`${dueDateOptions.label}:`}
                  </DetailsLabel>
                </Box>
              </DetailsLabel>
            </FlexGrid.Col>
            <FlexGrid.Col xl={8} md={8}>
              <DateTimeLabelContainer
                isWarning={isWarning}
                onClick={
                  !isAuthorized ? (ev) => {
                    openCalendar(ev.clientX,
                      ev.clientY,
                      _isTOWNcheck
                        ? getSubTypeTimeFormat(subRequestTypeDefaultDate._defaultTime)
                        : dueDateOptions.dueTime,
                      dueDateOptions.isWarning,
                      SubTypeDateFormatCalendarDate(dueDateOptions.dueDate, _isTOWNcheck),
                      dueDateOptions.isBusinessHours,
                      _isTOWNcheck)
                  } : () => {}
                }
                isHover={dusDateHoverVisible}
              >
                {
                  (dueDateOptions.value || _isTOWNcheck) ? (
                    <>
                      <DueDate
                        id="accordion_data_due_date_value"
                      >
                        {_isTOWNcheck
                          ? getSubTypeDateFormat
                          : formatDateTime(dueDateOptions.dueDate, dueDateOptions.isWarning) }
                      </DueDate>
                      &nbsp;
                      <DueDate id="accordion_data_due_time_value">
                        {_isTOWNcheck
                          ? townCheckdueDateOptions.dueTime
                          : dueDateOptions.dueTime}
                      </DueDate>
                    </>
                  )
                    : (
                      <>
                        <DueDateValue id="task_creation_duedate_label">
                          {locale.task.form.selectBtn}
                        </DueDateValue>
                      </>
                    )
                }
              </DateTimeLabelContainer>
              {timezone && (
                <TimezoneWrapper parentComp={parentComp}>
                  {timezone}
                </TimezoneWrapper>
              )}
              {
                timeIcon
                  ? (
                    <BusinessHoursWrapper>
                      <TooltipWrapper
                        text={locale.task.toolTipsLabel
                          .scheduledBusinessHours} variant="vertical" toolTipBodyVisible={true}
                      >
                        <TimeWrapper id="accordion_data_scheduledBusinessHours">
                          <Time size={16} />
                        </TimeWrapper>
                      </TooltipWrapper>
                    </BusinessHoursWrapper>
                  )
                  : null}
            </FlexGrid.Col>
            {isWarning && dueDateOptions.dueDateNotification}
          </FlexGrid.Row>
        </FlexGrid>
        <FlexGrid limitWidth={false} gutter={false}>
          {addCommentOptions.isVisible && (
            <>
              <FlexGrid.Row horizontalAlign="start">
                <DetailsLabel>
                  <Box inline between={1}>
                    {
                addCommentOptions.mandatory ? (
                  <Mandatory>
                    *
                  </Mandatory>
                )
                  : (
                    <span>
                      &nbsp;
                    </span>
                  )
              }
                    <DetailsLabel>
                      {`${addCommentOptions.label}:`}
                    </DetailsLabel>
                  </Box>
                </DetailsLabel>
              </FlexGrid.Row>
              <FlexGrid.Row horizontalAlign="start">
                {
                  type === 'task-detail'
                    ? (
                      <UpdateCompleteToggle>
                        <FlexGrid.Row horizontalAlign="start">
                          <AddComment
                            id={addCommentOptions.id}
                            placeholder={addCommentOptions.placeholder}
                            addCommentHandler={addCommentOptions.onChange}
                            newCommentText={addCommentOptions.value}
                            disabled={disabled}
                          />
                        </FlexGrid.Row>
                      </UpdateCompleteToggle>
                    ) : (
                      <AddComment
                        id={addCommentOptions.id}
                        placeholder={addCommentOptions.placeholder}
                        addCommentHandler={addCommentOptions.onChange}
                        newCommentText={addCommentOptions.value}
                        disabled={disabled}
                      />
                    )
                }
              </FlexGrid.Row>
            </>
          )}
          {type === 'task-detail' ? (
            <FlexGrid.Row horizontalAlign="start">
              <CommentList
                items={previousComments}
                timezone={timezone}
                openNotificationPopUp={openNotificationPopUp}
                taskId={taskId}
              />
            </FlexGrid.Row>
          ) : null}
        </FlexGrid>
      </Box>
    </Box>
  )
}

DetailComponent.defaultProps = {
  id: 'new_task',
  previousComments: [],
  disabled: false,
  isWarning: false,
  LOBChangeWarning: {},
  isLOBChanged: false,
  dusDateHoverVisible: true,
  timezone: '',
  fifaOptions: {},
  routeOptions: {},
  parentComp: '',
  underDuration: false,
  pastDue: false,
  subRequestTypeDefaultDate: '',
  _isTOWNcheck: false,
  getSubTypeDateFormat: '',
  SubTypeDateFormatCalendarDate: () => {},
  townCheckdueDateOptions: {},
  isAuthorized: false
}

DetailComponent.propTypes = {
  fifaOptions: PropTypes.object,
  id: PropTypes.string,
  requestOptions: PropTypes.object.isRequired,
  typeOptions: PropTypes.object.isRequired,
  agentOptions: PropTypes.object.isRequired,
  dueDateOptions: PropTypes.object.isRequired,
  openCalendar: PropTypes.func.isRequired,
  addCommentOptions: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  previousComments: PropTypes.array,
  disabled: PropTypes.bool,
  isWarning: PropTypes.bool,
  LOBChangeWarning: PropTypes.object,
  isLOBChanged: PropTypes.bool,
  dusDateHoverVisible: PropTypes.bool,
  timezone: PropTypes.string,
  routeOptions: PropTypes.object,
  parentComp: PropTypes.string,
  underDuration: PropTypes.bool,
  pastDue: PropTypes.bool,
  subRequestTypeDefaultDate: PropTypes.object,
  _isTOWNcheck: PropTypes.bool,
  SubTypeDateFormatCalendarDate: PropTypes.func,
  getSubTypeDateFormat: PropTypes.string,
  townCheckdueDateOptions: PropTypes.object,
  isAuthorized: PropTypes.bool,
  openNotificationPopUp: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired
}

export default DetailComponent
