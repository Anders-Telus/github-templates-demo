import styled from 'styled-components'

export const Wrapper = styled.div`
display: inline-block;
position: relative;
cursor: pointer;
`
export const TextWrapper = styled.div`
  display:${props => (props.displayBlock ? 'inline' : 'inline-block')};
`
export const ClipToCopyContainer = styled.div`
  position:absolute;
  right:0;
  top:0;
  width:1rem;
  height:1rem;
  display:inline;
  margin-left: 5px;
  cursor: pointer;
  display: inline-block !important;
  div {
    cursor: pointer;
  }
`
export const ClipToCopyWrapper = styled.div`
  display: ${props => (props.isInvisible ? 'none' : 'inline')}; 
  position:relative;
  top: ${({ top = 0 }) => (`${top}px`)};
`
export const Tooltip = styled.div`
position: relative;
display: inline-block;
`
export const TooltipLabel = styled.div`
bottom: ${props => (props.textPosition === 'top' ? '1.5625rem' : 'auto')};
width: 3.75rem;
background-color: #2a2c2e;
color: #ffffff;
text-align: center;
border-radius: 3px;
position: absolute;
font-size: 0.8125rem;
padding:6px 8px;
font-weight: 400;
line-height: 1.21875rem;
font-family: TELUS-Web,"Helvetica Neue",Helvetica, Arial, sans-serif;
`
