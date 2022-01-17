import React from 'react'
import PropTypes from 'prop-types'

import skeletons from './skeletons'
import ErrorNotification from '../ErrorNotification'
import ProgressBar from '../ProgressBar'
import DataUsageLabel from '../BanSummary/DataUsageLabel'

/**
 * Data usage for MOB & FFH
 * @param {object} usage
 * @param {object} locale
 * @param {string} lineOfBusiness
 * @returns react template of monthly charge
 */
const DataUsage = ({ usage, locale, lineOfBusiness }) => {
  let usageTemplate = ''
  const {
    isFetching,
    isError
  } = usage

  if (isFetching) {
    usageTemplate = skeletons.usageSummary
  } else if (isError) {
    usageTemplate = <ErrorNotification errorMsg={locale.product.hsicUsageError} />
  } else if (lineOfBusiness === 'ffh') {
    const {
      unitOfMeasureCd, usedAmt, includedAmt, unlimitedInd
    } = usage
    const labelData = {
      text: (
        <DataUsageLabel
          locale={locale} data={{
            unitOfMeasureCd, usedAmt, includedAmt, unlimitedInd
          }}
        />)
    }
    usageTemplate = (
      <ProgressBar
        productUsage={usage}
        label={labelData}
      />
    )
  } else {
    const { domestic: { details: { fixedData = {} } } } = usage
    const {
      unitOfMeasureCd = '', usedAmt = 0, unlimitedInd = false, includedAmt = 0
    } = fixedData
    const labelData = {
      text: (
        <DataUsageLabel
          locale={locale} data={{
            unitOfMeasureCd, usedAmt, unlimitedInd, includedAmt
          }}
          dataType={locale.product.fixedData}
        />
      )
    }
    usageTemplate = (
      <ProgressBar
        productUsage={fixedData}
        label={labelData}
      />
    )
  }
  return usageTemplate
}

DataUsage.propTypes = {
  usage: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  lineOfBusiness: PropTypes.string.isRequired
}

export default DataUsage
