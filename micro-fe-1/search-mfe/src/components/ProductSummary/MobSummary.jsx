import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { masterSwitch, subscriberStatusCodes } from '../../../../constant'
import ExpandCollapse from '../ExpandCollapse'
import ProductDetails from '../ProductDetails'
import {
  ChevronIconCss,
  HeaderCss
} from './styles'
import { getCasaAppLocale, getCurrentLanguage } from '../../../../utils/helper'
import ProductSummaryHeader from './ProductSummaryHeader'
import { getSubscriberStatusTooltip } from './helpers'

const MobSummary = ({
  product,
  isPrepaid,
  fetchEquipments,
  fetchVoiceUsage,
  billingAcctNum,
  lineOfBusiness,
  fetchProductInfo,
  currentCycleStartDt,
  currentCycleEndDt,
  tabUniqId,
  index,
  productsListLength
}) => {
  const {
    info,
    equipments,
    productResourceValue,
    expiryDate,
    transProductStatus,
    term,
    frenchPlanName,
    productStatus
  } = product
  const { planName } = product
  const locale = getCasaAppLocale()
  const currentLanguage = getCurrentLanguage()
  const mobPlanName = currentLanguage === 'fr' ? frenchPlanName : planName
  const productId = productResourceValue
  const productEquipments = equipments || {}
  const productInfo = info || {}
  const key = `prod_summary_${productId}`
  const statusCode = productStatus ? productStatus.toLowerCase() : ''
  const subscriberStatus = locale.product.status[subscriberStatusCodes[statusCode]] || ''
  const subscriberStatusTooltip = getSubscriberStatusTooltip(
    subscriberStatusCodes[statusCode] || '', locale
  )
  let subscriberTerm = locale.product.mtm
  let subscriberExpiryDate = ''
  if ((new Date(expiryDate) > new Date()) && term && !Number.isNaN(Number(term))) {
    subscriberTerm = `${Math.floor(Number(term) / 12)} ${locale.product.yrs}`
  }
  if (expiryDate && (new Date(expiryDate) > new Date())) {
    subscriberExpiryDate = moment(expiryDate).format('ll')
  }

  // hide eexpand icon
  const disableDetails = (masterSwitch.isMobProdDetailHidden ||
    transProductStatus.toLowerCase() === 'inactive' || isPrepaid)

  // product handler will be called on click of expendable icon
  const expandableClick = () => {
    if (!isPrepaid) {
      fetchVoiceUsage(billingAcctNum, productId)
    }
    fetchEquipments(lineOfBusiness, billingAcctNum, productId, productEquipments, tabUniqId)
    fetchProductInfo(lineOfBusiness, billingAcctNum, productId, productInfo)
  }

  return (
    <ExpandCollapse
      disabled={disableDetails}
      uniqId={`prod_${productId}`}
      key={key}
      headerCSS={HeaderCss}
      iconCSS={ChevronIconCss}
      expand={false}
      expandSummary
      productHandler={expandableClick}
      openSummary
      header={(
        <ProductSummaryHeader
          product={product}
          key={`mob_summary_header${productResourceValue}`}
          locale={locale}
          lineOfBusiness='mobility'
          isPrepaid={isPrepaid}
          productTerm={subscriberTerm}
          prodPlanName={mobPlanName}
          prodExpiryDate={subscriberExpiryDate}
          index={index}
          productsListLength={productsListLength}
          subscriberStatus={subscriberStatus}
          subscriberStatusTooltip={subscriberStatusTooltip}
        />
        )}
    >
      <ProductDetails
        key={`prod_detail_${productId}`}
        product={product}
        lineOfBusiness={lineOfBusiness}
        billingAcctNum={billingAcctNum}
        currentCycleStartDt={currentCycleStartDt}
        currentCycleEndDt={currentCycleEndDt}
      />
    </ExpandCollapse>
  )
}

MobSummary.defaultProps = {
  index: 0,
  productsListLength: 0
}

MobSummary.propTypes = {
  product: PropTypes.object.isRequired,
  billingAcctNum: PropTypes.string.isRequired,
  lineOfBusiness: PropTypes.string.isRequired,
  fetchProductInfo: PropTypes.func.isRequired,
  fetchEquipments: PropTypes.func.isRequired,
  isPrepaid: PropTypes.bool.isRequired,
  fetchVoiceUsage: PropTypes.func.isRequired,
  tabUniqId: PropTypes.string.isRequired,
  currentCycleStartDt: PropTypes.string.isRequired,
  currentCycleEndDt: PropTypes.string.isRequired,
  index: PropTypes.number,
  productsListLength: PropTypes.number
}

export default MobSummary
