import styled from 'styled-components'
import {
  colorCardinal
} from '@tds/core-colours'

export const TextEditable = styled.div`
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  letter-spacing: -0.6px;
  width: 563px !important;
  outline: none;
  &:focus {
    outline: none;
  }

  &:empty:before {
    content: attr(placeholder);
    color: ${colorCardinal} !important;
    opacity: 0.85;
  }

  :empty:focus:before {
    content: "";
  }
  & > div {
    letter-spacing: -0.6px;
  }
`
export const TextEditableWrapper = styled.div`
 width: auto;
`
