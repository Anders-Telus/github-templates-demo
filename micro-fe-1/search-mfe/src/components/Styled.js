import styled from 'styled-components'
import TdsBox from '@tds/core-box'

export const AlignCenter = styled.div`
  text-align: center;
`

export const Button = styled.button`
  font-size: 1rem;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
  letter-spacing: -0.8px;
  line-height: 1.25;
  overflow-wrap: break-word;
  font-weight: 700;
  margin: 0;
  cursor: pointer;
  ${({ primary }) => primary && `
    background: rgb(36, 135, 0) none repeat 0% 0%;
  `}
  ${({ secondary }) => secondary && `
    background-color: rgb(75, 40, 109);
  `}
  ${({ bgColor }) => bgColor && `
    background-color: ${bgColor};
  `}
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  &:hover {
    background: rgb(255, 255, 255) none repeat 0% 0%;
    ${({ primary }) => primary && `
      color: rgb(36, 135, 0);
      border: 1px solid rgb(36, 135, 0);
    `}
    ${({ secondary }) => secondary && `
      color: rgb(75, 40, 109);
      border: 1px solid rgb(75, 40, 109);
    `}
    ${({ bgColor }) => bgColor && `
      color: ${bgColor};
      border: 1px solid ${bgColor};
    `}
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background: #F7F7F8;
    color: #BBBBBB;
    border: 1px solid #F7F7F8;
  }
  ${({ disabledAddToCart }) => disabledAddToCart && `
    background: rgb(255, 255, 255) none repeat 0% 0%;
    color: rgb(36, 135, 0);
    border: 1px solid rgb(36, 135, 0);
  `}
`

export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.6px;
  padding: 0rem 1rem;
  border-radius: 5px;
  line-height: 1;
  height: 32px;
  cursor: pointer;
  word-wrap: break-word;
  color: #FFF;
  background: #2B8000;
  font-weight: 600;
  border: 0;
  float: right;
  &:hover {
    background: #FFF;
    color: #2B8000;
    border: 1px solid #2B8000;
  }
  &:disabled {
    background: #D8D8D8;
    color: #54595F;
    cursor: auto;
    border: 2px solid #D8D8D8;
  }
  &:focus {
    outline: none;
  }
`

export const ItalicText = styled.span`
  font-style: italic;
`

export const StatusBadge = styled.span`
  border-radius: 12px;
  background-color: ${props => (props.variant === 'active' ? '#D6CFDD' : '#DBDBDB')};
  color:${props => (props.variant === 'active' ? '#4B286D' : '#9E9D9D')};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.42px;
  line-height: 13px;
  padding: 3px 12px;
  text-transform: capitalize;
  float: right;
  margin-bottom: 2.5px;
  margin-top: 2.5px;
`
export const StatusText = styled.span`
  color: #71757B;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.42px;
  line-height: 20px;
  padding: 3px 6px;
  text-transform: capitalize;
  margin-bottom: 3px;
`

export const SubmitButton = styled.button`
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

// gray skeleton
export const GraySkeleton = styled.span`
  height: ${({ height = 18 }) => height}px;
  min-width: 18px;
  border-radius: 9px;
  width:${props => (`${props.characters * 18}px`)} ;
  max-width: 100%;
  display: inline-block;
  overflow: hidden;
  background-color: #d8d8d8;
  margin: ${({ margin = 2 }) => margin}px;
`

// gray cricle skeleton
export const GrayCircleSkeleton = styled.span`
  height: ${props => (`${props.radius * 2}px`)};
  min-width: ${props => (`${props.radius * 2}px`)};
  border-radius: ${props => (`${props.radius}px`)};
  max-width: 100%;
  display: inline-block;
  overflow: hidden;
  background-color: #d8d8d8;
`

// component to disply no record
export const NoRecordContainer = styled.p`
    font-style: italic; 
    text-align: center;
    margin: ${props => (`${props.ma}px`)};
    padding-top: ${props => (`${props.pt}px`)};
    height: auto;
    min-height: 30px;
  `

export const CasaIconButton = styled.button`
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
  background: none;
  box-shadow: none;
  padding-top: 0;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`

export const CasaRegularText = styled.span`
  display: inline-block;
  font-size: ${({ size = '14px' }) => (`${size}`)};
  font-weight: 500;
`
export const CasaH4 = styled.h4`
  display: flex;
  font-size: 16px;
  font-weight: 700;
`
export const CasaH3 = styled.h4`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  margin-top: -10px;
`
export const CasaH2 = styled.h2`
  font-size: 24px;
  font-weight: 500;
  `

