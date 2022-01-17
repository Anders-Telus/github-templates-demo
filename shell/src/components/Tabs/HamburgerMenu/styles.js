import styled from 'styled-components'

export const BanList = styled.div`
  padding: 2px 0 2px 1.7rem;
  font-weight: 700;
  :hover {
    background-color:#eee;
  }
  cursor: pointer;
`
export const Modal = styled.div`
  position: absolute;
  background: #fff;
  padding: 10px 2px;
  line-height: 2em;
  z-index: 1;
  border: 1px solid #ccc;
  box-shadow: 1px 1px #ccc;
  display: ${({ isHamburgerMenuOpen }) => (isHamburgerMenuOpen ? 'inherit' : 'none')};
  font-size: 14px;
  width: 15%;
`
export const MenuLink = styled.button`
  border: 0px;
  padding: 0px;
  background: none;
  cursor: pointer;
`
