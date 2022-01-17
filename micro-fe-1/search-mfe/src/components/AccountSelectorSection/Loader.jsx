import React from 'react'
import FlexGrid from '@tds/core-flex-grid'
import Box from '@tds/core-box'

import Skeleton from '../shared/Skeleton'

const Loader = () => {
  return (
    <FlexGrid>
      <Box inset={2} below={2}>
        <FlexGrid.Row>
          <Box>
            <Skeleton type='text' lines={1} characters={8} />
          </Box>
        </FlexGrid.Row>
        <FlexGrid.Row>
          <Box inline between={4} below={1}>
            <Skeleton type='text' lines={1} characters={10} />
            <Skeleton type='text' lines={1} characters={2} />
          </Box>
        </FlexGrid.Row>
        <FlexGrid.Row>
          <Box>
            <Skeleton type='text' lines={1} characters={5} />
          </Box>
        </FlexGrid.Row>
        <FlexGrid.Row>
          <Box>
            <Skeleton type='text' lines={1} characters={6} />
          </Box>
        </FlexGrid.Row>
        <FlexGrid.Row>
          <Box>
            <Skeleton type='text' lines={1} characters={10} />
          </Box>
        </FlexGrid.Row>
        <FlexGrid.Row>
          <Box>
            <Skeleton type='text' lines={1} characters={6} />
          </Box>
        </FlexGrid.Row>
        <FlexGrid.Row>
          <Box>
            <Skeleton type='text' lines={1} characters={6} />
          </Box>
        </FlexGrid.Row>
      </Box>
    </FlexGrid>
  )
}

export default Loader
