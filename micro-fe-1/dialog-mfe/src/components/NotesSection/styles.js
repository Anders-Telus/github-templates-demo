import styled from 'styled-components'

export const Link = styled.a`
  color: #2A2C2E !important;
  text-decoration: underline;
  font-size: 14px;
  float: right;
`

export const NotesHeader = styled.span`
  color: #4B286D;
  word-wrap: break-word;
  font-size: 16px;
  letter-spacing: -0.6px;
  line-height: 20px;
  font-weight: 700;
  display: flex;
  cursor: pointer;
`

export const NoteVioletBox = styled.span`
  padding: 0rem 0.5rem 0rem 0rem;
  font-weight: bold;
  font-size: 14px;
  color: #4B286D;
  font-style: normal;
  letter-spacing: -0.6px;
  text-align: left;
  line-height: 24px;
`

export const NoteGreyBox = styled.span`
  padding: 0rem 0.5rem 0rem 0rem;
  font-size: 14px;
  font-style: normal;
  letter-spacing: -0.6px;
  text-align: left;
  line-height: 24px;
  font-weight: 500;
  color: #2A2C2E;
`

export const EllipsesText = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  background: white;
`

export const NoteInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TextBox = styled.div`
  padding-left: ${props => props.padLeft};
  padding-right: ${props => props.padRight};
  padding-top: ${props => props.padTop};
  padding-bottom: ${props => props.padBottom};
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const RefreshButton = styled.span`
  margin-bottom: -10px;
`
export const SkeletonStyle = styled.div` 
  margin-top: 1rem;
  padding: 0.666rem;
`
export const NotificationIcon = styled.span`
  position: absolute;
  margin-right: 30px;
  height: 50px;
  padding-top: 15px;
`
export const NotificationText = styled.span`
  margin-left: 30px;
  height: 50px;
  width: 240px;
  color: #2A2C2E;
  font-size: 14px;
  letter-spacing: 0.6px;
  line-height: 20px;
  padding-top: 15px;
`
export const WrapperContent = styled.div`
  overflow: hidden;
`
export const UserText = styled.div`
  font-size: 14px; 
  line-height: 20px;
  color: #54595F;  
  white-space: nowrap;
  font-weight: 500;
`
export const DateWrapper = styled.div`
  font-size: 14px; 
  line-height: 20px;
  color: #4B286D;
  white-space: nowrap;
  font-weight: 500;
`
export const BanText = styled.div`
  font-size: 14px; 
  line-height: 20px;
  color: #54595F;
  white-space: nowrap;
  font-weight: 500;
`
export const BanContainer = styled.div`
  display: flex; 
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 4px;
`
export const NotesWrapper = styled.div`
  height: ${props => (props.height)};
`

export const NotesContainer = styled.div`
  margin-right: 3px;
`
export const IconContainer = styled.span`
  padding-right: ${props => (props.right ? props.right : '10px')};
  margin-top: 3px;
`

export const NoteContainer = styled.div`
  padding-right: 2px;
  padding-left: 2px;
`

export const NoteHeaderWrapperView = styled.div`
  display; flex;
  flex-direction; row;
  width: 100%;
`

export const NoteHeaderWrapper = styled.span`
  padding-bottom: 5px;
  padding-left: ${props => (props.left || 'unset')};
  margin-top: ${props => (props.isViewAll ? '-2px' : '')};
  color: rgb(75, 40, 109);
  font-weight: 700;
  width: ${props => (props.width || 'auto')};
`
export const NoteWrapper = styled.div`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #2A2C2E;
  padding: 15px 27px 30px 30px;
  font-family: TELUS-Web, “Helvetica Neue”, regular, sans-serif;
  margin-top: 
`

export const PopupContainer = styled.div`
  position: fixed;
  font-family: TELUS-Web, “Helvetica Neue”, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  display:flex;
  flex-direction:column;
  width: ${props => (props.minimized ? '31% !important' : '956px')};
  bottom: ${props => (props.minimized ? '0px' : 'auto')};
  @media (min-width:1680px) and (min-height:768px) {
    width: ${props => (props.minimized ? '31% !important' : '988px')};
  }
  @media (min-width:1366px) and (min-height:768px) {
    width: ${props => (props.minimized ? '31% !important' : '988px')};
  }
  @media (min-width:1366px) and (min-height:657px) {
    width: ${props => (props.minimized ? '31% !important' : '988px')};
  }
`

export const NoteIconContainer = styled.div`
  display: inline-flex;
  width: ${props => (props.width || 'auto')};
`

export const NoteHeaderText = styled.div`
  color: rgb(75, 40, 109);
  width: auto;
  overflow: hidden;
  white-space: nowrap;
`
