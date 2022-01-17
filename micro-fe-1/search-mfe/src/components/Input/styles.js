import styled from 'styled-components'

const getBorderColor = (isError, errField, id, disabled) => {
  let bcValue = ''
  if (isError && (errField === id)) {
    bcValue = '#C12335'
  } else if (disabled) {
    bcValue = 'transparent'
  } else {
    bcValue = '#54595f'
  }
  return bcValue
}

export const StyledInput = styled.input`
  position: relative;
  width: ${({ width }) => (width || '100%')};
  border-color: ${props => getBorderColor(props.isError, props.errField, props.id, props.disabled)};
  background-color:  ${({ disabled }) => (disabled ? '#f7f7f8' : '')};
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  font-size: ${({ fontSize }) => (fontSize || '1rem')};
  letter-spacing: 0;
  line-height: 14px;
  font-weight: 400;
  color: #2a2c2e;
  height: ${({ height }) => (height || '41px')};
  padding: 8px ${({ paddingRight }) => (paddingRight || '42px')} 8px 9px;
  z-index: 1;
  margin-top: 3px;
  &:focus {
    outline: none;
    border-color: ${({ isError, errField, id }) => (isError && (errField === id) ? '#C12335' : 'transparent')};
    box-shadow: ${({ isError, errField, id }) => (isError && (errField === id) ? 'none' : '0 0 4px 1px rgba(0,0,0,0.5)')};
    background-color: #fff;
  };
  ${props => props.style};
`
export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 11px !important;
`

export const StyledLabel = styled.div`
  color: #2a2c2e;
  word-wrap: break-word;
  font-size: 1rem;
  font-weight: 700;
`
export const StyledErrorMsg = styled.div`
  height: 1.25rem;
  color: #2A2C2E;
  font-size: 0.813rem;
  line-height: 1.25rem;
  font-weight: 500;
`
export const IconWrapper = styled.i`
  ${({ isError, isFieldErr }) => (isError && isFieldErr ? 'pointer-events: none' : 'cursor: pointer')};
  position: absolute;
  top: ${({ isError, top }) => top || (isError ? '5.5em' : '1.6em')};
  right: 0.1em;
  margin-right: 0.5em;
  max-height: 2em;
  opacity: 1;
  z-index: 2;
`
