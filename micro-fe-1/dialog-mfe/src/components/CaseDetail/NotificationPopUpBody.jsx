import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import momentTZ from 'moment-timezone'
import Spinner from '@tds/core-spinner'
import FlexGrid from '@tds/core-flex-grid'
import Box from '@tds/core-box'
import Paragraph from '@tds/core-paragraph'
import ChevronLink from '@tds/core-chevron-link'
import {
  Spacer,
  MessageBlock,
  EmailBlock,
  BackButton,
  NextButton,
  NoDataBlock
} from './styles'

const NotificationBodyContent = ({
  getNotificationInfoStatus, getNotificationInfo, popUpId,
  locale, getUpdatedNotificationIndex
}) => {
  const [notificationDataIndex, setNotificationIndex] = useState(0)
  const [backButtonDisplay, setBackButtonDisplay] = useState('none')
  const [nextButtonDisplay, setNextButtonDisplay] = useState('none')

  let noNotificationDataMessage = ''
  if (getNotificationInfoStatus === 'ERROR') {
    noNotificationDataMessage = (
      <NoDataBlock id="not-working">
        {locale.case.notificationPopUp.notWorking}
      </NoDataBlock>
    )
  } else {
    noNotificationDataMessage = (
      <NoDataBlock id="no-data-found">
        {getNotificationInfoStatus === 'PENDING'
          ? null
          : locale.case.notificationPopUp.noDataFound
        }
      </NoDataBlock>
    )
  }

  const getNotificationData = (back, next) => {
    if (next) {
      setNotificationIndex(notificationDataIndex + 1)
      setBackButtonDisplay('visible')
    }
    if (back) {
      setNotificationIndex(notificationDataIndex - 1)
      setNextButtonDisplay('visible')
    }
  }

  const decodeBase64toHTML = (base64Data) => {
    let base64ToStringNew = ''
    if (base64Data) {
      const buff = Buffer.from(base64Data, 'base64')
      base64ToStringNew = buff.toString('ascii')
    }
    return base64ToStringNew
  }

  useEffect(() => {
    getUpdatedNotificationIndex(notificationDataIndex)
  }, [notificationDataIndex])

  return (
    <Spinner
      spinning={getNotificationInfoStatus === 'PENDING'}
      size="large"
      label={locale.app.loading}
    >
      {getNotificationInfo && getNotificationInfo?.length > 0 ? (
        <FlexGrid key={getNotificationInfo[notificationDataIndex]?.id}>
          <FlexGrid.Row distribute="between">
            <FlexGrid.Col xs={8}>
              <Box vertical={2}>
                <Paragraph bold size="small">
                  {
                    momentTZ(
                      getNotificationInfo[notificationDataIndex]?.sendTime
                    ).tz('America/New_York').format('ll, h:mm a')
                  }
                  &nbsp;&nbsp;EST
                </Paragraph>
                {getNotificationInfo[notificationDataIndex]?.messageType === 'SMS'
                  ? (
                    <Paragraph size="small">
                      {locale.case.notificationPopUp.to}
                      :&nbsp;
                      {getNotificationInfo[notificationDataIndex]?.receiver[0]?.phoneNumber}
                    </Paragraph>
                  )
                  : (
                    <>
                      <Paragraph size="small">
                        {locale.case.notificationPopUp.from}
                        :&nbsp;
                        {getNotificationInfo[notificationDataIndex]?.sender?.email}
                      </Paragraph>
                      <Paragraph size="small">
                        {locale.case.notificationPopUp.to}
                        :&nbsp;
                        {getNotificationInfo[notificationDataIndex]?.receiver[0]?.email}
                      </Paragraph>
                      <Paragraph size="small">
                        {locale.case.notificationPopUp.subject}
                        :&nbsp;
                        {getNotificationInfo[notificationDataIndex]?.subject}
                      </Paragraph>
                    </>
                  )
                }
              </Box>
            </FlexGrid.Col>
            <FlexGrid.Col xs={4} horizontalAlign="center">
              {getNotificationInfo.length - 1 === 0 ? null
                : (
                  <Box vertical={2}>
                    <BackButton
                      notificationDataIndex={notificationDataIndex}
                      backButtonDisplay={backButtonDisplay}
                    >
                      <ChevronLink
                        id={`back-button-${popUpId}`}
                        onClick={
                          () => getNotificationData(true, false)
                        }
                        direction="left"
                      >
                        {locale.case.notificationPopUp.back}
                      </ChevronLink>
                    </BackButton>
                    <Spacer width="24px" />
                    <NextButton
                      notificationDataIndex={notificationDataIndex}
                      dataSize={getNotificationInfo.length - 1}
                      nextButtonDisplay={nextButtonDisplay}
                    >
                      <ChevronLink
                        id={`next-button-${popUpId}`}
                        disabled={true}
                        onClick={
                          () => getNotificationData(false, true)
                        }
                      >
                        {locale.case.notificationPopUp.next}
                      </ChevronLink>
                    </NextButton>
                  </Box>
                )
              }
            </FlexGrid.Col>
          </FlexGrid.Row>
          {getNotificationInfo[notificationDataIndex]?.messageType === 'SMS'
            ? (
              <FlexGrid.Row>
                <FlexGrid.Col>
                  <MessageBlock>
                    {getNotificationInfo[notificationDataIndex]?.content}
                  </MessageBlock>
                </FlexGrid.Col>
              </FlexGrid.Row>
            )
            : (
              <FlexGrid.Row>
                <FlexGrid.Col>
                  { getNotificationInfo[notificationDataIndex]?.content
                    ? (
                      <EmailBlock
                        dangerouslySetInnerHTML={
                        {
                          __html: decodeBase64toHTML(
                            getNotificationInfo[notificationDataIndex]?.content
                          )
                        }
                      }
                      />
                    )
                    : (
                      <NoDataBlock>
                        {locale.case.notificationPopUp.noContentFound}
                      </NoDataBlock>
                    )
                  }
                </FlexGrid.Col>
              </FlexGrid.Row>
            )
          }
        </FlexGrid>
      ) : (
        <FlexGrid>
          <FlexGrid.Row>
            <FlexGrid.Col>
              {noNotificationDataMessage}
            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>

      )
      }
    </Spinner>
  )
}

NotificationBodyContent.defaultProps = {
  getUpdatedNotificationIndex: () => {}
}

NotificationBodyContent.propTypes = {
  getNotificationInfoStatus: PropTypes.string.isRequired,
  getNotificationInfo: PropTypes.object.isRequired,
  popUpId: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired,
  getUpdatedNotificationIndex: PropTypes.func
}
export default NotificationBodyContent
