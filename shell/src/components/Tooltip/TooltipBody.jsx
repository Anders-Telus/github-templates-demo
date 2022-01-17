import React from 'react'
import PropTypes from 'prop-types'
import { Arrow, Label, TooltipContainer } from './styles'

const TooltipBody = React.forwardRef((props, ref) => {
  const {
    text, pos, variant, maxWidth, inlineText, noWrap
  } = props

  const tooltipBody = [
    <Arrow dir={pos.type} x={pos.arrowX} y={pos.arrowY} key={`tooltip_arrow_${pos.type}`} />,
    <Label key='tooltip_label' inlineText={inlineText} maxWidth={maxWidth} noWrap={noWrap}>{text}</Label>
  ]

  return (
    <TooltipContainer pos={pos} ref={ref} variant={variant}>
      {pos.type === 'below' || pos.type === 'right' ? tooltipBody : tooltipBody.reverse()}
    </TooltipContainer>
  )
})
TooltipBody.defaultProps = {
  inlineText: ''
}
TooltipBody.propTypes = {
  text: PropTypes.node.isRequired,
  pos: PropTypes.object.isRequired,
  variant: PropTypes.string.isRequired,
  maxWidth: PropTypes.number.isRequired,
  inlineText: PropTypes.string,
  noWrap: PropTypes.bool.isRequired
}

TooltipBody.displayName = 'TooltipBody'

export default TooltipBody
