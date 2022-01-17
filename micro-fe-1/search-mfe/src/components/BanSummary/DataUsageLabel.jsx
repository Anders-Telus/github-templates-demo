import React from 'react'
import PropTypes from 'prop-types'

import { CasaBox, Label } from '../Styled'

/**
 * @description label to show on top of data usage progress bar
 * @param object $data={unitOfMeasureCd: 'MB', unlimitedInd: false, usedAmt: 10, includedAmt: 130}
 * @param string $dataType="Fixed Data"
 * @returns react element DataUsageLabel
 */
const DataUsageLabel = ({ locale, data, dataType }) => {
  const measuereCd = data.unitOfMeasureCd ? `${locale.ban[data.unitOfMeasureCd.toLowerCase()]}` : ''
  let percentageOfDataUsed = null
  if (data.unlimitedInd) {
    percentageOfDataUsed = null
  } else if (data.usedAmt > data.includedAmt) {
    percentageOfDataUsed = 100
  } else {
    percentageOfDataUsed = Math.round((data.usedAmt / data.includedAmt) * 1000) / 10
  }
  const percentageLabel = (percentageOfDataUsed || percentageOfDataUsed === 0) ? `${percentageOfDataUsed}%` : ''

  return (
    <CasaBox display='flex' flexDirection='row' justifyContent='space-between'>
      <Label size={14} color='#000000' height={17} weight='normal'>
        <Label weight={600} size={16} color='#2A2C2E' height={17}>{data.usedAmt}</Label>
        {` ${measuereCd}/${data.unlimitedInd ? `${locale.ban.unlimited}` : `${data.includedAmt} ${measuereCd}`}`}
      </Label>
      <Label size={14} color='#000000' height={17}>
        {`${percentageLabel}${dataType ? ` ${locale.product.of} ${dataType}` : ''}`}
      </Label>
    </CasaBox>
  )
}

DataUsageLabel.defaultProps = {
  locale: {},
  data: {},
  dataType: ''
}

DataUsageLabel.propTypes = {
  locale: PropTypes.object,
  data: PropTypes.object,
  dataType: PropTypes.string
}

export default DataUsageLabel
