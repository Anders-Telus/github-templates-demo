import React from 'react'
import momentTZ from 'moment-timezone'
import Box from '@tds/core-box'
import Text from '@tds/core-text'
import PropTypes from 'prop-types'
import HairlineDivider from '@tds/core-hairline-divider'
import Linkify from '../../../../../components/Link/view'
import {
  getCasaAppLocale, isManualComment, handleManualComments,
  formatCaseComments, handleSlugComments, isManualSMSEmailComment
} from '../../../../../utils/helper'

import {
  CommentBody,
  AgentDetailBody,
  CommentTextBody,
  SpacerParagraph
} from './styles'
import {
  HyperLink
} from '../../../../../components/Styled'
import EnvToggle, { isFeatureEnabled } from '../../../../../components/EnvToggle'

const CommentList = ({
  items,
  openNotificationPopUp,
  taskId
}) => {
  const locale = getCasaAppLocale()
  const itemsList = items.sort((preItem, succItem) => {
    return new Date(succItem.last_updated_ts || succItem.lastUpdatedAt).valueOf()
        - new Date(preItem.last_updated_ts || preItem.lastUpdatedAt).valueOf()
  })

  const createdOrUpdateAgent = (agentDetail) => {
    let taskCreatedBy = ''
    if (agentDetail && Object.keys(agentDetail).includes('name') && Object.keys(agentDetail).includes('id')) {
      if (agentDetail.name.toUpperCase() === 'SYSTEM' && agentDetail.id.toUpperCase() === 'SYSTEM') {
        taskCreatedBy = agentDetail.name
      } else {
        taskCreatedBy = `${agentDetail.name} (${agentDetail.id})`
      }
    }
    return taskCreatedBy
  }

  return (
    !itemsList.length
      ? (
        <CommentBody>
          <Text id="no-comment">{locale.case.commentsList.nocomment}</Text>
        </CommentBody>
      )
      : itemsList.map((comment, index) => {
        return (
          <div id="comment-section" style={{ width: '100%', wordBreak: 'break-word' }} key={`comment_${comment.id}_${index + 1}`}>
            <Box between={1}>
              <Box inline between={1}>
                <CommentBody>
                  <Box>
                    <Text size="small">
                      <AgentDetailBody id="time">
                        {momentTZ(comment.last_updated_ts || comment.lastUpdatedAt).tz(momentTZ.tz.guess()).format('ll, h:mma')}
                        {(` ${momentTZ.tz(momentTZ.tz.guess()).format('z')}`)}
                        {` — ${createdOrUpdateAgent(comment.last_updated_by || comment.lastUpdatedBy)} `}
                      </AgentDetailBody>
                    </Text>
                    <SpacerParagraph>
                      <span><br /></span>
                    </SpacerParagraph>
                    <>
                      {
                      isManualComment(comment.last_updated_by || comment.lastUpdatedBy,
                        comment.text)
                        ? (
                          <CommentTextBody>
                            <Linkify options={{ paragraphStyle: { fontSize: '14px' }, target: '_blank' }}>
                              {comment.text ? handleManualComments(comment.text) : ''}
                            </Linkify>
                          </CommentTextBody>
                        )
                        : (
                          <CommentTextBody>
                            {(comment.text && isManualSMSEmailComment(comment.text) && !isFeatureEnabled('CLICK_TO_VIEW'))
                              ? (
                                <>
                                  {`${formatCaseComments(comment.text)} `}
                                  <EnvToggle feature="SAT_NOTIFICATION_LINK">
                                    <HyperLink
                                      id={`standalone-notification-link-${taskId}`}
                                      onClick={() => {
                                        openNotificationPopUp('standaloneTaskNotificationPopup')
                                      }}
                                    >
                                      {locale.case.clickToView}
                                    </HyperLink>
                                  </EnvToggle>
                                  <EnvToggle feature="OLD_SAT_NOTIFICATION_LINK">
                                    <HyperLink>
                                      {locale.case.clickToView}
                                    </HyperLink>
                                  </EnvToggle>
                                </>
                              )
                              : (
                                <Linkify options={{ paragraphStyle: { fontSize: '14px' }, target: '_blank' }}>
                                  {handleSlugComments(comment.text) ? `${locale.task.form[handleSlugComments(comment.text)]}:` : ''}
                                  {comment.text ? formatCaseComments(comment.text) : ''}
                                </Linkify>
                              )}
                          </CommentTextBody>
                        )}
                    </>
                  </Box>
                </CommentBody>
              </Box>
            </Box>
            <HairlineDivider />
          </div>
        )
      })
  )
}

CommentList.propTypes = {
  items: PropTypes.array.isRequired,
  openNotificationPopUp: PropTypes.func.isRequired,
  taskId: PropTypes.number.isRequired
}

export default CommentList
