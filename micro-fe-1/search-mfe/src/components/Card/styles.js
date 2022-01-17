import styled from 'styled-components'

export const Container = styled.div`
  margin: ${props => props.margin}px;
  height: ${props => props.height}px;
  overflow: hidden;
`
export const CardWrapper = styled.div`
  margin: ${props => props.margin}px;

`
export const CardHeader = styled.div`
  height: 40px;
  background-color: #F7F7F8;
  padding: 5px 12px;
  border-radius: 4px;
`
export const CardHeaderExpand = styled.div`
  background-color: #F7F7F8;
  padding: 0;
  height: 20px;
  border-radius: 3px !important;
  margin-left: -9px;
`
export const CardBody = styled.div`
  padding: 4px 0;
`
export const ChildrenWrapper = styled.div`
  border-left: 5px solid red;
`
