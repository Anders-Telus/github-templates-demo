import React from 'react'
import PropTypes from 'prop-types'
import Portal from '../shared/Portal'
import TooltipBody from './TooltipBody'

const DELAY = 90 // ms

/**
 * Tooltip takes 5 props:
 * children: target component(s) attached to the tooltip
 * text (optional): textual content to show inside the tooltip
 * variant (optional): one of 'horizontal' and 'vertical' to position the tooltip respectively
 * maxWidth (optional): maximum width of the tooltip label
 * parentId (optional): id of the target's parent component onto which the Portal will attach itself
 * noWrap (optional): text in the tooltip won't break to new line
 * Note: default variant is 'vertical'
 */
class Tooltip extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isHovering: false,
      pos: {}
    }
    this.delayTimer = null
    this.targetRef = React.createRef()
    this.tooltipRef = React.createRef()
    this.setPosition = this.setPosition.bind(this)
    this.showTooltip = this.showTooltip.bind(this)
    this.hideTooltip = this.hideTooltip.bind(this)
  }

  setPosition () {
    const { variant } = this.props
    const pos = {}
    const {
      x, y, width: targetWidth, height: targetHeight
    } = this.targetRef.current.getBoundingClientRect()
    const {
      width: tooltipWidth, height: tooltipHeight
    } = this.tooltipRef.current.getBoundingClientRect()
    const { innerHeight: viewHeight, innerWidth: viewWidth } = window
    const targetX = x || 0
    const targetY = y || 0

    if (variant === 'vertical') {
      pos.left = Math.max(0, tooltipWidth ? targetX - (tooltipWidth - targetWidth) / 2 : targetX)
      if (targetY < (viewHeight / 2)) {
        pos.top = Math.max(0, targetY + targetHeight) // target is in top half
        pos.type = 'below'
      } else {
        pos.bottom = Math.min(viewHeight, viewHeight - targetY) // target is in bottom half
        pos.type = 'above'
      }
      pos.arrowX = targetX + (targetWidth / 2) - pos.left
    }

    if (variant === 'horizontal') {
      pos.top = Math.max(0, Math.min(
        viewHeight - tooltipHeight,
        tooltipHeight ? targetY - (tooltipHeight - targetHeight) / 2 : targetY
      ))
      if (targetX < (viewWidth / 2)) {
        pos.left = Math.max(0, targetX + targetWidth) // target is in left half
        pos.type = 'right'
      } else {
        pos.right = Math.max(0, viewWidth - targetX) // target is in right half
        pos.type = 'left'
      }
      pos.arrowY = targetY + (targetHeight / 2) - pos.top
    }

    this.setState({ pos })
  }

  showTooltip () {
    this.delayTimer = setTimeout(
      () => {
        this.setState(
          { isHovering: true },
          () => this.setPosition()
        )
      }, DELAY
    )
  }

  hideTooltip () {
    const hide = () => {
      this.setState({ isHovering: false, pos: {} })
      clearTimeout(this.delayTimer)
    }

    if (this.tooltipRef.current) {
      this.tooltipRef.current.style.opacity = '0'
      setTimeout(() => hide(), 275)
    } else hide()
  }

  render () {
    const {
      children, text, variant, parentId, maxWidth, noWrap
    } = this.props
    const { isHovering, pos } = this.state

    return text ? (
      <span
        id={`${variant}_tooltip`}
        onMouseEnter={this.showTooltip}
        onMouseLeave={this.hideTooltip}
        ref={this.targetRef}
      >
        {children}
        {isHovering && (
          <Portal parentId={parentId}>
            <TooltipBody
              text={text}
              pos={pos}
              variant={variant}
              ref={this.tooltipRef}
              maxWidth={maxWidth}
              noWrap={noWrap}
              inlineText={text}
            />
          </Portal>
        )}
      </span>
    ) : children
  }
}

Tooltip.defaultProps = {
  variant: 'vertical',
  parentId: '',
  text: {},
  maxWidth: 150,
  noWrap: false,
  children: null
}

Tooltip.propTypes = {
  children: PropTypes.node,
  text: PropTypes.node,
  variant: PropTypes.string,
  parentId: PropTypes.string,
  maxWidth: PropTypes.number,
  noWrap: PropTypes.bool
}

export default Tooltip
