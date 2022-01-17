import React from 'react'
import PropTypes from 'prop-types'
import FlexGrid from '@tds/core-flex-grid'
import {
  NotificationWarning
} from '@tds/core-feedback-icon'
import {
  AccordionRow,
  AccordionChildrenSection,
  AccordionColWrapper,
  Container,
  IconWrapper
} from '../styles'


const AccordionSection = ({
  children,
  isOpen,
  onClick,
  header,
  taskStatus,
  accordionHeight,
  listRef,
  caseCompleteCancelItem,
  isRTSPopUpOpen
}) => (
  <>
    <Container>
      <FlexGrid gutter={false}>
        <FlexGrid.Row>
          <FlexGrid.Col sm={1} xs={1} md={1} lg={1}>
            <IconWrapper
              visibility={
                !isRTSPopUpOpen && caseCompleteCancelItem && caseCompleteCancelItem !== ''
                && (taskStatus === 'NOT_STARTED' || taskStatus === 'IN_PROGRESS')
              }
            >
              <NotificationWarning />
            </IconWrapper>

          </FlexGrid.Col>
          <FlexGrid.Col sm={11} xs={11} md={11} lg={11}>
            <AccordionRow
              id="accordion_row_header"
              onClick={onClick}
              status={taskStatus}
              isOpen={isOpen}
            >
              <AccordionColWrapper>{ header }</AccordionColWrapper>
            </AccordionRow>
            {isOpen && (
            <AccordionChildrenSection accordionHeight={accordionHeight} ref={listRef}>
              { children }
            </AccordionChildrenSection>
            )
    }
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </Container>
  </>
)

AccordionSection.defaultProps = {
  accordionHeight: 'auto'
}

AccordionSection.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  header: PropTypes.object.isRequired,
  taskStatus: PropTypes.string.isRequired,
  accordionHeight: PropTypes.string,
  listRef: PropTypes.object.isRequired,
  caseCompleteCancelItem: PropTypes.string.isRequired,
  isRTSPopUpOpen: PropTypes.bool.isRequired
}

export default AccordionSection
