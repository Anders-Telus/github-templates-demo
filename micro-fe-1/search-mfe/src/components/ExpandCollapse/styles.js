import styled from 'styled-components'

export const Heading = styled.div`
  padding: 10px;
  width:100%;
  cursor: ${({ isCursorPointer }) => `${isCursorPointer ? 'pointer' : 'auto'}`};
`

export const Content = styled.div`
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  opacity: ${props => (props.open ? '1' : '0')};
  height: ${props => (props.open ? '100%' : '0')};
  transform: translateY(0.6em);
  transition: all 0.3s ease-in-out 0s;
  padding-bottom: 0px;
`

export const StyledHeading = styled.div`
  cursor: ${({ disabled }) => (!disabled && 'pointer')};
  background: ${({ headerCSS }) => headerCSS.background};
  padding: ${({ headerCSS }) => headerCSS.padding};
  margin-top: ${({ headerCSS }) => headerCSS.marginTop};
  margin-bottom: ${({ headerCSS }) => headerCSS.marginBottom};
  display: flex;
  border-radius: ${({ borderRadius }) => `${borderRadius ? '0' : '0'}`};
  border-bottom: ${({ isKoodo }) => (isKoodo ? 'none' : 'none')};
  border-left: ${({ isKoodo }) => (isKoodo ? '5px solid #39CDC9' : 'none')};
  border-right: ${({ isKoodo }) => (isKoodo ? '5px solid #39CDC9' : 'none')};

`

export const StyledIcon = styled.span`
  color: rgb(36, 135, 0);
  cursor: pointer;
  padding-top: ${({ iconCSS }) => iconCSS.paddingTop};
  position: ${({ iconCSS }) => iconCSS.position};
  padding-left: ${({ iconCSS }) => iconCSS.paddingLeft};
  margin: ${({ iconCSS }) => iconCSS.margin};

`
export const ExpandCollapseContainer = styled.div`
`
