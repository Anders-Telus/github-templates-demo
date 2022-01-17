import React from 'react'
import momentTZ from 'moment-timezone'
import HairlineDivider from '@tds/core-hairline-divider'
import Box from '@tds/core-box'
import Text from '@tds/core-text'
import PropTypes from 'prop-types'
import Linkify from '../../../../../../components/Link/view'
import {
  getCasaAppLocale, isManualComment, handleManualComments,
  formatCaseComments, handleSlugComments, isManualSMSEmailComment
} from '../../../../../../utils/helper'
import {
  CommentBody,
  AgentDetailBody,
  CommentTextBody,
  CommentSectionWrapper
} from './styles'
import {
  HyperLink
} from '../../../../../../components/Styled'
import EnvToggle, { isFeatureEnabled } from '../../../../../../components/EnvToggle'

let locale = getCasaAppLocale()

const CommentsList = ({
  items,
  createdOrUpdateAgent,
  type,
  taskStatus,
  commentCount,
  openNotificationPopUp,
  caseId
}) => {
  locale = getCasaAppLocale()
  const itemsList = items.sort((preItem, succItem) => {
    return new Date(succItem.last_updated_ts || succItem.lastUpdatedAt).valueOf()
      - new Date(preItem.last_updated_ts || preItem.lastUpdatedAt).valueOf()
  })
  return (
    !itemsList.length
      ? (
        <CommentBody type={type}>
          <Text id="no-comment">{locale.case.commentsList.noComment}</Text>
        </CommentBody>
      )
      : itemsList.map((comment, index) => {
        return (
          <CommentSectionWrapper taskStatus={taskStatus} commentCount={commentCount} type={type} id={`comment-section-${index}`} key={`comment_${comment.id}_${index + 1}`}>
            <Box between={1}>
              <Box inline between={1}>
                <CommentBody>
                  <Box>
                    <AgentDetailBody id="time">
                      {momentTZ(comment.last_updated_ts || comment.lastUpdatedAt).tz(momentTZ.tz.guess()).format('ll, h:mma')}
                      {type !== 'fifa' && (` ${momentTZ.tz(momentTZ.tz.guess()).format('z')}`)}
                      {` - ${createdOrUpdateAgent(comment.last_updated_by || comment.lastUpdatedBy)} `}
                    </AgentDetailBody>
                    <>
                      {isManualComment(comment.last_updated_by || comment.lastUpdatedBy,
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
                                      id={`case-comment-notification-popup-${caseId}`}
                                      onClick={() => {
                                        openNotificationPopUp(caseId, '', 'caseCommentNotificationPopup')
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
          </CommentSectionWrapper>
        )
      })
  )
}

CommentsList.defaultProps = {
  type: '',
  taskStatus: '',
  commentCount: false
}

CommentsList.propTypes = {
  items: PropTypes.array.isRequired,
  createdOrUpdateAgent: PropTypes.func.isRequired,
  type: PropTypes.string,
  taskStatus: PropTypes.string,
  commentCount: PropTypes.bool,
  openNotificationPopUp: PropTypes.func.isRequired,
  caseId: PropTypes.string.isRequired
}

export default CommentsList
