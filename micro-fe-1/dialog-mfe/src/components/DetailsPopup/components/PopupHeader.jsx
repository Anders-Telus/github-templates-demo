import React from 'react'
import PropTypes from 'prop-types'
import FlexGrid from '@tds/core-flex-grid'
import HairlineDivider from '@tds/core-hairline-divider'
import { Subtract, Close } from '@tds/core-interactive-icon'

import {
  Header,
  IconContainer,
  CloseBtnContainer,
  MinimizeContainer,
  HrDividerContainer,
  HeaderWrapper,
  HeaderLeft,
  HeaderRight
} from '../styles'

const PopupHeader = ({
  closeHandler,
  showCloseIcon,
  headerContent,
  mouseDownEvent,
  minimizePopup,
  minimized,
  maximizePopup,
  isDraggable, coreHeaderStyles,
  coreDividerStyles,
  showMinimizeIcon,
  headerHoverDisplay
}) => {
  const minimizeIconBody = minimized ? null : (
    <MinimizeContainer id="minimize-btn" onClick={minimizePopup}>
      <Subtract />
    </MinimizeContainer>
  )
  return (
    <HeaderWrapper minimized={minimized} headerHoverDisplay={headerHoverDisplay}>
      <HeaderLeft
        onMouseDown={!minimized && isDraggable ? mouseDownEvent : () => { }}
        minimized={minimized}
        isDraggable={isDraggable}
        onClick={minimized ? maximizePopup : () => { }}
      >
        <Header
          id="popup-header"
          minimized={minimized}
          isDraggable={isDraggable}
        >
          <FlexGrid limitWidth={false} gutter={false}>
            <div style={coreHeaderStyles}>
              <FlexGrid.Row distribute="between">
                <FlexGrid.Col
                  xs={12} md={12}
                  id="header-content"
                >
                  {headerContent}
                </FlexGrid.Col>
              </FlexGrid.Row>
            </div>
          </FlexGrid>
        </Header>
      </HeaderLeft>
      <HeaderRight minimized={minimized} headerHoverDisplay={headerHoverDisplay}>
        <IconContainer>
          {!showMinimizeIcon ? null : minimizeIconBody}
          <CloseBtnContainer showCloseIcon={showCloseIcon} id="close-btn" onClick={closeHandler}>
            <Close />
          </CloseBtnContainer>
        </IconContainer>
      </HeaderRight>
      {
        !minimized && headerHoverDisplay ? (
          <HrDividerContainer style={coreDividerStyles}>
            <FlexGrid.Row>
              <FlexGrid.Col>
                <HairlineDivider />
              </FlexGrid.Col>
            </FlexGrid.Row>
          </HrDividerContainer>
        ) : null
      }
    </HeaderWrapper>
  )
}

PopupHeader.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  showMinimizeIcon: PropTypes.bool.isRequired,
  showCloseIcon: PropTypes.bool.isRequired,
  headerContent: PropTypes.object.isRequired,
  mouseDownEvent: PropTypes.func.isRequired,
  minimizePopup: PropTypes.func.isRequired,
  maximizePopup: PropTypes.func.isRequired,
  minimized: PropTypes.bool.isRequired,
  isDraggable: PropTypes.bool.isRequired,
  coreHeaderStyles: PropTypes.object.isRequired,
  coreDividerStyles: PropTypes.object.isRequired,
  headerHoverDisplay: PropTypes.bool.isRequired
}

export default PopupHeader
