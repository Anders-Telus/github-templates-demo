import React from 'react'
import FlexGrid from '@tds/core-flex-grid'
import HairlineDivider from '@tds/core-hairline-divider'
import Box from '@tds/core-box'
import Skeleton from '../shared/Skeleton'

const skeletons = () => {
  return (
    <FlexGrid>
      {[...Array(4)].map((e, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div style={{ paddingTop: '1em' }} key={i}>
          <FlexGrid.Row>
            <Box inline between={3} inset={3}>
              <Skeleton type='circle' radius={22} />
              <Skeleton type='text' lines={2} characters={12} />
            </Box>
            <HairlineDivider gradient />
          </FlexGrid.Row>
        </div>
      ))}
    </FlexGrid>
  )
}

export default skeletons
