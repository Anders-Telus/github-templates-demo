import styled from 'styled-components'

const arrowSize = 14 // px
export const ArrowBody = styled.span`
  display: table;
  position: relative;
  z-index: 20;
  transform: translate(${props => (props.x - arrowSize)}px, 1px);
  padding-top: 5px;
  border-left: ${arrowSize}px solid transparent;
  border-right: ${arrowSize}px solid transparent;
  border-bottom: ${arrowSize}px solid ${({ hasHeader }) => (hasHeader ? '#F7F7F8' : '#FFF')};
`

const arrowBorderSize = 16 // px
export const ArrowBorder = styled.span`
  display: table;
  position: relative;
  z-index: 10;
  transform: translate(${props => (props.x - arrowBorderSize)}px, -15px);
  border-bottom: ${arrowBorderSize}px solid #D8D8D8;
  border-left: ${arrowBorderSize}px solid transparent;
  border-right: ${arrowBorderSize}px solid transparent;
`

export const MenuContainer = styled.div`
  background-color: #fff;
  padding: ${({ hasHeader, hasFooter }) => (hasHeader || hasFooter ? '0' : '5px')} 0;
  border: 1px solid #D8D8D8;
  font-size: 14px;
  width: ${({ width }) => width};
  border-radius: 4px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  transform: translateY(${({ addArrow }) => (addArrow ? `${-arrowBorderSize}` : `${5}`)}px);
  height: ${({ height }) => height};
`

export const MenuItem = styled.div`
  font-weight: 500;
  line-height: 1.75em;
  border-bottom: 1px solid #D8D8D8;
  overflow-wrap: break-word;
  padding: 0.15em 1em;
  text-align: ${({ align }) => (align)};
  user-select: none;
  ${({ isEnabled, isClickable }) => (isEnabled && isClickable &&
    (`
      cursor: ${isClickable ? 'pointer' : 'default'}
      ${isClickable && '&:hover { background-color: #D8D8D8; }'}
    `)
  )}
  ${({ isEnabled }) => (!isEnabled && 'color: #D8D8D8;')}
`

export const MenuHeader = styled.div`
  font-weight: 700;
  line-height: 1.75em;
  overflow-wrap: break-word;
  padding: 0.5em 1em;
  text-align: start;
  user-select: none;
  background-color: #F7F7F8;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`

export const MenuFooter = styled.div`
  font-weight: 700;
  line-height: 1.75em;
  overflow-wrap: break-word;
  padding: 0.5em 1.6em;
  text-align: start;
  user-select: none;
  background-color: #F7F7F8;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  cursor: pointer;
`

export const PopupContainer = styled.div`
  z-index: 100;
  position: absolute;
  ${(props) => {
    const { left, top, manual } = props.pos
    return (manual && manual.length
      ? `transform: translate(${manual[0]}px, ${manual[1]}px);`
      : `
        top: ${top && `${top}px`};
        left: ${left && `${left}px`};
      `)
  }}
`
