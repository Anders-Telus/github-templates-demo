import React from 'react'
import Text from '@tds/core-text'
import FlexGrid from '@tds/core-flex-grid'
import PropTypes from 'prop-types'

import { Header } from './styles'
import { getCasaAppLocale } from '../../../../utils/helper'

const ProductHeader = ({ lineOfBusiness, isPrepaid }) => {
  const termColWidth = lineOfBusiness === 'ffh' ? 3 : 2
  const termOffSet = lineOfBusiness === 'ffh' ? 6 : 5
  const locale = getCasaAppLocale()
  return (
    <Header>
      <FlexGrid gutter={false}>
        <FlexGrid.Row>
          <FlexGrid.Col
            lg={termColWidth} md={termColWidth}
            lgOffset={termOffSet} mdOffset={termOffSet}
          >

            {!isPrepaid && (
              <Text size='small'>
                {locale.product.term}
              </Text>
            )}

          </FlexGrid.Col>

          <FlexGrid.Col lg={3} md={3}>

            {!isPrepaid && (
              <Text size='small'>
                {locale.product.monthlyPlan}
              </Text>
            )}

          </FlexGrid.Col>

          {
            lineOfBusiness === 'mobility' ? (
              <FlexGrid.Col
                lg={2}
                md={2}
                horizontalAlign='left'
              >
                <Text size='small'>
                  {locale.product.usage}
                </Text>
              </FlexGrid.Col>
            ) : null
          }
        </FlexGrid.Row>
      </FlexGrid>
    </Header>
  )
}

ProductHeader.defaultProps = {
  isPrepaid: false
}

ProductHeader.propTypes = {
  lineOfBusiness: PropTypes.string.isRequired,
  isPrepaid: PropTypes.bool
}

export default ProductHeader
