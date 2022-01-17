import styled from 'styled-components'
import {
  colorAccessibleGreen,
  colorTelusPurple,
  colorGreyShark
} from '@tds/core-colours'

export const CaseContainer = styled.div`
  display: inline-grid !important;
  padding-bottom: 1rem;
  font-weight: bold;
  width: 100%;
  & img {
    height: ${props => (props.height)}
  }
`

export const CaseCustomerDetail = styled.div`
  border-radius: 4px;
  text-align: left;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #D8D8D8;
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  line-height: 22px;
  color: #2A2C2E;
`
export const CustomerDetailRow = styled.div`
  display: flex;
  height: 26px;
`
export const DetailsColumn = styled.div`
  flex-grow:0;
  padding-top: ${props => (props.isEdit ? '0px' : '5px')};
  padding-right: ${props => (props.isEdit ? '0rem' : '.5rem')};
  & a {
    cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  }
  display:${props => (props.disabled ? 'none' : 'unset')};
  position: relative;
  width: 24px;
  height: 24px;
  & span {
    position: absolute;
  }
  & button {
    outline:none;
    border:none;
    padding-top: 0px;
    background-color: white;
    border-color: black;
    border-radius: 5px;
    cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
    border: ${props => ((!props.editable) ? '2px solid white' : `2px solid ${colorTelusPurple}`)};
  }
  & button:active {
    outline: none;

  }
  & svg {
    cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
    width: 16px;
    height: 16px;
    fill: #4b286d;
  }
`
export const SymbolColumn = styled.div`
  flex-grow:8;
  word-break: break-word;
  width: ${props => (props.width || 'unset')};
`
export const MessageIconColumn = styled.div`
  flex-grow:8;
  word-break: break-word;
  width: ${props => (props.width || 'unset')};
`

export const FooterContent = styled.div`
  background-color: white;
  height: ${props => (props.minimized ? '0vh !important' : 'auto !important')};
  border-radius: 11px;
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
export const CaseBody = styled.div`
  max-height: 70vh;
  min-height: 30rem;
  overflow-y: scroll;
  padding: 1rem;
  @media (min-width:1280px) and (max-width: 1365px) and (min-height:1024px) {
    min-height: 417px;
  }
   @media (min-width:1366px) and (min-height:657px) {
    min-height: 400px;
    max-height: 59vh;
  }
  @media (min-width: 1280px) and (min-height: 768px) {
    max-height: 67vh;
  }
  @media (min-width: 1280px) and (min-height: 1024px) {
    max-height: 74vh;
  }
  @media (min-width: 1366px) and (min-height: 768px) {
    max-height: 67vh;
  }
`

export const DropdownWrapper = styled.div`
  outline: none;
  outline: ${props => (props.disabled ? 'none' : '')};
  #case-complete-id {
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
  & svg {
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
  @media (min-width:1366px) and (max-width: 1379px) {
    margin-top: 0%;
  }
`

export const TaskButtonsWrapper = styled.div`
padding-right: ${props => (props.buttonType === 'cancel' ? '1rem' : '2rem')};
& > .styles__CustomButton-sc-1kvwca2-2 {
    padding: 7px 14px;
    width:100%;
  }
`

export const TaskSaveButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 5px;
  color: #D8D8D8;
  border: 2px solid #DADADA;
  padding: 4px 20px;
`

export const TimeIconWrapper = styled.button`
  margin-left: 10px;
`


export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.6px;
  padding: 0 1rem;
  border-radius: 5px;
  line-height: 1;
  height: 32px;
  cursor: pointer;
  word-wrap: break-word;
  color: #FFF;
  background: #2B8000;
  font-weight: 600;
  border: 0;
  outline: none;
  border: 1px solid white;
  transition: background 0.2s ease 0s;
  &:hover {
    background: #FFF;
    color: #2B8000;
    border: 1px solid #2B8000;
  }

  &:disabled {
    background: #D8D8D8;
    color: #54595F;
    cursor: auto;
    border: 1px solid white;
  }

  @media (min-width:1366px) and (max-width: 1379px) {
    margin-top: 0%;
  }
`

export const CloseButton = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.6px;
  padding: 0 1rem;
  line-height: 1;
  height: 32px;
  background-color: #fff;
  color: #71757B;
  font-size: 14px;
  font-weight: 500;
  border: 0;
  outline: none;
  border: 1px solid white;
  transition: background 0.2s ease 0s;
  margin-left: 8px;
`

export const GreenBox = styled.div`
  display: inline-block;
  color: ${props => ((props.caseStatus === 'OPEN' || props.caseStatus === 'DRAFT') ? `${colorAccessibleGreen}` : `${colorGreyShark}`)};
  padding-right: ${props => ((props.minimized) ? '0.5rem' : '1rem')};
  text-transform: uppercase;
  font-size: 13px;
`
export const AccordionMenu = styled.div`
  border-style: solid none solid none;
  transform: rotate(-1e-05deg);
  flex-shrink: 0;
  width: 100%;
  background-color: white;
  padding: 0px;
  margin: 0px;
  border-width: 0px;
  div:last-child div > div .col-sm-11.col-xs-11.col-md-11.col-lg-11 > div#accordion_row_header {
    border-bottom: 1px solid rgb(216, 216, 216) !important;
  }
`

export const AccordionRow = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.625rem 0 0.625rem 0;
  cursor: pointer;
  outline: none;
  border-top: 1px solid rgb(216,216,216);
  border-bottom: ${props => ((props.isOpen) ? '1px solid #D8D8D8' : 'none')};
  background-color: ${props => ((props.status === 'NOT_STARTED' || props.status === 'IN_PROGRESS') ? '#F4F9F2' : 'white')};
`

export const AccordionChildrenSection = styled.div`
  background-color: #F7F7F8;
  padding: 10px 0px 0px 0px;
  height: ${props => ((props.accordionHeight === 'auto') ? 'auto' : `${props.accordionHeight}`)};
`
export const AccorordionTaskData = styled.div`
  width: 100%;
  div:nth-child(2) p {
    font-size: 14px;
    line-height: 27px;
  }
`
export const TaskDataWrapper = styled.div`
  width: 100%;
  padding-left:34px;
`

export const AddButtonWrapper = styled.div`
  float:left;
`
export const AddCommentHeading = styled.div`
  font-size: 1rem;
  font-weight: bold;
  display: inline-block;
  padding-top:8px;
  color: ${colorTelusPurple};
`

export const CommentSection = styled.div`
  width: 100%;
  .kBeCee {
    padding: 1rem;
  }
`

export const AccordionColWrapper = styled.div`
  flex-grow: 9.9;
  width: 93%;
  & > #vertical_tooltip {
    display: block;
    overflow: hidden;
  }
