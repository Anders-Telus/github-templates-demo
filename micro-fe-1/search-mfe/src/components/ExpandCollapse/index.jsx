import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { CaretDown, CaretUp } from '@tds/core-interactive-icon'

import UpArrow from '../../assets/svgs/UpArrow'
import DownArrow from '../../assets/svgs/DownArrow'

import {
  StyledHeading, Heading, Content, StyledIcon, ExpandCollapseContainer
} from './styles'

const ExpandCollapse = ({
  header,
  borderRadius,
  children,
  expand,
  banListHandler,
  headerCSS,
  iconCSS,
  productHandler,
  uniqId,
  disabled,
  openSummary,
  containerCSS,
  insideCard
}) => {
  const uparrowIcon = insideCard ? <UpArrow /> : <CaretUp />
  const downArrow = insideCard ? <DownArrow /> : <CaretDown />
  const [open, setOpen] = useState(expand)
  const caretElement = useRef({ openCloseCaretIcon: !openSummary })
  const onClickCaretIcon = (boolValue) => {
    caretElement.current.openCloseCaretIcon = boolValue
  }
  const containerStyle = {}
  if (containerCSS.apply) {
    containerStyle.marginBottom = !open ? containerCSS.close : containerCSS.open
  }

  return (
    <ExpandCollapseContainer
      id={uniqId}
      style={containerStyle}
      insideCard={insideCard}
    >
      <StyledHeading
        id={uniqId}
        borderRadius={borderRadius}
        headerCSS={headerCSS}
        isKoodo={children && children.props ? children.props.brand === 'koodo' : false}
        disabled={disabled}
        onClick={(e) => {
          if (!disabled) {
            e.preventDefault()
            if (banListHandler && caretElement.current.openCloseCaretIcon) {
              const { billingAcctNum, lineOfBusiness, transBillingAcctStatus } = children.props
              const banData = {
                billingAcctNum,
                lineOfBusiness,
                transBillingAcctStatus
              }
              banListHandler(banData, !open)
            }
            if (productHandler && !open) {
              productHandler()
            }
            if (caretElement.current.openCloseCaretIcon) {
              setOpen(!open)
            }
          }
        }}
      >
        {!disabled &&
          (
            <StyledIcon iconCSS={iconCSS} id={`icon_${uniqId}`} onClick={() => onClickCaretIcon(true)}>
              {open ? uparrowIcon : downArrow}
            </StyledIcon>
          )}
        <Heading id={`heading_${uniqId}`} isCursorPointer={!openSummary} onClick={() => onClickCaretIcon(!openSummary)}>{header}</Heading>
      </StyledHeading>
      <Content open={open}>
        {open ? children : null}
      </Content>
    </ExpandCollapseContainer>
  )
}

ExpandCollapse.defaultProps = {
  insideCard: false,
  borderRadius: '0px',
  expand: true,
  banListHandler: null,
  headerCSS: {
    background: '#F7F7F8',
    padding: '10px 10px',
    marginTop: '20px'
  },
  iconCSS: {
    paddingTop: '5px',
    position: 'inherit',
    paddingLeft: '0px',
    margin: '0px'
  },
  productHandler: null,
  uniqId: '',
  disabled: false,
  openSummary: false,
  containerCSS: {
    apply: false,
    open: '2rem',
    close: '0rem'
  }
}

ExpandCollapse.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.object.isRequired,
  borderRadius: PropTypes.string,
  expand: PropTypes.bool,
  banListHandler: PropTypes.func,
  headerCSS: PropTypes.object,
  iconCSS: PropTypes.object,
  productHandler: PropTypes.func,
  uniqId: PropTypes.string,
  disabled: PropTypes.bool,
  openSummary: PropTypes.bool,
  containerCSS: PropTypes.object,
  insideCard: PropTypes.bool
}
export default ExpandCollapse
