import styled from 'styled-components'

export const Tablist = styled.ul`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')} ;
  white-space: nowrap;
  background-color: ${props => props.backgroundColor};
  display: ${props => (props.display === 'flex' ? 'flex !important' : 'auto')}
`

export const TablistItem = styled.li`
  display: inline-flex;
  justify-content: center;
  border-bottom: ${({ isActive, isBorderBottom = true }) => {
    if (isActive) {
      return '3px solid #4b286d'
    }
    return isBorderBottom ? '1px solid #dcdcdc' : 'none'
  }};
  width: ${props => props.tabWidth};
  padding: ${props => props.tabPadding};
  min-height: ${props => props.minHeight};
  text-align: center;
  margin: ${props => props.margin}
`

export const LabelWrapper = styled.span`
  color: ${props => (props.highlight && props.isActive ? '#4B286D' : '#2a2c2e')};
  font-size: 12px !important;
  font-weight: ${props => (props.medium ? 700 : '')};
  font-weight: ${props => (props.regular ? 500 : '')};
  font-weight: ${props => (props.light ? 400 : '')};
  width: 100%;
  margin-left: ${props => props.marginLeft};
  & > div > span > span {
    display: ${({ isActive }) => (!isActive && 'none')};
  }
`