`

export const AccordionOuterHeader = styled.div`
  width: 100%;
`

export const AccorordionInnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  .IN_PROGRESS, .NOT_STARTED {
    color:${props => ((props.status === 'NOT_STARTED' || props.status === 'IN_PROGRESS') ? `${colorAccessibleGreen}` : '#71757B')};
  }
  & > #vertical_tooltip {
    display: block;
    overflow: hidden;
  }
`
export const Icon = styled.div`
  margin-top: -1px;
  padding: 0 .5rem 0 .5rem;
  height: 0px !important;
`
export const AccordionCol2 = styled.div`
  margin-top: 2px;
  flex-grow: 1;
  width: 22%;
  @media (min-width:1280px) and (max-height:1024px) {
    width: 17%;
  }
  font-weight: bold;
  font-size: 13px;
`
export const AccordionCol3 = styled.div`
  flex-grow: 4;
  width: 38%;
`
export const AccordionCol4 = styled.div`
  flex-grow: 3;
  width: 24%;
  text-align: right;
  padding-right: 10px;
`

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  font-weight: bold;
`

export const AccordionButton = styled.div`
  flex-grow: 5;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0 1rem 0;
`
export const EllipsesText = styled.div`
white-space: nowrap;
width: 100%;
overflow: hidden;
text-overflow: ellipsis;
color: #2A2C2E;
`
export const TimeWrapper = styled.div`
  display: inline-block;
`

export const CommentBox = styled.div`
  overflow-y: scroll;
  max-height: 37vh;
  max-width: 100%;
  word-break: break-word;
`
export const MediumWeightText = styled.div`
  font-weight: bold;
  display: inline-block;
  font-size: 14px;
  padding-right: ${props => (props.paddingRight)};
`
export const NameLabel = styled.div`
  font-weight: bold;
  display: inline-block;
  font-size: 14px;
  padding-right: ${props => (props.paddingRight)};
  text-overflow: ellipsis;
  overflow: hidden;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
`
export const ContactCard = styled.div`
  position: sticky;
  top: 0;
`
export const LobBody = styled.div`
  padding-top: 1rem;
`
export const CaseCommentsSection = styled.div`
  width: 100%;
  .drLLDx {
    padding: 1rem;
  }
  .NBpyy {
    padding: ${props => (props.commentTimeout ? '1rem 1rem 0.25rem 0' : '1rem 1rem 1rem 0')} !important;
  }
  padding-top: 2rem;
  & li { padding-bottom: 1rem; }
  .gZHAWe {
    transform: none;
  } 
  .col-sm-1.col-xs-1.col-md-1.col-lg-1 {
    max-width: 4% !important;
  }
  .col-sm-11.col-xs-11.col-md-11.col-lg-11 {
    max-width: 96% !important;
  }
