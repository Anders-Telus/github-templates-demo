import moment from 'moment'
import { formatPhoneNumber } from '../../../../utils/formatter/index'
import { productTypes } from '../../../../constant'

export const getProductName = (product, locale) => {
  let productName = ''
  const isLivingWell = product.info ? product.info.isLivingWell : false
  switch (product.productType) {
    case productTypes.internet:
      return locale.product.internet
    case productTypes.securityAndSafety:
      return isLivingWell ? locale.product.livingWell : locale.product.securityAndSafety
    case productTypes.homePhone:
      return formatPhoneNumber(product.productResourceValue)
    case productTypes.satelliteTv:
      return locale.product.satelliteTv
    case productTypes.tv:
      productName = locale.product.tv
      if (product.info && product.info.isPikTv) productName = locale.product.pikTv
      return productName
    case productTypes.mobile:
      return formatPhoneNumber(product.productResourceValue)
    default:
      return ''
  }
}

export const sortProductsByDate = (a, b) => {
  return new Date(b.productStatusDate).getTime() - new Date(a.productStatusDate).getTime()
}

// ffh product term
export const getProductTerm = (term, locale, expiryDate) => {
  let productTerm = locale.product.mtm
  if ((new Date(expiryDate) > new Date()) &&
    term && !Number.isNaN(Number(term)) && Number(term) > 0) {
    productTerm = `${Math.floor(Number(term) / 12)} ${locale.product.yrs}`
  }
  return productTerm
}

// ffh product expiry
export const getExpiry = (expiryDate) => {
  let productExpiryDate = ''
  if (expiryDate && (new Date(expiryDate) > new Date())) {
    productExpiryDate = moment(expiryDate).format('ll')
  }
  return productExpiryDate
}

/**
 * returns Interger formatted value of active or inactive count
 * @param {count} number active or inactive count
 * @returns {count} Interger formatted value
 */
export const getActiveAndInactiveProdCount = (count) => {
  // if (count === 0) return '00'
  // return count && count <= 9 ? `0${count}` : count
  return count
}

/**
 * replace basePlan, addOns, discount for english or french lang
 * @param {[number]} arr {string} str  static string
 */
export const parseMonthlyChargeTooltip = (chargeObject, str) => {
  let parseStr = str
  parseStr = parseStr.replace(/basePlan|addOns|totalDiscount/gi, matched => (chargeObject[matched]))
  return parseStr
}

/**
 * return either dash - when no value, else number as monthlyplan
 * @param {monthlyCharge} number monthlyCharge
 */
export const getMonthlyPlanValue = (monthlyCharge) => {
  return (!monthlyCharge || Number.isNaN(Number(monthlyCharge))) ? '-' : monthlyCharge
}

/**
 * return total count of active and inactive products
 * @param {itemArray} Array active and inactive products array
 * @returns {totalProducts} Interger total count of active or inactive products
 */
export const getTotalProducts = (itemArray) => {
  let totalProducts = 0
  Array.from(itemArray).forEach((item) => {
    const products = item ? item.products : []
    totalProducts += products.length
  })
  return totalProducts
}

export const getSubscriberStatusTooltip = (status, locale) => {
  switch (status.toLowerCase()) {
    case 'reserved':
      return locale.app.tooltip.subsReservedStatus
    case 'moved':
      return locale.app.tooltip.subsMovedStatus
    case 'suspended':
      return locale.app.tooltip.subsSuspendedStatus
    case 'cancelled':
      return locale.app.tooltip.subsCancelledStatus
    default:
      return ''
  }
}
