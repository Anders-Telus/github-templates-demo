import React from 'react'
import PropTypes from 'prop-types'
import {
  PikTV, Tv, Internet, HomeSecurity, PhoneHome, Mobility, Ambulance
} from '@tds/core-decorative-icon'

import { productTypes } from '../../../../constant'
import Tooltip from '../Tooltip'

const ProductIcon = ({ productType, locale, product }) => {
  let template = null
  const isLivingWell = product.info ? product.info.isLivingWell : false
  switch (productType) {
    case productTypes.internet:
      template = (
        <Tooltip text={locale.app.tooltip.internetProd}>
          <Internet variant='default' size={20} />
        </Tooltip>
      )
      break
    case productTypes.securityAndSafety:
      template = (
        <Tooltip text={isLivingWell ? locale.app.tooltip.livingWell
          : locale.app.tooltip.homeSecurity}
        >
          {isLivingWell && <Ambulance variant='default' size={20} />}
          {!isLivingWell && <HomeSecurity variant='default' size={20} />}
        </Tooltip>
      )
      break
    case productTypes.homePhone:
      template = (
        <Tooltip text={locale.app.tooltip.homePhone}>
          <PhoneHome variant='default' size={20} />
        </Tooltip>
      )
      break
    case productTypes.satelliteTv:
    case productTypes.tv:
      template = (
        <Tooltip text={locale.app.tooltip.tv}>
          <Tv variant='default' size={20} />
        </Tooltip>
      )
      if (product.info && product.info.isPikTv) {
        template = (
          <Tooltip text={locale.app.tooltip.pikTv}>
            <PikTV variant='default' size={20} />
          </Tooltip>
        )
      }
      break
    case productTypes.mobile:
      template = <Mobility />
      break
    default:
      template = null
      break
  }
  return template
}

ProductIcon.defaultProps = {
  productType: '',
  product: {}
}

ProductIcon.propTypes = {
  productType: PropTypes.string,
  locale: PropTypes.object.isRequired,
  product: PropTypes.object
}

export default ProductIcon