`
export const LightWeightText = styled.div`
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
`
export const RegularWeightText = styled.span`
  font-weight: 500;
  display: inline-block;
  font-size: 0.875rem;
  `

export const NoTaskBody = styled.div`
  padding: 15px;
  color: #2A2C2E;
  text-align: center;
  background-color: #F7F7F8;
`

export const NotificationURL = styled.a`
color: #4B286D;
`

export const HyperLink = styled.span`
  cursor: pointer;
  color: #4B286D;
  text-decoration: underline;
  font-weight: 500;
`

export const FooterContentInner = styled.div`
  padding: ${props => (props.minimized ? '0rem' : '1rem')};
  .col-md-8.col-lg-8 {
    flex-basis: ${props => (props.currentLang === 'fr' ? '68%' : '72%')} !important;
    max-width: ${props => (props.currentLang === 'fr' ? '68%' : '72%')} !important;
  }
  .col-md-2.col-lg-2 {
    flex-basis: 21% !important;
    max-width: 21% !important;
  }
  .col-md-1.col-lg-1 {
    max-width: ${props => (props.currentLang === 'fr' ? '11%' : '7%')} !important;
    flex-basis: ${props => (props.currentLang === 'fr' ? '11%' : '7%')} !important;
  }
  .col-md-5.col-lg-5 {
    max-width: 43% !important;
    flex-basis: 43% !important;
  }
  .col-md-9.col-lg-9 {
    max-width: 68% !important;
    flex-basis: 68% !important;
  }
  .col-md-3.col-lg-3 {
    max-width: 11% !important;
    flex-basis: 11% !important;
  }
  @media (min-width:1366px) and (min-height:657px) {
    .col-md-8.col-lg-8 {
      flex-basis: ${props => (props.currentLang === 'fr' ? '68%' : '72%')} !important;
      max-width: ${props => (props.currentLang === 'fr' ? '68%' : '72%')} !important;
    }
    .col-md-2.col-lg-2 {
      flex-basis: 21% !important;
      max-width: 21% !important;
    }
    .col-md-1.col-lg-1 {
      max-width: ${props => (props.currentLang === 'fr' ? '11%' : '7%')} !important;
      flex-basis: ${props => (props.currentLang === 'fr' ? '11%' : '7%')} !important;
    }
    .col-md-5.col-lg-5 {
      max-width: 43% !important;
      flex-basis: 43% !important;
    }
    .col-md-9.col-lg-9 {
      max-width: 68% !important;
      flex-basis: 68% !important;
    }
    .col-md-3.col-lg-3 {
      max-width: 11% !important;
      flex-basis: 11% !important;
    }  
  }
  @media (min-width:1380px) and (min-height:768px) {
    .col-md-8.col-lg-8 {
      flex-basis: ${props => (props.currentLang === 'fr' ? '68%' : '72%')} !important;
      max-width: ${props => (props.currentLang === 'fr' ? '68%' : '72%')} !important;
    }
    .col-md-2.col-lg-2 {
      flex-basis: 21% !important;
      max-width: 21% !important;
    }
    .col-md-1.col-lg-1 {
      max-width: ${props => (props.currentLang === 'fr' ? '11%' : '7%')} !important;
      flex-basis: ${props => (props.currentLang === 'fr' ? '11%' : '7%')} !important;
    }
    .col-md-5.col-lg-5 {
      max-width: 43% !important;
      flex-basis: 43% !important;
    }
    .col-md-9.col-lg-9 {
      max-width: 68% !important;
      flex-basis: 68% !important;
    }
    .col-md-3.col-lg-3 {
      max-width: 11% !important;
      flex-basis: 11% !important;
    }
  }
  @media only screen and (min-width: 992px) {
    .col-lg-1 {
        flex-basis: 7% !important;
        max-width: 7% !important;
    }
  }
`

export const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(75,40,109,0.95);
  z-index: 999;
  display:block;
  transform: scale(1.1);
  transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
`

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  min-width: 370px;
  border-radius: 4px;
`

export const IconContainer = styled.div`
  cursor: pointer;
  width: 16px;
  height: 16px;
  &:hover { transform: scale(1.2); }
  transition: transform 150ms ease-in-out;
  position: relative;
  float: right;
  top: 16px;
  right: 16px;
  `

export const CloseHeader = styled.div`
  height: 48px;
  width: 100%;
`
export const DueDateModal = styled.div`
  position: absolute;
  left: 34px;
  top: ${props => `${props.yValue}px`};
  z-index: 2;
`

export const DateTimeLabelContainer = styled.span`
  span {
    background-color: ${props => ((props.warning) ? 'white' : 'none')};
    border: ${props => (props.warning ? '2px solid #F3CA7A' : 'none')};
    border-radius: ${props => (props.warning ? '5px' : '0')};
    padding: 3px;
  }
  span:hover {
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    background-color: ${(props) => {
    if (props.warning) {
      return 'none'
    } if (props.disabled) {
      return 'none'
    }
    return '#D8D8D8'
  }};
  }
