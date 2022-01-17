import styled from 'styled-components'
import CoreSpinner from '@tds/core-spinner'

export const NoResults = styled.div`
min-height: 2em;
text-align: start;
`

export const NoResultsInstructions = styled.span`
color: #4B286D
`

export const ArrowIcon = styled.i`
${({ show }) => show && `
  display: none;
`}
cursor: pointer;
position: relative;
top: 1em;
margin-right: 0.5em;
max-height: 2em;
`

export const AnimatedContainer = styled.section`
  max-width: 100vw;
  overflow-x: hidden;
`

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: fit-content !important;
  min-width: 200px;
  max-width: 300px;
`

export const BoldText = styled.span`
  font-weight: bold;
`

export const SearchInputContainer = styled.div`
  float: right;
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
`

export const SearchGuidanceText = styled.p`
  color: #2a2c2e;
  font-size: 14px;
  font-weight: inherit;
  line-height: 1.5;
  letter-spacing: -0.8px;
  word-wrap: break-word;
  padding-bottom: 16px;
`

export const TabsContainer = styled.div`
  box-shadow: inset 0px -2px 0px #dcdcdc;
  margin-bottom: 20px;
  border-radius: 4px;
  background-color: #F7F7F8;
`

export const TabItem = styled.li`
  display: inline-block;
  cursor: pointer;
  text-transform: capitalize;
  border-bottom: ${props => (props.activeTab ? '2px solid #4B286D' : '2px #DCDCDC')};
  width: 50%;
  padding: 0.5rem 0.5rem;
  text-align: center;
`

export const LabelWrapper = styled.span`
  color: ${props => (props.activeTab ? '#4B286D' : '#2F3032')};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.75px;
`

export const InputContainer = styled.div`
  position: relative;
`

export const FeedbackIcon = styled.div`
  position: absolute;
`

export const DropdownContainer = styled.div`
  position:relative
`

export const OptionsContainer = styled.ul`
  margin-top: 0px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  border-color: transparent;
  box-shadow: 0 0 4px 1px #54595f;
  background-color: #fff;
  position: absolute;
  z-index: 1;
  width: 100%;
  max-height: 300px;
  overflow: auto;
`

export const SpinnerContainer = styled.ul`
  padding-bottom: 1.1em;
  text-align: center;
  margin-top: 0px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  border-color: transparent;
  box-shadow: 0 0 4px 1px #54595f;
  background-color: #fff;
  position: absolute;
  z-index: 1;
  width: 100%;
`

export const Option = styled.li`
  padding: 2px 10px;
  cursor: pointer;
  :hover {
    background-color: #F7F7F8;
  };
  color: #2A2C2E;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  height: 40px;
  line-height: 2.9;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const InputWrapper = styled.div`
  color: #2A2C2E;
  font-size: 0.938rem;
  font-weight: 300;
  letter-spacing: 0;
`
export const CustomerNameWrapper = styled.div`
  position: relative; 
`

export const CustomerNameError = styled.div`
  width: 100%;
  position: absolute; 
  margin-top: 1.3rem;
`

export const StyledErrorMsg = styled.div`
  height: 1.25rem;
  color: #2A2C2E;
  font-size: 0.813rem;
  line-height: 1.25rem;
  font-weight: 500;
`

export const HelpText = styled.div`
  word-wrap: break-word;
  font-weight: 500;
  font-size: 14px;
  padding: 0 1em;
`

export const HelpLabel = styled.div`
  display: flex;
  justify-content: space-between;
`

export const HelpIcon = styled.div`
  position: absolute;
  right: 0;
`

export const Spinner = styled(CoreSpinner)`
  width: 100%;
`
