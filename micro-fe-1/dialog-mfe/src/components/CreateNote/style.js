import styled from 'styled-components'
import {
  colorCardinal,
  colorGreyAthens,
  colorGreyShark
} from '@tds/core-colours'

export const FormContainer = styled.div`
  padding: 16px 16px 0px 16px;
`
export const Mandatory = styled.span`
  font-weight: bold !important;
  color: ${colorCardinal};
`
export const DetailsLabel = styled.div`
  font-size: 1em;
  letter-spacing: -0.6px;
  line-height: 22px;
  font-style: normal;
  font-weight: bold;
`
export const DateTimeLabelContainer = styled.span`
  float:left;
  span {
    background-color: ${colorGreyAthens};
    border: ${props => (props.isWarning ? '2px solid #F3CA7A' : 'none')};
    border-radius: ${props => (props.isWarning ? '5px' : '0')};
    padding: 3px;
  }
  ${props => (props.isHover ? `span:hover {
    cursor: pointer;
    background-color: #D8D8D8;
  }` : '')}
`
export const DueDate = styled.span`
  font-size: 14px !important;
  letter-spacing: -0.6px;
  line-height: 22px;
  font-style: normal;
  font-weight: 500;
`
export const RegularWeightText = styled.span`
  font-weight: 500;
  display: inline-block;
  letter-spacing: -0.6px;
  font-size: 14px !important;
  line-height: 22px;
  padding-right: ${props => (props.paddingRight)};
`
export const TimeWrapper = styled.div`
  display: inline-block;
`

export const BusinessHoursWrapper = styled.div`
  display:block;
  width: 100px;
  float: left;
  padding-top: 3px;
  padding-left: 8px;
`

export const TimezoneWrapper = styled.div`
  display:block;
  float: left;
  padding-left: 5px;
  padding-top: ${props => (props.parentComp ? '2px' : '')};
  font-size: 14px !important;
  letter-spacing: -0.6px;
  line-height: 22px;
  font-style: normal;
  font-weight: 700;
  color: ${colorGreyShark};
`
export const DueDateValue = styled.span`
  font-family: TELUS-Web, "Helvetica Neue", Helvetica, Arial, sans-serif !importnat;
  font-size: 14px !important;
  line-height: 21px !important;
  color: #2a2c2e !important;
`
export const CheckBoxWrapper = styled.div`
${props => (props.disabled
    ? `.dOBKmo{
  cursor: text;
  pointer-events: auto;
}
.bkTMFO{
  cursor: text;
  pointer-events: auto;
}`
    : '')}
label div div span{
  font-size: 14px;
  font-weight: 500;
}
.bkTMFO{
  min-height: 14px !important;
  min-width: 14px !important;
  width: 14px !important;
  height: 14px !important;
  margin-top: 4px;
  margin-right: 8px;
}
.hKUTnd{
  font-size: 12px;
}
width: max-content;
`

export const CheckBox = styled.div`
${props => (props.disabled ? `
.dOBKmo{
  cursor: text;
  pointer-events: auto;
}
.bkTMFO{
  cursor: text;
  pointer-events: auto;
}
.briXTO{
  cursor: text;
  pointer-events: auto;
}` : '')}
width: max-content;
label div div span{
  font-size: 14px;
  font-weight: 500;
}
.bkTMFO {
  margin-right: 8px;
  min-width: 14px;
  min-height: 14px;
  height: 14px;
  width: 14px;
  margin-top: 4px;
}
.cvUoVc {
  margin-top: 2px;
}
.hKUTnd {
  font-size: 12px;
}
`
