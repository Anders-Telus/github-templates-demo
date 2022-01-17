import styled from 'styled-components'

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
`

export const MenuHeader = styled.legend`
  text-align: left;
`

export const Wrapper = styled.div`
  padding-top: 5px;
`

export const Feedback = styled.a`
  padding-top: 5px;
  cursor: pointer; 
  text-decoration: none;
  color: inherit;
  &:hover { color: #4B286D; text-decoration: underline; }
`
