import styled from 'styled-components'
import { colorTelusPurple } from '@tds/core-colours'
import { CasaBox } from '../Styled'

export const ChevronIconCss = {
  paddingTop: '50px',
  position: 'absolute',
  paddingLeft: '29px',
  display: 'inline-block'
}

export const HeaderCss = {
  background: '#FFF',
  padding: '0px',
  marginTop: '0px'
}

export const Link = styled.div`
  display: inline-block;
  text-decoration: underline;
  color: ${colorTelusPurple};
  cursor: pointer;
`

export const TabsContainer = styled.div`
  box-shadow: inset 0px -2px 0px #dcdcdc;
  margin-bottom: 0px;
  display: block;
  margin-left: 20px;
  margin-right: 16px;
`

export const TabText = styled.span`
  height: 20px;
  width: auto;
  color: ${props => (props.activeTab ? '#4D2B6F' : '#2A2C2E')};
  letter-spacing: 0.29px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 20px;
`
export const FifaIconContainer = styled.div`
  margin-top: -5px;
`
export const Header = styled.div`
  padding: 10px 0;
  margin: 10px 0 0 0;
  background-color: #F7F7F8;
`
const statusColor = {
  r: '#D8D8D8', // reserved
  a: '#66CC00', // active
  m: '#D8D8D8', // moved
  s: '#F0A944', // suspended
  c: '#D8D8D8' //  cancelled
}

const textColor = {
  r: '#71757B', // reserved
  a: '#fff', // active
  m: '#71757B', // moved
  s: '#79531E', // suspended
  c: '#71757B' // cancelled
}

export const TabItem = styled.li`
  display: inline-block;
  cursor: pointer;
  padding: 8px 12px 8px 16px;
  border-bottom: ${props => (props.activeTab ? '3px solid #4b286d' : '3px #54595F')};
  width: ${props => props.width};
  text-align: center;
  font-size: 1rem;
  & > span:nth-child(1) {
    color: ${props => (props.activeTab ? '#4D2B6F' : '#2A2C2E')};
    margin-right: 5px;
  }
`

export const ProductStatus = styled.span`
  border-radius: 8px;
  background-color: ${props => (statusColor[props.type])};
  color: ${props => (textColor[props.type])};
  padding: 0px 10px 1px 10px;
  margin-right: 10px;
  display: inline;
  font-size: 14px;
  font-weight: 500;
  margin-left: 5px;
`

export const UserName = styled.div`
  color: #2a2c2e;
  word-wrap: break-word;
  font-size: 0.875rem;
  letter-spacing: -0.6px;
  line-height: 1.42857;
  font-weight: 500;
  text-transform: capitalize;
`

export const GreyLabel = styled.span`
  display: inline;
  font-size: 14px;
  color: rgb(121, 121, 121);
  font-weight: 600;
  margin-right: 5px;
`

export const ProductHeader = styled.div`
  display: flex;
  align-items: center;
  & > span:nth-child(1) {
    margin-top: 0px;
    max-width: 289px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const TabDataContainer = styled.div`
  margin-bottom: 2rem;
  margin-top: -1.2rem;
`

export const NotificationIcon = styled.span`
  margin: 5px 0px 0px 5px;
`

export const LocationIconContainer = styled.span`
  display: flex;
`
export const ServiceLableText = styled.span`
  display: flex;
  font-size: 14px;
  color: rgb(121, 121, 121);
  font-weight: 700;
  margin-left: 5px;
  margin-right: 10px;
  margin-top: -2px;
`
export const AddressTextContainer = styled.span`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  margin-top: -2px;
`

export const CostWrapper = styled.div`
  display: flex;
  height: 25px;
  & > span:nth-child(1) {
    margin-top: -5px;
  }
`

export const CostIcon = styled.span`
  display: flex;
  transform: rotate(270deg);
  margin-bottom: 14px;
`

// To be refactor later
export const ProductStatusWrapper = styled.span`
  width: 77px;
  border-radius: 12px;
  background-color: #D8D8D8;
  color: #71757B;
  padding: 3px 10px;
  font-size: 12px;
  margin-left: 10px;
  vertical-align: super;
  text-align: center;
`

export const SkeletonStyle = styled.div`
  margin-top: ${props => (props.isFetching ? '-5px' : '0px')};
`
export const CostContainer = styled(CasaBox)`
  & > div:nth-child(1) {
    margin-top: 0px;
    min-width: 111px;
  }
`

export const SummaryHeaderContainer = styled.div`
  margin-left: -2px;
  margin-top: -6px;
  @media (min-width: 1366px) {
    margin-left: -4px;
  }
  @media (min-width: 1440px) {
    margin-left: -8px;
  }
  @media (min-width: 1680px) {
    margin-left: -16px;
  }
  @media (min-width: 1792px) {
    margin-left: -24px;
  }
`

export const IconContainer = styled.div`
  position: absolute;
  margin-top: ${props => (props.fifaFibreIndicator && !props.isErrorFQ ? '-4px' : '0px')};
`
