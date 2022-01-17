import React from 'react'
import Text from '@tds/core-text'
import PropTypes from 'prop-types'
import { Deals } from '@tds/core-decorative-icon'

import { formatCurrency } from '../../../../utils/formatter'
import {
  parseMonthlyChargeTooltip,
  getMonthlyPlanValue
} from './helpers'
import Tooltip from '../Tooltip'
import skeletons from './skeletons'
import ErrorNotification from '../ErrorNotification'
import {
  CostWrapper,
  CostIcon,
  GreyLabel
} from './styles'

/**
 * MonthlyCharge return monthly price chanrge for mob & FFH
 * @param {object} product
 * @param {object} locale
 * @returns react template of monthly charge
 */
const MonthlyCharge = ({
  product, locale
}) => {
  const {
    isFetchingMC,
    isErrorMC,
    monthlyCharge,
    basePlan,
    addOns,
    discounts,
    info
  } = product
  const { isLivingWell, planCost } = info
  // put basePlan, addOns and discounts without sign in one object
  const monthlyChargeObject = { basePlan, addOns, totalDiscount: discounts }
  const tooltipText = parseMonthlyChargeTooltip(monthlyChargeObject, locale.product.monthlyPlanCost)
  const monthlyChargeValue = getMonthlyPlanValue(monthlyCharge)
  let productMonthlyCharge = '-'
  if (isFetchingMC) {
    productMonthlyCharge = skeletons.monthlyCharge
  } else if (isErrorMC) {
    productMonthlyCharge = (
      <>
        <span>
          <GreyLabel>{`${locale.product.cost} `}</GreyLabel>
        </span>
        <ErrorNotification errorMsg={locale.product.monthlyPlanError} />
      </>
    )
  } else if (isLivingWell && planCost) {
    productMonthlyCharge = (
      <>
        {formatCurrency(planCost) !== '-' ? (
          <CostWrapper>
            <Tooltip maxWidth={215} text={`${tooltipText}`} variant='vertical'>
              <span>
                <GreyLabel>{`${locale.product.cost} `}</GreyLabel>
                <Text size='small'>{formatCurrency(planCost)}</Text>
              </span>
            </Tooltip>
            {Number(discounts) > 0 &&
              <CostIcon><Deals variant='default' size={16} /></CostIcon>}
          </CostWrapper>
        ) : (
          <CostWrapper>
            <span>
              <GreyLabel>{`${locale.product.cost} `}</GreyLabel>
              <Text size='small'>{formatCurrency(planCost)}</Text>
            </span>
            {planCost !== '-' && Number(discounts) > 0 &&
              <CostIcon><Deals variant='default' size={16} /></CostIcon>}
          </CostWrapper>
        )}
      </>
    )
  } else if (monthlyCharge) {
    productMonthlyCharge = (
      <>
        {formatCurrency(monthlyChargeValue) !== '-' ? (
          <CostWrapper>
            <Tooltip maxWidth={215} text={`${tooltipText}`} variant='vertical'>
              <span>
                <GreyLabel>{`${locale.product.cost} `}</GreyLabel>
                <Text size='small'>{formatCurrency(monthlyChargeValue)}</Text>
              </span>
            </Tooltip>
            {Number(discounts) > 0 &&
              <CostIcon><Deals variant='default' size={16} /></CostIcon>}
          </CostWrapper>
        ) : (
          <CostWrapper>
            <span>
              <GreyLabel>{`${locale.product.cost} `}</GreyLabel>
              <Text size='small'>{formatCurrency(monthlyChargeValue)}</Text>
            </span>
            {monthlyChargeValue !== '-' && Number(discounts) > 0 &&
              <CostIcon><Deals variant='default' size={16} /></CostIcon>}
          </CostWrapper>
        )}
      </>
    )
  }
  return productMonthlyCharge
}

MonthlyCharge.propTypes = {
  product: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired
}

export default MonthlyCharge
