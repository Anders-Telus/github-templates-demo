import styled from 'styled-components'
import { colorTelusPurple } from '@tds/core-colours'
import { CounterBadge } from '../Styled'

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const ListContainer = styled.div`
  margin-right: 3px;
`

export const ListItemWrapper = styled.div`
  height: ${props => (props.height)};
`

export const IconContainer = styled.div`
  position: absolute;
  top: 0;
`

export const Label = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #54595F;
  opacity: 0;
  text-align: center;
  transition: opacity 0.25s ease-out 0s;
`

export const FilterContainer = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  width: 75px;
  height: 25px;
  border: ${props => (props.selected ? '1px none #4B286D' : '1px solid #4B286D')};
  border-radius: 4px;
  overflow: hidden;
  margin: 1em 0.25em 0;
  background-color: ${props => (props.selected ? '#4B286D' : '#FFFFFF')};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover + ${Label} { 
    transition: opacity 0.25s ease-in 1s;
    opacity: 1;
  };
`

export const FilterListContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const ArrowIcon = styled.span`
  cursor: pointer;
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: ${props => (props.up ? '5px solid #979797' : '0px')};
  border-top: ${props => (!props.up ? '5px solid #979797' : '0px')};
  color: gray;
`

export const NoRecordContainer = styled.div`
  font-style: italic; 
  padding:2.5rem 0.75rem 0.15rem 0.75rem;;
  font-size:0.875rem;
  line-height:0.875rem;
  font-weight: 500;
`

export const DateWrapper = styled.span`
font-weight: ${({ bold }) => (bold ? '700' : '500')};
color: ${({ type }) => {
    if (type === 'negative') {
      return '#E01E1E'
    } if (type === 'fade') {
      return '#71757B'
    }
    return '#302D2B'
  }};
font-size: 12px;
letter-spacing: 0.25px;
`

export const IconWrapper = styled.div`
  margin: 1.25em 1em 0 0 !important;
`

export const Link = styled.div`
  display: inline-block;
  text-decoration: underline;
  color: ${colorTelusPurple};
  cursor: pointer
`

export const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > ${CounterBadge} { margin-left: 0.25em; };
  & > ${ArrowIcon} { margin-left: 0.25em; };
`
export const WrapperContent = styled.div`
  overflow: hidden;
`
