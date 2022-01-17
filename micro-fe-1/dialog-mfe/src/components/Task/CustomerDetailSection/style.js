import styled from 'styled-components'
import {
  colorCardinal,
  colorTelusPurple
} from '@tds/core-colours'

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
`
export const DetailsColumn = styled.div`
  flex-grow:0;
  padding-top: ${props => (props.isEdit ? '0px' : '5px')};
  padding-right: ${props => (props.isEdit ? '0rem' : '.5rem')};
  & a {
    cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  }
  & button {
    outline:none;
    border:none;
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
`
export const CaseBody = styled.div`
  max-height: 70vh;
  min-height: 30rem;
  overflow-y: scroll;
  padding: 1rem;
  @media (min-width:1280px) and (max-width: 1365px) and (min-height:1024px) {
    height: 72vh;
  }
   @media (min-width:1366px) and (min-height:657px) {
    min-height: 400px;
  }
  @media screen and (min-width: 1280px) and (max-width: 1380px) and (max-height: 768px) {
    height: 65.5vh;
  }
`

export const DropdownWrapper = styled.div`
  float: right;
  @media (min-width:1366px) and (max-width: 1379px) {
    margin-top: 0%;
  }
`

export const TaskButtonsWrapper = styled.div`
margin-right: 4%;
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
  font-weight: 400;
  border: 0;
  outline: none;
  border: 1px solid white;
  transition: background 0.2s ease 0s;
  margin-left: 8px;
`
export const AccordionMenu = styled.div`
  border-style: solid none solid none;
  transform: rotate(-1e-05deg);
  flex-shrink: 0;
  width: 100%;
  background-color: rgb(216, 216, 216);
  padding: 0px;
  margin: 0px;
  border-width: 0px;
`
export const AccordionSectionContainer = styled.div`
  transform: rotate(-1e-05deg);
  flex-shrink: 0;
  width: 100%;
  margin: 0px;
  &:nth-last-child(1) {
    border-bottom: 1px solid rgb(216,216,216)
  }
`
export const AccorordionTaskData = styled.div`
  width: 100%;
  div:nth-child(2) p {
    font-size: 14px;
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
`

export const AccordionColWrapper = styled.div`
  flex-grow: 9.9;
  width: 96%;
  & > #vertical_tooltip {
    display: block;
    overflow: hidden;
  }
`

export const AccordionOuterHeader = styled.div`
  width: 100%;
`
export const AccordionCol2 = styled.div`
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
  margin-top: 50px;
  font-weight: bold;
  position: absolute;
  bottom: 3%;
`

export const AccordionButton = styled.div`
  flex-grow: 5;
  display: flex;
  justify-content: flex-end;
`
export const EllipsesText = styled.div`
white-space: nowrap;
width: 100%;
overflow: hidden;
text-overflow: ellipsis;
color: #2A2C2E;
`
export const TimeWrapper = styled.div`
  margin-left:5px;
  display: inline-block;
`

export const CommentBox = styled.div`
  overflow-y: scroll;
  min-height: 15vh;
  max-height: 37vh;
  max-width: 100%;
  word-break: break-word;
`
export const MediumWeightText = styled.div`
  font-weight: bold;
  display: inline-block;
  letter-spacing: -0.6px;
  font-size: 14px;
  line-height: 22px;
  padding-right: ${props => (props.paddingRight)};
`
export const RegularWeightText = styled.span`
  font-weight: 500;
  display: inline-block;
  letter-spacing: -0.6px;
  font-size: 14px;
  line-height: 22px;
  padding-right: ${props => (props.paddingRight)};
`
export const ContactCard = styled.div`
  position: sticky;
  top: 0;
  width: 252px;
`
export const LobBody = styled.div`
  padding-top: 1rem;
`
export const CaseCommentsSection = styled.div`
  width: 100%;
  padding-top: 2rem;
  & li { padding-bottom: 1rem; }
`
export const LightWeightText = styled.div`
  display: inline-block;
  font-size: 14px;
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
  left: 40px;
  top: 4px;
  z-index: 2;
`
export const Mandatory = styled.span`
  font-weight: bold !important;
  color: ${colorCardinal};
  font-size: 16px;
`
export const LanguageSection = styled.div`
  margin-top: -5px;
`

export const CustomerNameWrapper = styled.div`
  width: 180px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
