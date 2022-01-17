import {
  colorWhite,
  colorGreyShuttle,
  colorGreyGainsboro,
  colorAccessibleGreen
} from '@tds/core-colours'
import styled from 'styled-components'

export const FakeRadio = styled.span({
  height: '1rem',
  width: '1rem',
  minHeight: '1rem',
  minWidth: '1rem',
  outline: 0,
  lineHeight: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginTop: '0.18rem',
  transition: 'border-color 0.1s linear, background-color 0.1s linear',
  borderRadius: '50%',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: colorGreyShuttle,
  backgroundColor: colorWhite,
  '& > i': {
    display: 'none'
  }
})

export const HiddenInput = styled.input({
  position: 'fixed',
  opacity: '0',
  pointerEvents: 'none'
})

export const StyledLabel = styled.label(() => ({
  display: 'flex',
  cursor: 'pointer',
  [`${HiddenInput}:focus ~ & > div > ${FakeRadio}`]: {
    boxShadow: `0 0 4px 1px ${colorGreyShuttle}`,
    borderColor: 'red'
  },
  [`${HiddenInput}:checked ~ & > div > ${FakeRadio}`]: {
    '& > span': {
      display: 'block'
    },
    borderColor: colorGreyShuttle
  },
  [`${HiddenInput}:disabled ~ & > div > ${FakeRadio}`]: {
    borderColor: colorGreyGainsboro
  },
  [`${HiddenInput}:disabled ~ & > div > div`]: {
    color: colorGreyGainsboro
  }
}))

export const InnerChecked = styled.span({
  width: '0.6rem',
  height: '0.6rem',
  borderRadius: '50%',
  backgroundColor: colorAccessibleGreen,
  display: 'none'
})
