import React from 'react'
import PropTypes from 'prop-types'
import Text from '@tds/core-text'
import _ from 'lodash'
import { NotificationWarning } from '@tds/core-feedback-icon'
import Notification from '@tds/core-notification'
import {
  LocationRegular
} from '@tds/core-decorative-icon'
import HairlineDivider from '@tds/core-hairline-divider'

import DataTab from './DataTab'
import {
  CasaBox,
  NoRecordContainer
} from '../Styled'
import MobSummary from './MobSummary'
import FFHSummary from './FFHSummary'
import {
  sortProductsByDate,
  getActiveAndInactiveProdCount,
  getTotalProducts
} from './helpers'
import {
  NotificationIcon,
  Link,
  LocationIconContainer,
  ServiceLableText,
  AddressTextContainer,
  FifaIconContainer
} from './styles'
import FifaFibre from '../../../../../assets/svgs/FifaFibre'
import COT from '../../../../../assets/svgs/COT'
import { checkAcctType, getCasaAppLocale } from '../../../../utils/helper'
import Tooltip from '../Tooltip'
import skeletons from './skeletons'
import ClickToCopy from '../ClickToCopy'
import { getMobilityDataUsage } from '../BanSummary/helpers'
import DataUsage from '../BanSummary/DataUsage'

