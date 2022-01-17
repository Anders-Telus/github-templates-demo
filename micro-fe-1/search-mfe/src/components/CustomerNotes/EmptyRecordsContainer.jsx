import React from 'react'
import { NoRecordContainer } from './styles'

const EmptyRecordsContainer = (msg) => {
  return (
    <NoRecordContainer id='noRecord'>
      {msg}
    </NoRecordContainer>
  )
}

export default EmptyRecordsContainer
