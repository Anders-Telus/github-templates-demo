import styled from 'styled-components'

export const Box = styled.div`
  height: 85vh;
  width: 100vw;
`
export const BoxContainer = styled.div`
  display: inline-flex;
  height: 85vh;
`

export const LabelContainer = styled.small`
  position: relative;
  left: 8px;
  bottom: 5px;
  font-size: 12px !important
`

export const HairlineContainer = styled.div`
  position: relative;
`

export const IconWrapper = styled.span`
  position: relative;
  top: 3px;
`
export const OpenStatusIcon = styled.div`
  height: 8px;
  width: 8px;
  background-color: ${({ backgroundcolor }) => (backgroundcolor || '#2B8000')}};
  border-radius: 50%;
  display: inline-block;
  margin: ${({ margin }) => (margin || '0px 8px 2px 0px')}};
`
export const HollowStatusIcon = styled.div`
  height: 8px;
  width: 8px;
  border: 1px solid gray;
  border-radius: 50%;
  display: inline-block;
  margin: ${({ margin }) => (margin || '0px 8px 2px 0px')}};
`
