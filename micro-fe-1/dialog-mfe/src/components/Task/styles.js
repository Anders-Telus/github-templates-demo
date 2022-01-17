import styled from 'styled-components'
import {
  colorAccessibleGreen
} from '@tds/core-colours'

export const PopupContainer = styled.div`
  position: fixed;
  display:flex;
  font-family: TELUS-Web, “Helvetica Neue”, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  flex-direction:column;
  width: ${props => (props.minimized ? '31% !important' : '988px')};
  bottom: ${props => (props.minimized ? '0px' : 'auto')};
  #popup-header {
    padding: 0;
  }
`

export const IconBox = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
`

export const LogoContainer = styled.div`
  & img {
    height: 28px;
  }
  @media (max-width: 1380px) {
    padding-right: 5%;
  }
`

export const TaskBody = styled.div`
  overflow-y:scroll;
  padding: ${props => (!props.minimized ? '1rem 1rem 0rem 1rem' : '0rem')};
  min-height: ${props => (props.minimized ? '0vh' : props.dimensions.height)};
  height: ${props => (props.minimized ? '0vh' : 'auto')};
  @media (min-width:1280px) and (max-width: 1365px) and (min-height:1024px) {
    height: ${props => (props.minimized ? '0vh !important' : 'auto')};
  }
  @media screen and (min-width: 1280px) and (max-width: 1380px) and (max-height: 768px) {
    height: ${props => (props.minimized ? '0vh !important' : 'auto')};
  }
`
export const DueDateModal = styled.div`
  position: absolute;
  left: 175px;
  top: 120px;
  @media (min-width:1366px) and (max-width: 1400px) and (max-height:657px) {
    top: 41px;
    z-index: 4;
  }
  z-index: 2;
`
export const SubmitButton = styled.div`
  margin-top: 1em;
  display: inline-block;
  float: left;
`
export const MarginTop = styled.div`
  padding-top: 2%;
  height: 100%;
`
export const ButtonWrapper = styled.div`
  padding-left:15px;
  clear:both;
`
export const EllipsesText = styled.div`
white-space: nowrap;
width: 100%;
overflow: hidden;
text-overflow: ellipsis;
font-size: 14px;
color: #2A2C2E;
`

export const MediumWeightText = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: -0.6px;
  color: ${colorAccessibleGreen};
`
export const LeftContainer = styled.div`
height: 100%;
padding-top: 1%;
height: inherit;
@media (max-width:767px) {
  padding-right: 32px;
}
`
export const DetailsSection = styled.div`
  width:100%;
  & span {
    font-size: 16px;
    letter-spacing: -0.6px;
    font-weight: 500;
    font-style: normal;
  }
  & li {
    padding-top: 0px;
    min-height: auto;
  }
`
export const RightContainer = styled.div`
  padding: 24px 32px 0 32px;
  @media (min-width: 768px) {
    padding: 29px 48px 0 48px;
  }
`
export const FooterContent = styled.div`
  background-color: white;
  border-radius: 11px 11px 11px 11px;
  height: ${props => (props.minimized ? '0vh !important' : 'auto !important')};

`
export const FooterContentInner = styled.div`
  padding: ${props => (props.minimized ? '0rem' : '1rem')};
  .col-md-2.col-lg-2 {
    padding: 0rem;
  }
  .col-md-10.col-lg-10 {
    padding: 0rem .5rem 0rem 0rem;
  }
  .col-md-1.col-lg-1 {
    padding: 0rem;
    max-width: ${(props) => {
    if (props.localLang === 'en' && props.resTimeout) {
      return '7.3%'
    }
    return '8.3333%'
  }} !important;
  }
  .col-md-11.col-lg-11 {
    padding: 0rem .5rem 0rem 0rem;
    max-width: ${(props) => {
    if (props.localLang === 'en' && props.resTimeout) {
      return '92.7%'
    }
    return '91.66666667%'
  }} !important;
  }
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
  margin-top: ${props => (props.taskTimeOut ? '6px' : '0px')};
`
export const LobWrapper = styled.div`
  display: inline-grid !important;
  padding-bottom: 1rem;
  font-weight: bold;
  width: 100%;
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
export const GridContainer = styled.div`
  display: flex;
`

export const CardSection = styled.div`
  width: 255px;
`
export const TaskSection = styled.div`
  width: 75%;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding-left:2rem;
`