export const ClearButton = styled.button`
  background:none;
  color: #4B286D;
  border:none; 
  padding:0!important;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 2.5rem;
  text-decoration: underline;
  ${props => props.style};
`

export const Label = styled.span`
  color: ${props => (props.color ? props.color : 'black')};
  font-size: ${props => (props.size ? `${props.size}px` : '14px')};
  line-height: ${props => (props.height ? `${props.height}px` : '15px')};
  font-weight:${props => (props.weight ? props.weight : 500)};
  margin-top: ${({ mt = 0 }) => `${mt}px`};
  margin-right: ${({ mr = 0 }) => `${mr}px`};
  margin-bottom: ${({ mb = 0 }) => `${mb}px`};
  margin-left: ${({ ml = 0 }) => `${ml}px`};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
`
// custom div which can accept multiple props
export const CasaBox = styled(TdsBox)`
  padding-top: ${({ pt = 0 }) => `${pt * 0.25}rem`};
  padding-right: ${({ pr = 0 }) => `${pr * 0.25}rem`};
  padding-bottom: ${({ pb = 0 }) => `${pb * 0.25}rem`};
  padding-left: ${({ pl = 0 }) => `${pl * 0.25}rem`};
  width: ${({ width }) => (width || '')};
  display: ${({ display }) => (display || '')};
  flex-wrap: ${({ flexWrap }) => (flexWrap || '')};
  flex-direction: ${({ flexDirection }) => (flexDirection || '')};
  align-items: ${({ alignItems }) => (alignItems || '')};
  justify-content: ${({ justifyContent }) => (justifyContent || '')};
  min-width: ${({ minWidth }) => (minWidth || '')};
  margin-top: ${({ mt = 0 }) => `${mt}`};
  margin-right: ${({ mr = 0 }) => `${mr}`};
  margin-bottom: ${({ mb = 0 }) => `${mb}`};
  margin-left: ${({ ml = 0 }) => `${ml}`};
  cursor: ${({ cursor }) => (cursor || 'inherit')};
  position: ${({ position }) => (position || '')};
  visibility: ${({ visibility }) => (visibility || '')};
  float: ${({ float }) => (float || 'none')};
  word-break: ${({ wb }) => (wb || '')};
  font-size: ${({ size }) => (size ? `${size}px` : 'inherit')};
  color: ${({ color }) => (color || 'inherit')};
  font-weight: ${({ weight }) => (weight || 'inherit')};
  max-width: ${({ maxWidth }) => (maxWidth || '')};
`

export const HyperLink = styled.span`
  cursor: pointer;
  color: #4B286D;
  text-decoration: underline;
  font-weight: 500;
`

// counter badge is useful to display count inside a circle
export const CounterBadge = styled.span`
  min-width: 23px;
  line-height: 16px;
  height: 18px;
  border-radius: 8px;
  border-style: solid;
  border-width: thin;
  padding: 0 7px;
  font-size: 0.75rem;
  font-weight: 500;
  border-color:  ${props => (props.selected ? '#FFFFFF' : '#4B286D')};
  background-color: #FFFFFF;
  color: #4b286d;
  text-align: center;
`

// positioned could be relative, absolute, static
export const PositionedDiv = styled.div`
  position: ${props => (props.position ? props.position : 'static')}
`
export const ErrorText = styled.span`
  color:red
`
// red counter badge is useful to display count inside a circle
export const RedCounterBadge = styled.span`
  font-weight: 700;
  background-color: #C12335;
  color: #FFF;
  position: ${({ position }) => (position || '')}};
  top: ${({ top }) => (top || '0px')}};
  left: ${({ left }) => (left || '0px')}};
  padding-bottom: 17px;
  height: 14px;
  width: 17px;
  padding-right: 1px;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  margin-top: ${({ mt = 0 }) => `${mt}`};
  margin-right: ${({ mr = 0 }) => `${mr}`};
  margin-bottom: ${({ mb = 0 }) => `${mb}`};
  margin-left: ${({ ml = 0 }) => `${ml}`};
`

// positioned could be inline, inline-flex, block etc
export const DisplayDiv = styled.div`
  display: ${({ display }) => (display || 'inline-flex')}};
  width: ${({ width }) => (width || '90%')}};
  height:${({ height }) => (height || '30px')}};
`
