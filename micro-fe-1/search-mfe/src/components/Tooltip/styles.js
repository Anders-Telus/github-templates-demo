import styled from 'styled-components'

const arrowPadding = 5
const arrowSize = 5
export const Arrow = styled.span`
  display: table;
  
  ${props => props.dir === 'above' && `
  transform: translateX(${props.x - arrowSize}px);
  padding-bottom: ${arrowPadding}px;
  border-top: ${arrowSize}px solid #2A2C2E;
  border-left: ${arrowSize}px solid transparent;
  border-right: ${arrowSize}px solid transparent;`
}

  ${props => props.dir === 'below' && `
  transform: translateX(${props.x - arrowSize}px);
  padding-top: ${arrowPadding}px;
  border-bottom: ${arrowSize}px solid #2A2C2E;
  border-left: ${arrowSize}px solid transparent;
  border-right: ${arrowSize}px solid transparent;`
}

  ${props => props.dir === 'left' && `
  transform: translateY(${props.y - arrowSize}px);
  padding-right: ${arrowPadding}px;
  border-left: ${arrowSize}px solid #2A2C2E;
  border-top: ${arrowSize}px solid transparent;
  border-bottom: ${arrowSize}px solid transparent;`
}

  ${props => props.dir === 'right' && `
  transform: translateY(${props.y - arrowSize}px);
  padding-left: ${arrowPadding}px;
  border-right: ${arrowSize}px solid #2A2C2E;
  border-top: ${arrowSize}px solid transparent;
  border-bottom: ${arrowSize}px solid transparent;`
}
`
export const Label = styled.div`
  padding: 6px 8px;
  color: #fff;
  font-size: small;
  background-color: #2A2C2E;
  border-radius: 3px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  max-width: ${props => (props.inlineText === 'inline' ? 'max-content' : `${props.maxWidth}px`)};
  ${props => (props.noWrap && 'white-space: nowrap;')}
`

export const TooltipContainer = styled.div`
  position: fixed;
  z-index: 200;
  display: ${props => (props.variant === 'vertical' ? 'inline-block' : 'flex')};
  right: ${props => props.pos.right && `${props.pos.right}px`};
  left: ${props => props.pos.left && `${props.pos.left}px`};
  top: ${props => props.pos.top && `${props.pos.top}px`};
  bottom: ${props => props.pos.bottom && `${props.pos.bottom}px`};
  opacity: 1;
  transition: opacity 250ms linear;
  animation: fadein 250ms;
  @keyframes fadein {
    from { opacity: 0; } to { opacity: 1; }
  }
`
