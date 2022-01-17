import { connect } from 'react-redux'
import {
  compose,
  withLifeCycle
} from '@telus/isomorphic-core'

import Container from './Container'
import { getProductsByBan, getProductAddressGroups, getProductSummaryFetchingStatus } from '../../../../services/product/selectors'
import {
  fetchProducts, fetchEquipments, fetchProductInfo, fetchCallUsage
} from '../../../../services/product/action'
import { setInnerTabAction, updateTabAdobeObject } from '../../../../services/tabs/actions'
import { focusSearchTab } from '../../../../services/tabs'
import {
  resetAddressDetails, fetchAddressOptionsData, fetchOutcomeDetailsData,
  fetchAddressDetailsData, updateClickedAddress, updateEscalationCaseDetails
} from '../../../../services/address/actions'
import { getCurrentTabCustomer, getTabAdobeObject } from '../../../../services/tabs/selectors'
import { getProductSummaryLoadTime } from '../../helper'
import { pushLinkedProductSummary } from '../../../../utils/adobe/index'
import getAdobePageName from '../../../../utils/adobe/helper'
import { getBanDetails } from '../../../../services/ban/selectors'

const mapDispatchToProps = dispatch => ({
  fetchProducts: productDetails => dispatch(
    fetchProducts(productDetails)
  ),
  fetchEquipments: (lob, number, productId, equipments, tabUniqId) => dispatch(
    fetchEquipments(lob, number, productId, equipments, tabUniqId, true)
  ),
  fetchVoiceUsage: (number, productId) => dispatch(
    fetchCallUsage(number, productId, true)
  ),
  fetchProductInfo: (lob, ban, productId, info) => dispatch(
    fetchProductInfo(lob, ban, productId, info, true)
  ),
  resetAddressDetails: () => dispatch(resetAddressDetails()),
  fetchAddressOptionsData: address => dispatch(fetchAddressOptionsData(address, true)),
  fetchAddressDetailsData: address => dispatch(fetchAddressDetailsData(address)),
  fetchOutcomeDetailsData: address => dispatch(fetchOutcomeDetailsData(address)),
  setInnerTabAction: selectedInnerTab => dispatch(setInnerTabAction(selectedInnerTab)),
  focusSearchTab: () => dispatch(focusSearchTab()),
  updateClickedAddress: address => dispatch(updateClickedAddress(address)),
  updateEscalationCaseDetails: status => dispatch(updateEscalationCaseDetails(status)),
  updateTabAdobeObject: (tabUniqId, adobeObj) => dispatch(
    updateTabAdobeObject({ tabUniqId, adobeObj })
  )
})

const mapStateToProps = /* istanbul ignore next */ (state, props) => {
  const { tabUniqId, isIws, isDashboard } = getCurrentTabCustomer(state)
  const productsDetails = getProductsByBan(state)(props.billingAcctNum)
  const productAddressGroups = getProductAddressGroups(state)(props.billingAcctNum)
  const isFetchingProductSummary = getProductSummaryFetchingStatus(state)(props.billingAcctNum)
  const tabAdobeObj = getTabAdobeObject(state)
  const parentBillingAcctNum = getBanDetails(state)(props.billingAcctNum)
  const { uuid } = parentBillingAcctNum

  return {
    productsDetails,
    productAddressGroups,
    tabUniqId,
    isFetchingProductSummary,
    tabAdobeObj,
    isIws,
    isDashboard,
    uuid
  }
}

const ConnectedView = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLifeCycle({
    componentDidMount () {
      const { lineOfBusiness, billingAcctNum } = this.props
      this.props.fetchProducts({ lineOfBusiness, billingAcctNum })
    },
    componentDidUpdate () {
      const {
        billingAcctNum, tabAdobeObj, productsDetails,
        isFetchingProductSummary, tabUniqId, isIws, isDashboard, uuid
      } = this.props
      /**
       * Push linked product summary event to adobe if:
       * a) Its already not pushed to adobe (case of multiple expand/collapse for same ban)
       * b) Product summary (or its any child api calls) is/are not in fetching status
       */
      if (
        !tabAdobeObj.pushedProductSummaryBanList.includes(billingAcctNum) &&
        !isFetchingProductSummary
      ) {
        pushLinkedProductSummary({
          uuid,
          componentLoadTime: getProductSummaryLoadTime(productsDetails),
          pageName: getAdobePageName({ isIws, isDashboard })
        })
        tabAdobeObj.pushedProductSummaryBanList.push(billingAcctNum)
        this.props.updateTabAdobeObject(tabUniqId, tabAdobeObj)
      }
    }
  })
)(Container)

export default ConnectedView
