import styled from 'styled-components'

export const SelectCustomWrapper = styled.div`
  select {
    ${({ backgroundColor }) => backgroundColor && `background-color:${backgroundColor}`};
    color: #2A2C2E;
    padding: ${props => (props.borderProps ? '0rem 3rem 0rem 0rem' : '0rem 3rem 0rem 0.5rem')};
    border-radius: 4px;
    border-width: ${props => (props.borderProps ? '0' : '1')}px;
    border-style: ${props => (props.borderProps ? 'none' : 'solid')};
    border-color: ${props => (props.borderProps ? '#FFFFFF' : '#54595F')};
    border: ${props => (props.border ? '1px solid #FACA69' : 'auto')};
    outline: ${props => (props.borderProps ? 'none' : '0')};
    :focus {
      box-shadow: ${props => (props.borderProps ? 'none' : '0px 0px 11px 1px grey')};
      border: ${props => (props.border ? '1px solid #FACA69' : 'none')};
      ${({ backgroundColor }) => backgroundColor && `background-color:${backgroundColor}`};
    }
    height: ${props => (props.borderProps ? '1.6' : '2')}rem;
    min-height: ${props => (props.borderProps ? '1.6' : '2')}rem;
    max-height: ${props => (props.borderProps ? '1.6' : '2')}rem;
    font-size: 14px;
    font-weight: 500;
  }
  & i {
   color: ${props => (props.caretColor ? props.caretColor : '#2A2C2E')};
    height: 0.75rem;
    width: 0.75rem;
  }
  .sc-bxivhb {
    right: 0rem;
    padding-right: 0.5rem;
  }
  .hFcloT > *:not(:last-child) {
    margin-bottom: 0rem;
  }
  & > div > div {
    margin-bottom: 0px !important;
  }
`
export const MediumWeightText = styled.div`
  display: inline-block;
`
