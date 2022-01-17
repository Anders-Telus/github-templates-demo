import React from 'react'
import PropTypes from 'prop-types'
import FlexGrid from '@tds/core-flex-grid'
import { SharedAccount } from '@tds/core-decorative-icon'

import ProgressBar from '../ProgressBar'
import { formatPhoneNumber } from '../../../../utils/formatter'
import ExpandCollapse from '../ExpandCollapse'
import { CasaBox, Label } from '../Styled'
import { SummaryHeaderContainer as DataUsageContainer } from '../ProductSummary/styles'
import DataUsageLabel from './DataUsageLabel'

const DataUsage = ({ usage, locale }) => {
  const usageTooltip = (numbers) => {
    const tooltip = numbers.map((number) => {
      return `Subscriber ${formatPhoneNumber(number)}`
    })
    return tooltip.join(' ')
  }

  return usage ? usage.map((data) => {
    const numbers = data.sharingGroupPhoneNumberList || []
    const tooltipText = usageTooltip(numbers)
    const labelData = {
      text: (<DataUsageLabel locale={locale} data={data} dataType={locale.product.shareddata} />)
    }
    const sharingGroupPhoneNumberListLength = numbers.length
    const header = `${locale.product.shareddatafor} ${sharingGroupPhoneNumberListLength} 
    ${sharingGroupPhoneNumberListLength > 1 ? locale.product.subscribers : locale.product.subscriber}`
    return (
      <ExpandCollapse
        disabled
        key={data.sharingGroupCd}
        headerCSS={{
          background: '#FFF',
          padding: '0px 0px 0px 0px',
          marginTop: '9px'
        }}
        expand={false}
        header={(
          <FlexGrid gutter={false}>
            <FlexGrid.Row>
              <FlexGrid.Col lg={1} md={1}>
                <CasaBox pl={5} mt='-6px'>
                  <SharedAccount size={20} />
                </CasaBox>
              </FlexGrid.Col>
              <FlexGrid.Col lg={11} md={11}>
                <DataUsageContainer>
                  <FlexGrid.Row>
                    <FlexGrid.Col lg={12} md={12}>
                      <CasaBox>
                        <Label size={16} color='#000000' height={17} weight='normal'>{header}</Label>
                      </CasaBox>
                    </FlexGrid.Col>
                  </FlexGrid.Row>
                  <FlexGrid.Row>
                    <FlexGrid.Col lg={12} md={12}>
                      <CasaBox mt='6px' pb={2} pr={2.5}>
                        <ProgressBar
                          tooltipText={tooltipText}
                          productUsage={data}
                          label={labelData}
                        />
                      </CasaBox>
                    </FlexGrid.Col>
                  </FlexGrid.Row>
                </DataUsageContainer>
              </FlexGrid.Col>
            </FlexGrid.Row>
          </FlexGrid>
          )}
      />
    )
  }) : null
}

DataUsage.defaultProps = {
  usage: []
}

DataUsage.propTypes = {
  usage: PropTypes.array,
  locale: PropTypes.object.isRequired
}

export default DataUsage
