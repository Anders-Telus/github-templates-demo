import React from 'react'
import Box from '@tds/core-box'
import Skeleton from '../../../../components/shared/Skeleton'

const skeletons = {
  notes: (
    <Box inset={2}>
      <div style={{ paddingTop: '1em' }}>
        <Skeleton type="text" lines={3} characters={20} />
      </div>
    </Box>
  )
}

export default skeletons
