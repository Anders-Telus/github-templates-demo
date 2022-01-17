import styled from 'styled-components'
import DecorativeIcon from '@tds/core-decorative-icon'
import { colorTelusPurple, colorGainsboro } from '@tds/core-colours'

export const Container = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  background-color: ${colorTelusPurple};
  min-height: 42px;
`

export const TabItem = styled.button`
  display: inline-block;
  padding: 2px 12px 6px 12px;
  border: none;
  border-radius: 2px 2px 0 0;
  margin-right: 10px;
  outline: none;
  background: ${({ isSelected }) => `${isSelected ? 'white' : colorGainsboro}`};
  &:first-of-type {
    margin-left: 25px;
  }
`

export const CloseIcon = styled.span`
  cursor: pointer;
  margin-left: 16px;
  font-size: 16px;
  
  i {
    font-size: 16px;
  }
`

export const Icon = styled(DecorativeIcon)`
`

export const TabName = styled.span`
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
`
export const Image = styled.img`
  cursor: pointer;
`
