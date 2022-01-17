import styled from 'styled-components'
import { colorTelusPurple, colorAccessibleGreen } from '@tds/core-colours'

export const HeaderWrapper = styled.div`
  display: block;
  overflow: ${props => (props.headerHoverDisplay ? 'auto' : 'hidden')};
  padding: 1rem 2rem  0rem 2rem;
  padding: ${props => (props.headerHoverDisplay ? '0rem 1rem 0rem 0rem' : '0rem 1.8rem 0rem 0rem')};
`

export const HeaderLeft = styled.div`
  float:left;
  width:95%;
  padding: ${props => (props.minimized ? '0.5rem 0rem 0.5rem 1rem' : '1rem 0rem 1rem 1rem')};
  cursor: ${props => (!props.minimized && props.isDraggable ? 'grab' : 'pointer')};
`

export const HeaderRight = styled.div`
  float:right;
  width:calc(5% - 1rem);
  padding-top: ${props => (props.minimized || !props.headerHoverDisplay ? '0.5rem' : '1rem')};
`

export const Header = styled.div`
  cursor: ${props => (!props.minimized && props.isDraggable ? 'grab' : 'pointer')};
  width:100%;
  background:white;
  padding: 0;
  border-radius: 11px 11px 11px 11px;
  top:0;
  z-index:999;
  &:active {
    cursor: ${props => (!props.minimized && props.isDraggable ? 'grab' : 'pointer')}; 
  }
`
export const Popup = styled.div`
  border-radius: 11px;
  display: block;
  text-align: left;
  box-shadow: 0px 0px 11px 1px grey;
  background-color: white;
`

export const GreenBox = styled.div`
  display: inline-block;
  color: ${colorAccessibleGreen};
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
export const CloseBtnContainer = styled.div`
  cursor: pointer;
  width: 16px;
  height: 16px;
  &:hover { transform: scale(1.2); }
  transition: transform 150ms ease-in-out;
  visibility: ${props => (props.showCloseIcon ? '' : 'hidden')}
`

export const MinimizeContainer = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 1rem;
  cursor: pointer;
  &:hover { transform: scale(1.4); }
  transition: transform 150ms ease-in-out;
`

export const MaximizeContainer = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  display: inline-block;
  cursor: pointer
`
export const CancelButton = styled.div`
  margin-top: 1em;
  padding: 0.5em 1.5em;
  display: inline-block;
  text-decoration: underline;
  color: ${colorTelusPurple};
  cursor: pointer;
  float: right;
  `
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  `

export const HrDividerContainer = styled.div`
  margin-left: 1rem;
  z-index: 4;
`
