import React from 'react'
import FlexGrid from '@tds/core-flex-grid'
import Box from '@tds/core-box'
import Skeleton from '../shared/Skeleton'

const skeletons = {
  productSummary: {
    ffh: (
      <Box vertical={3} horizontal={3}>
        <FlexGrid gutter={false}>
          <FlexGrid.Row>
            <FlexGrid.Col lg={1} md={1}>
              <Skeleton type='circle' radius={25} />
            </FlexGrid.Col>
            <FlexGrid.Col lg={5} md={5}>
              <Skeleton type='text' lines={3} characters={13} />
            </FlexGrid.Col>
            <FlexGrid.Col lg={3} md={3}>
              <Skeleton type='text' lines={1} characters={8} />
            </FlexGrid.Col>
            <FlexGrid.Col lg={3} md={3}>
              <Skeleton type='text' lines={1} characters={8} />
            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>
      </Box>
    ),
    mobility: (
      <Box vertical={3} horizontal={3}>
        <FlexGrid gutter={false}>
          <FlexGrid.Row>
            <FlexGrid.Col lg={1} md={1}>
              <Skeleton type='circle' radius={25} />
            </FlexGrid.Col>
            <FlexGrid.Col lg={4} md={4}>
              <Skeleton type='text' lines={3} characters={10} />
            </FlexGrid.Col>
            <FlexGrid.Col lg={2} md={2}>
              <Skeleton type='text' lines={1} characters={5} />
            </FlexGrid.Col>
            <FlexGrid.Col lg={3} md={3}>
              <Skeleton type='text' lines={1} characters={7} />
            </FlexGrid.Col>
            <FlexGrid.Col lg={2} md={2}>
              <Skeleton type='text' lines={1} characters={6} />
            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>
      </Box>
    )
  },
  monthlyCharge: (
    <Skeleton type='text' lines={1} characters={7} />
  ),
  usageSummary: (
    <Skeleton type='text' lines={2} characters={34} />
  ),
  deviceName: (
    <Skeleton type='text' lines={1} characters={7} />
  ),
  planName: (
    <Skeleton type='text' lines={1} characters={7} />
  ),
  indicators: (
    <Skeleton type='circle' radius={12} />
  ),
  prodIcon: (
    <Skeleton type='circle' radius={15} />
  ),
  prodName: (
    <Skeleton type='text' lines={1} characters={5} />
  ),
  prodTerm: (
    <Skeleton type='text' lines={1} characters={5} />
  )
}

export default skeletons
