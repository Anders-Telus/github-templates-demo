import styled from 'styled-components'
import posed from 'react-pose'

const StyledOval = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50px;
  background: #FFFFFF;
`
/* istanbul ignore next */
export const PosedOval = posed(StyledOval)({
  on: {
    margin: '2px 1px 2px 8px'
  },
  off: {
    margin: '2px 20px 2px 1px'
  }
})

const StyledToggle = styled.div`
  width: 34px;
  height: 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 3px;
`
/* istanbul ignore next */
export const PosedToggle = posed(StyledToggle)({
  on: {
    background: '#248700',
    transition: { duration: 250 }
  },
  off: {
    background: '#D8D8D8',
    transition: { duration: 250 }
  }
})

const StyledCheckmark = styled.div`
  transform: rotate(45deg);
  height: 11px;
  width: 4.5px;
  border-bottom: 1px solid #FFFFFF;
  border-right: 1px solid #FFFFFF;
`
/* istanbul ignore next */
export const PosedCheckmark = posed(StyledCheckmark)({
  on: {
    opacity: 1,
    margin: '4px 0px 8px 8px'
  },
  off: {
    opacity: 0,
    margin: '4px 0px 8px -3px'
  }
})