const Container = ({
  productsDetails,
  fetchEquipments,
  fetchVoiceUsage,
  currentCycleStartDt,
  currentCycleEndDt,
  productAddressGroups,
  fetchProductInfo,
  billingAcctType,
  lineOfBusiness,
  setInnerTabAction,
  focusSearchTab,
  resetAddressDetails,
  fetchAddressOptionsData,
  fetchAddressDetailsData,
  fetchOutcomeDetailsData,
  updateClickedAddress,
  updateEscalationCaseDetails,
  tabUniqId,
  mobilitySharedData
}) => {
  const {
    products,
    isFetching,
    isError,
    billingAcctNum
  } = productsDetails
  const locale = getCasaAppLocale()
  let productsSummary = []
  let tabs = []
  const isPrepaid = checkAcctType(billingAcctType, 'prepaid') // flag to check for prepaid account

  const serviceAddressHandler = (e, address, lpdsId) => {
    e.preventDefault()
    resetAddressDetails()
    updateEscalationCaseDetails('UNINIT')
    setInnerTabAction('Address')
    updateClickedAddress(address)
    focusSearchTab()
    if (lpdsId) {
      fetchAddressDetailsData(lpdsId)
      fetchOutcomeDetailsData(lpdsId)
    } else {
      fetchAddressOptionsData(address).then((response) => {
        if (response && response.length) {
          fetchAddressDetailsData(response[0].lpdsId)
          fetchOutcomeDetailsData(response[0].lpdsId)
        }
      })
    }
  }

  if (isFetching) {
    return lineOfBusiness === 'ffh'
      ? skeletons.productSummary.ffh
      : skeletons.productSummary.mobility
  }

  if (isError) {
    return (
      <Notification variant='warning' copy='en'>
        <Text size='small' id='product_Error'>{locale.product.productError}</Text>
      </Notification>
    )
  }

  if (products && _.isEmpty(products)) {
    return (
      <CasaBox pb={3}>
        <NoRecordContainer>{locale.product.notExist}</NoRecordContainer>
      </CasaBox>
    )
  }

  const ffhProdSummary = (prods, type) => {
    const ffhTemplate = prods.map((productGroup) => {
      const {
        fibreQualified,
        isFetchingFQ,
        isErrorFQ,
        lpdsId,
        serviceAddress,
        serviceAddressSearchTxt,
        linkedProductIds,
        products: productData
      } = productGroup
      let sortedProducts = []
      sortedProducts = productData
        .sort((a, b) => ((a.displayOrder > b.displayOrder) ? 1 : -1))
      const indicatorStyle = {
        verticalAlign: 'text-bottom',
        padding: '0px 2px',
        cursor: 'auto'
      }
      const countOfProductsOnFibre = productData.filter(
        product => product.fifaFibreIndicator
      ).length

      let indicatorsTemplate = null
      if (isFetchingFQ) {
        indicatorsTemplate = skeletons.indicators
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
            {countOfProductsOnFibre === productData.length
              ? (
                <FifaIconContainer>
                  <Tooltip text={`${locale.app.tooltip.fibreFifaAtAddress}`}>
                    <FifaFibre alt='fifa fibre' style={indicatorStyle} />
                  </Tooltip>
                </FifaIconContainer>
                ) : null}
            {(fibreQualified && (countOfProductsOnFibre !== productData.length)
            )
              ? (
                <Tooltip text={`${locale.app.tooltip.cotAtAddress}`}>
                  <COT alt='change of tech' style={indicatorStyle} />
                </Tooltip>
                ) : null}
          </>
        )
      }
      if (type === 'inActive') {
        sortedProducts.sort(sortProductsByDate)
      }
      const _template = (serviceAddress && sortedProducts) ? (
        <CasaBox key={serviceAddress}>
          <CasaBox display='flex' pl={8} pt={6} flexDirection='row'>
            <LocationIconContainer>
              <LocationRegular variant='default' size={16} />
            </LocationIconContainer>
            <ServiceLableText>
              {`${locale.product.service} `}
            </ServiceLableText>
            <AddressTextContainer>
              <ClickToCopy text={serviceAddress}>
                <Link id={`service_addr_${linkedProductIds.join('_')}`} href='' onClick={e => serviceAddressHandler(e, serviceAddressSearchTxt, lpdsId)}>
                  {serviceAddress}
                </Link>
              </ClickToCopy>
            </AddressTextContainer>
            {indicatorsTemplate}
          </CasaBox>
          {sortedProducts.length && (
            <>
              {
                sortedProducts.map((product, index) => {
                  const { serviceInstanceId } = product
                  const key = `prod_summary_${serviceInstanceId}`
                  return (
                    <FFHSummary
                      key={key}
                      qualificationMetaData={{ isFetchingFQ, isErrorFQ }}
                      ban={billingAcctNum}
                      lob={lineOfBusiness}
                      currentCycleStartDt={currentCycleStartDt}
                      currentCycleEndDt={currentCycleEndDt}
                      fetchProductInfo={fetchProductInfo}
                      tabUniqId={tabUniqId}
                      product={product}
                      index={index}
                      productsListLength={sortedProducts.length}
                    />
                  )
                })
              }
            </>
          )}
        </CasaBox>
      ) : null

      return _template
    })
    return ffhTemplate
  }

  if (lineOfBusiness === 'mobility' && !_.isEmpty(products)) {
    const activeProducts = Object.values(products)
      .filter(product => product.transProductStatus && product.transProductStatus.toLowerCase() === 'active')

    const inActiveProducts = Object.values(products)
      .filter(product => product.transProductStatus && product.transProductStatus.toLowerCase() === 'inactive')
    const allMobProducts = [activeProducts, inActiveProducts]

    tabs = [{
      name: locale.product.mobilityActiveTab,
      count: getActiveAndInactiveProdCount(activeProducts.length),
      uniqId: `${billingAcctNum}_activeProd_mob`
    }, {
      name: locale.product.mobilityInactiveTab,
      count: getActiveAndInactiveProdCount(inActiveProducts.length),
      uniqId: `${billingAcctNum}_inActiveProd_mob`
    }]

    /** Mobility shared data used progress bar template */
    let mobilitySharedDataTemplate = null
    if (activeProducts.length) {
      const usageData = getMobilityDataUsage(mobilitySharedData)
      mobilitySharedDataTemplate = (
        <>
          <DataUsage usage={usageData} locale={locale} />
          {!!usageData.length && <CasaBox pl={4} pr={4} pt={1}><HairlineDivider /></CasaBox>}
        </>
      )
    }

    productsSummary = allMobProducts.map((mobProducts) => {
      let mobTemplate = null
      const productsListLength = mobProducts.length
      if (productsListLength) {
        mobTemplate = (
          <>
            {
            mobProducts.map((product, index) => {
              return (
                <MobSummary
                  key={`mobSummary_${product.productResourceValue}`}
                  product={product}
                  isPrepaid={isPrepaid}
                  fetchEquipments={fetchEquipments}
                  fetchVoiceUsage={fetchVoiceUsage}
                  billingAcctNum={billingAcctNum}
                  lineOfBusiness={lineOfBusiness}
                  currentCycleStartDt={currentCycleStartDt}
                  currentCycleEndDt={currentCycleEndDt}
                  fetchProductInfo={fetchProductInfo}
                  tabUniqId={tabUniqId}
                  index={index}
                  productsListLength={productsListLength}
                />
              )
            })
          }
          </>
        )
      }
      return mobTemplate
    })
    if (productsSummary[0] === null) {
      productsSummary[0] = (
        <NoRecordContainer>{locale.product.noActiveSubscriber}</NoRecordContainer>
      )
    } else {
      /** combine Mobility shared data used progress bar template
       * & active mob products
       */
      productsSummary[0] = (
        <>
          {mobilitySharedDataTemplate}
          {productsSummary[0]}
        </>
      )
    }
    if (productsSummary[1] === null) {
      productsSummary[1] = (
        <NoRecordContainer>{locale.product.noInactiveSubscriber}</NoRecordContainer>
      )
    }
  }

  if (lineOfBusiness === 'ffh') {
    const { active, inActive } = productAddressGroups
    const activeProductsLength = getTotalProducts(active)
    const inActiveProductsLength = getTotalProducts(inActive)
    productsSummary.push(active.length ? ffhProdSummary(active, 'active') : <NoRecordContainer>{locale.product.noActiveProduct}</NoRecordContainer>)
    productsSummary.push(inActive.length ? ffhProdSummary(inActive, 'inActive') : <NoRecordContainer>{locale.product.noInactiveProduct}</NoRecordContainer>)
    tabs = [{
      name: locale.product.ffhActiveTab,
      count: getActiveAndInactiveProdCount(activeProductsLength),
      uniqId: `${billingAcctNum}_activeProd_ffh`
    }, {
      name: locale.product.ffhInactiveTab,
      count: getActiveAndInactiveProdCount(inActiveProductsLength),
      uniqId: `${billingAcctNum}_inActiveProd_ffh`
    }]
  }
  return (
    <DataTab
      tabs={tabs}
      tabsData={productsSummary}
      lineOfBusiness={lineOfBusiness}
    />
  )
}

