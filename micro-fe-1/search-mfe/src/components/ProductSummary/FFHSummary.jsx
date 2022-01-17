import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { NotificationWarning } from '@tds/core-feedback-icon'

import { productStatusCodes } from '../constant'
import FifaFibre from '../../assets/svgs/FifaFibre'
import ExpandCollapse from '../ExpandCollapse'
import {
  GraySkeleton, CasaBox
} from '../Styled'
import ProductDetails from '../ProductDetails'
import { getCasaAppLocale } from '../../../../utils/helper'
import {
  ProductStatus,
  NotificationIcon,
  ProductStatusWrapper,
  SkeletonStyle
} from './styles'
import Tooltip from '../Tooltip'
import skeletons from './skeletons'
import { getProductTerm, getExpiry } from './helpers'
import ErrorNotification from '../ErrorNotification'
import ProductSummaryHeader from './ProductSummaryHeader'

const FFHSummary = ({
  product,
  ban,
  lob,
  fetchProductInfo,
  currentCycleStartDt,
  currentCycleEndDt,
  qualificationMetaData: { isFetchingFQ, isErrorFQ },
  index,
  productsListLength
}) => {
  const {
    serviceInstanceId,
    productType,
    productStatus,
    expiryDate,
    term,
    fifaFibreIndicator,
    info,
    transProductStatus
  } = product
  const locale = getCasaAppLocale()

  // to get product info we use service instance id
  const productId = serviceInstanceId
  const key = `prod_summary_collapsible_${serviceInstanceId}`
  const productStatusCode = locale.product.status[productStatusCodes[productStatus.toLowerCase()]]

  /**
    * For fifa home security product show term from info call
    * and for rest of product from product summary
  */
  let productTerm = null
  let productExpiryDate = null
  if (productType && productType.toLowerCase() === 'smhm') {
    if (info.isFetching) {
      productTerm = skeletons.prodTerm
    } else if (info.isError) {
      // show error if fifa product info return error
      productTerm = <ErrorNotification errorMsg={locale.product.UnableToFetchTermFor} />
    } else {
      const commitmentDetails = info && info.commitmentDetails ? info.commitmentDetails : {}
      const { contractTerm } = commitmentDetails
      const endDate = moment(commitmentDetails.endDate).format('YYYY-MM-DD')
      productTerm = getProductTerm(contractTerm, locale, endDate)
      productExpiryDate = productTerm && productTerm !== '-' ? getExpiry(endDate) : null
    }
  } else {
    productTerm = getProductTerm(term, locale, expiryDate)
    productExpiryDate = getExpiry(expiryDate)
  }

  const indicatorStyle = {
    verticalAlign: 'text-bottom',
    padding: '0px 2px',
    cursor: 'auto'
  }

  let indicatorsTemplate = null
  if (isFetchingFQ) {
    indicatorsTemplate = (
      <SkeletonStyle isFetching>
        {skeletons.indicators}
      </SkeletonStyle>
    )
  } else if (isErrorFQ) {
    indicatorsTemplate = (
      <Tooltip text={`${locale.product.fetchIndicatorError}`}>
        <NotificationIcon>
          <NotificationWarning copy='en' />
        </NotificationIcon>
      </Tooltip>
    )
  } else {
    indicatorsTemplate = (
      <>
        {fifaFibreIndicator
          ? (
            <CasaBox mt='-4px' pl={1}>
              <Tooltip text={`${locale.app.tooltip.fibreFifaAtProduct}`}>
                <FifaFibre alt='fifa fibre' style={indicatorStyle} />
              </Tooltip>
            </CasaBox>
            ) : null}
      </>
    )
  }

  // price plan is part of info
  let planNameTemplate = ''
  if (info.isFetching) {
    planNameTemplate = skeletons.planName
  } else if (info.isError) {
    planNameTemplate = <GraySkeleton characters={7} />
  } else {
    planNameTemplate = info.pricePlan
    planNameTemplate = productType.toLowerCase() === 'ttv' && !planNameTemplate ? locale.product.essentials : planNameTemplate
  }

  /**
   * This function is temporary and restructured after -
   * we make these status style reusable
   * @returns html
  */
  const getProductStateTemplate = () => {
    let template = ''
    switch (productStatus.toLowerCase()) {
      // this cancelled status would be exactly like ban summary section
      case 'c': {
        template = (
          <ProductStatusWrapper id='productSummary_ProductStatus' type={productStatus.toLowerCase()}>
            {productStatusCode}
          </ProductStatusWrapper>
        )
        break
      }
      case 'r':
      case 'm':
      case 's': {
        template = (
          <ProductStatus id='productSummary_ProductStatus' type={productStatus.toLowerCase()}>
            {productStatusCode}
          </ProductStatus>
        )
        break
      }
      default:
        break
    }
    return template
  }

  return (
    <ExpandCollapse
      disabled={
        transProductStatus.toLowerCase() === 'inactive'
      }
      key={key}
      uniqId={`prod_${productId}`}
      headerCSS={{
        background: '#FFF',
        padding: '0px',
        marginTop: '0px'
      }}
      iconCSS={{
        paddingTop: '40px',
        position: 'absolute',
        paddingLeft: '29px'
      }}
      expand={false}
      expandSummary
      productHandler={
        () => { fetchProductInfo(lob, ban, productId, info) }
      }
      openSummary
      header={(
        <ProductSummaryHeader
          product={product}
          key={`ffh_summary_header${productId}`}
          locale={locale}
          lineOfBusiness='ffh'
          indicatorsTemplate={indicatorsTemplate}
          getProductStateTemplate={getProductStateTemplate}
          productTerm={productTerm}
          prodPlanName={planNameTemplate}
          prodExpiryDate={productExpiryDate}
          index={index}
          productsListLength={productsListLength}
        />
      )}
    >
      <ProductDetails
        key={`prod_detail_${productId}`}
        product={product}
        currentCycleStartDt={currentCycleStartDt}
        currentCycleEndDt={currentCycleEndDt}
        lineOfBusiness={lob}
      />
    </ExpandCollapse>
  )
}

FFHSummary.defaultProps = {
  currentCycleStartDt: '',
  currentCycleEndDt: '',
  index: 0,
  productsListLength: 0
}

FFHSummary.propTypes = {
  product: PropTypes.object.isRequired,
  ban: PropTypes.string.isRequired,
  lob: PropTypes.string.isRequired,
  fetchProductInfo: PropTypes.func.isRequired,
  qualificationMetaData: PropTypes.object.isRequired,
  currentCycleStartDt: PropTypes.string,
  currentCycleEndDt: PropTypes.string,
  index: PropTypes.number,
  productsListLength: PropTypes.number
}

export default FFHSummary