`
export const DueDateTimeContentContainer = styled.div`
  display: flex
`
export const DueDateTimeLabel = styled.div`
  flex-grow:0.1;
`
export const DueDateTimeContent = styled.div`
  flex-grow:0.1;
`
export const BusinessHoursContent = styled.div`
  flex-grow:1;
  padding-top: 3px
`
export const CustomDropDownWrapper = styled.div`
  outline: none;
  position: relative;
  .styles__CustomButton-sc-4k871t-2 {
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
  & svg {
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
`
export const ErrorWraper = styled.div`
padding: 0 .5rem 0 .5rem;
`
export const ErrorWraperRetry = styled.div`
padding-right: .5rem;
margin-left: ${props => (props.currentLang === 'fr' ? '0px' : '0')};
`
export const ErrorContentText = styled.div`
  width: ${props => (props.localLanng === 'fr' ? '68%' : '73%')} !important;
  float: right;
  & p {
    display; flex;
    align-items: center;
    font-size: 0.875rem;
    letter-spacing: -0.6px;
    display: flex;
  }
  & p > span {
    line-height: 21px !important;    
    letter-spacing: 0.6px !important;
  }
  .kBeCee {
    padding: .5rem 0 !important;
  }
`

export const Container = styled.div`
  .col-sm-1.col-xs-1.col-md-1.col-lg-1 {
    max-width: 4% !important;
  }
  .col-sm-11.col-xs-11.col-md-11.col-lg-11 {
    max-width: 96% !important;
  }
`

export const IconWrapper = styled.div`
  visibility: ${props => !props.visibility && 'hidden'};
  margin-top: 35%;
`

export const RetryContainer = styled.div`
  margin: 8px 8px 8px 8px;
`
export const GridContainer = styled.div`
  display: flex;
`
export const CardSection = styled.div`
  width: 255px;
`
export const CaseSection = styled.div`
  width: 75%;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding-left:2rem;
`
export const SpacingBar = styled.div`
  padding-top: 1rem;
`

export const TimeZoneWrapper = styled.span`
  font-weight: 700;
  color: ${colorGreyShark};
  padding-left: 2px;
`
export const ErrorContent = styled.div`
  float: right !important;
  & p {
    display; flex;
    align-items: center;
    font-size: 0.875rem;
    letter-spacing: -0.6px;
    display: flex;
  }
  & .drLLDx {
    display: flex;
    justify-content: center;
    margin-top: -10px !important;
    margin-bottom: -10px !important;
  }
  & .Frlb {
    display: flex;
    justify-content: center;
    margin-top: -10px !important;
    margin-bottom: -10px !important;
  }
  & p > span {
    letter-spacing: -0.6px;
    line-height: 20px;
  }
  & .kBeCee {
    padding: .5rem 0rem;
  }
`
export const Link = styled.div`
  display: inline-block;
  text-decoration: underline;
  color: ${colorTelusPurple};
  cursor: pointer
`
export const Spacer = styled.span`
  margin-left: ${props => (props.width)}
`

export const MessageBlock = styled.div`
  width: 21rem;
  margin-top: 24px;
  margin-left: 17rem;
  word-wrap: break-word;
  margin-bottom: 33px;
  line-height: 24px;
  position: relative;
  padding: 10px 20px;
  border-radius: 25px;
  &:before, &:after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 25px;
  }
  color: white; 
  background: #0B93F6;
  align-self: flex-end;
  &:before {
    right: -7px;
    width: 20px;
    background-color: #0B93F6;
    border-bottom-left-radius: 16px 14px;
  }
  &:after {
    right: -26px;
    width: 26px;
    background-color: white;
    border-bottom-left-radius: 10px;
  }
`

export const EmailBlock = styled.div`
  width: 40rem;
  height: 19rem;
  overflow: scroll;
  overflow-x: hidden;
  margin-top: 11px;
  margin-bottom: 33px;
`
export const BackButton = styled.div`
  visibility: ${props => (props.notificationDataIndex === 0 ? 'hidden' : props.backButtonDisplay)};
  color: #2B8000;
  display: inline;
  &:hover{
    cursor: pointer;
  }
`
export const NextButton = styled.div`
  visibility: ${props => (props.notificationDataIndex === props.dataSize ? 'hidden' : props.nextButtonDisplay)};
  color: #2B8000;
  display: inline;
  &:hover{
    cursor: pointer;
  }
`
export const NoDataBlock = styled.div`
  height: 12rem;
  display: flex;
  margin-top: 3rem;
  justify-content: flex-start;
  font-style: italic;
  font-weight: 500;
`
export const BoldWeightText = styled.span`
  font-weight: 900;
  display: inline-block;
  font-size: 0.875rem;
  color: #4B286D;
  `