Container.defaultProps = {
  currentCycleStartDt: '',
  currentCycleEndDt: '',
  billingAcctType: '',
  mobilitySharedData: {}
}

Container.propTypes = {
  productsDetails: PropTypes.object.isRequired,
  fetchProductInfo: PropTypes.func.isRequired,
  fetchEquipments: PropTypes.func.isRequired,
  fetchVoiceUsage: PropTypes.func.isRequired,
  productAddressGroups: PropTypes.object.isRequired,
  lineOfBusiness: PropTypes.string.isRequired,
  currentCycleStartDt: PropTypes.string,
  currentCycleEndDt: PropTypes.string,
  billingAcctType: PropTypes.string,
  setInnerTabAction: PropTypes.func.isRequired,
  focusSearchTab: PropTypes.func.isRequired,
  resetAddressDetails: PropTypes.func.isRequired,
  fetchAddressOptionsData: PropTypes.func.isRequired,
  fetchAddressDetailsData: PropTypes.func.isRequired,
  fetchOutcomeDetailsData: PropTypes.func.isRequired,
  updateClickedAddress: PropTypes.func.isRequired,
  updateEscalationCaseDetails: PropTypes.func.isRequired,
  tabUniqId: PropTypes.string.isRequired,
  mobilitySharedData: PropTypes.object
}

export default Container
