import styled from 'styled-components'

const status = {
  open: '#66CC00',
  suspended: '#FACA69',
  tentative: '#54595F',
  closed: '#D8D8D8',
  cancelled: '#D8D8D8',
  ceased: '#D8D8D8',
  treatmentIndicator: '#C12335'
}

const textColor = {
  open: '#fff',
  suspended: '#8c5415',
  tentative: '#fff',
  closed: '#71757B',
  cancelled: '#71757B',
  ceased: '#71757B',
  treatmentIndicator: '#fff'
}

export const BanStatus = styled.span`
  width: 77px;
  border-radius: 12px;
  background-color: ${props => status[props.type]};
  color: ${props => textColor[props.type]};
  padding: 3px 10px;
  font-size: 12px;
  margin-left: 10px;
  vertical-align: super;
`

export const Link = styled.a`
  cursor: pointer;
  color: #4B286D !important;
  text-decoration: underline;
  word-spacing: -1px;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
`

export const BanSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-left: -24px;
  & > span:nth-child(2)  {
    margin-top: 8px;
  }
`

export const Wrapper = styled.span`

`

export const Label = styled.span`
  opacity: 1;
  vertical-align: baseline;
  font: inherit;
  height: 17px;
  color: #4B286D; 
  font-size: 0.875rem;      
  font-weight: 400;
  letter-spacing: 0;
  line-height: 17px;
  margin-right: 5px; 
  text-align: right; 
  margin-top: -9px;
  margin-left: 5px;    
`

export const LoaderContainer = styled.div`
  text-align: center;
  background: #F7F7F8;
  padding: 18px 10px;
  margin-top: 20px;
  border-radius: 5px;
`

export const PrepaidWrapper = styled.div`
  margin: 0.5rem 0rem 0rem -0.8rem;
`
export const NotificationIcon = styled.span`
  margin: 5px 0px 0px 20px;
`
export const NoteIconContainer = styled.span`
  margin: 2px 0px 0px -20px;
`
export const RefreshButton = styled.div`
  float: right;
  transform: translateX(0.7rem);
`
export const BillingAddressWrapper = styled.span`
 color: rgb(42, 44, 46);
 overflow-wrap: break-word;
 font-size: 0.875rem;
 letter-spacing: -0.6px;
 line-height: 1.42857;
 font-weight: 500;
 margin-left: -5px;
`
export const Align = styled.span`
  margin-left: 4px;
  font-size: 24px;
  font-weight: 400;
  color: #4B286D;
`
export const AccountSummaryGrid = styled.span`
  margin: -14px 0 0 -22px;
  margin-bottom: ${({ mb }) => (mb)}
`
export const CardBox = styled.span`
  margin-top: 10px;
`
export const BankIcon = styled.span`
  vertical-align: middle;
`
export const KoodoContainer = styled.span`
  position: absolute;
  right: 10px;
  top: 35px;
`
export const AcDateBanStatus = styled.span`
  margin-left: -6px;
  height: 75px;
  width: 100%;
`
export const DataContainerSection = styled.div`
  margin-top: 0;
  padding-bottom: 8px;
`
export const CurrentBalanceText = styled.div`
  display: flex;
  color: #2A2C2E;
`
export const CurrentCurrencySymbolEn = styled.div`
  font-size: 16px;
  padding-right: 2px;
  padding-top: 6px;
`
export const CurrentCurrencySymbol = styled.div`
  font-size: 16px;
  padding-left: 5px;
  padding-top: 7px;
`
export const CurrentCurrencyValue = styled.div`
  font-size: 20px;
  line-height: 36px;
`
export const LastBalanceWrapper = styled.div`
  display: flex;
  color: #4D2B6F;
`
export const LastBalanceSymbolEn = styled.div`
  font-size: 16px;
  padding-right: 4px;
  padding-top: 7px;
`
export const LastBalanceSymbol = styled.div`
  font-size: 16px;
  padding-left: 5px;
  padding-top: 7px;
`
export const LastBalanceValue = styled.div`
  font-size: 20px;
  line-height: 36px;
`
export const ExplicitCreditClass = styled.div`
  font-weight: 900;
`
export const LetterContainer = styled.div`
  color: #C12335;
  position: absolute;
  top: 67px;
  left: ${props => ((props.lang === 'en') ? '85px' : '6.81rem')};
  font-weight: 900;
  font-family: sans-serif;
`
export const CreditVal = styled.div`
  font-size: 14px;
  font-family: sans-sarif,
  font-weight: 900;
`
export const AddText = styled.span`
  font-size: 14px;
  color: #4D2B6F;
  margin-top: 4px;
  cursor: pointer;
  font-weight: 500;
  display: inline-block;
`

export const AddTasksContainer = styled.div`
  display: flex;
  float: right;
  height: 32px;
  position: relative;
  padding-right: 15px;
`

export const AddNotesContainer = styled.div`
  display: flex;
  float: right;
  height: 32px;
  position: relative;
  width: 64px;
  padding-right: 8px;
`

export const IconWrapper = styled.div`
min-height: 27px;
min-width: 27px;
align-items: center;
text-align: center;
margin: auto;
margin-bottom: 0;
`
