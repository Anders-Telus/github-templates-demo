import styled from 'styled-components'

export const RefreshButtonWrapper = styled.span`
  margin: 0.313rem 0.313rem 0rem 0rem;
`
export const RefreshButton = styled.button`
  border: none;
  outline:none;
  height: auto;
  width: auto;
  background: transparent;
  opacity: ${props => (props.disabled ? 0.65 : 'unset')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')}
`
export const RefreshingSpan = styled.span`
  height: 1.063rem;
  width: 5.313rem;
  color: #4B286D;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.063rem;
  text-align: center;
  margin: 0.5rem 0.313rem 0.313rem 0.313rem;
`
export const RefreshFailed = styled.span`
  height: 1.063rem;
  color: #4B286D;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.063rem;
  text-align: center;
  margin: 0.5rem 0.313rem 0.313rem 0.313rem;
`
export const ShowDetailsMessage = styled.span`
  height: 1.25rem;
  font-family: TELUS-Web, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.038rem;
  line-height: 1.25rem;
  margin-top: 1rem;
  text-align: left;
  padding-right: ${props => (props.iconWithErrMessage ? '1rem' : '')};
`
export const NotificationIcon = styled.span`
  cursor: pointer;
  margin: 0.5rem 0.313rem 0rem 0rem;
  margin: ${props => (props.iconWithErrMessage ? '1rem 1.25rem 1.25rem 1rem' : '')};
  float: ${props => (props.iconWithErrMessage ? 'left' : 'none')};
`
export const ViwDetailsText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  height: 1.25rem;
  color: #4B286D;
  font-family: TELUS-Web, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.038rem;
  line-height: 1.25rem;
`
export const ErrMessageBox = styled.span`
  background-color: ${props => (props.showHidePopupMenu ? '' : '#FFF9EE')};
  height: 3.25rem;
  width: fit-content; 
  margin: -0.313rem 0rem -0.313rem 0rem;
  display: inline-flex;
  padding-right: ${props => (props.showHidePopupMenu ? '#1rem' : '')};
  & > span:first-child  {
    margin-top: 1rem;
  }
`
export const Subheading = styled.div`
  height: 3rem;
  width: 24.688rem;
  color: #2A2C2E;
  font-size: 0.875rem;
  font-family: TELUS-Web, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: 0.038rem;
  line-height: 1rem;
  text-align: left;
`
export const NotificationsListWrapper = styled.div`
  height: 12.188rem;
  & > div:first-child  {
    overflow: scroll;
    height: 100%;
    @media (min-width:1280px) and (max-width:1380px) and (min-height:768px) and (max-height:1024px) {
      max-height: 27vw;
    }
    @media (min-width:1381px) {
      max-height: 21vw;
    }
  }
`
export const NotificationList = styled.ul`
  user-select: text;
  white-space: initial;
  margin: 0;
  padding :0;
  height:100%;
`
export const NotificationListItem = styled.li`
  float: left; 
  display: inline-flex;
  color: #2A2C2E;
  font-size: 0.875rem;
  font-family: TELUS-Web, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 400;
  letter-spacing: 0.038rem;
  text-align: left;
  list-style-type: disc;
  margin-bottom: 0.313rem;
`
export const CloseButtonWrapper = styled.div`
  display: block;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  cursor: pointer;
  text-align: right;
`
export const ChevronLinkWrapper = styled.div`
  display: block;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-top: 0.3rem;
  padding-bottom: 0.5rem;
  cursor: pointer; 
  text-align: left;
`
