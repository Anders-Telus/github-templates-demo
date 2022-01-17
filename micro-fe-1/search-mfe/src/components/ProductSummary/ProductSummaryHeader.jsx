import React from 'react'
import PropTypes from 'prop-types'
import Text from '@tds/core-text'
import FlexGrid from '@tds/core-flex-grid'
import moment from 'moment'
import HairlineDivider from '@tds/core-hairline-divider'

import {
  SummaryHeaderContainer,
  CostContainer,
  ProductHeader,
  SkeletonStyle,
  GreyLabel,
  ProductStatus
} from './styles'
import {
  CasaBox, Label, GraySkeleton, GrayCircleSkeleton
} from '../Styled'
import Tooltip from '../Tooltip'
import ClickToCopy from '../ClickToCopy'
import MonthlyCharge from './MonthlyCharge'
import DataUsage from './DataUsage'
import ProductIcon from './ProductIcon'
import { getCapitalizedName } from '../../../../utils/formatter'
import skeletons from './skeletons'
import { getProductName } from './helpers'

const ProductSummaryHeader = ({
  product, key, locale, lineOfBusiness,
  indicatorsTemplate, getProductStateTemplate,
  isPrepaid, productTerm, prodPlanName,
  prodExpiryDate,
  productsListLength, index,
  subscriberStatusTooltip,
  subscriberStatus
}) => {
  const {
    info,
    activationDate,
    subscriberName,
    productType,
    transProductStatus,
    productStatusDate,
    usage,
    productStatus
  } = product

  let icon = null
  let productName = ''
  if (info.isFetching) {
    productName = skeletons.prodName
    icon = (
      <SkeletonStyle isFetching>
        {skeletons.prodIcon}
      </SkeletonStyle>
    )
  } else if (info.isError) {
    productName = <GraySkeleton characters={5} />
    icon = <GrayCircleSkeleton radius={12} />
  } else {
    productName = getProductName(product, locale)
    icon = <ProductIcon productType={productType} locale={locale} product={product} />
  }

  const isMobility = lineOfBusiness === 'mobility'

  return (
    <FlexGrid gutter={false} key={key}>
      <FlexGrid.Row>
        <FlexGrid.Col lg={1} md={1}>
          <CasaBox pt={info.isError ? 0 : 1} mt={isMobility ? '10px' : '0px'} ml={isMobility ? '3px' : '1px'} pl={isMobility ? 4 : 5}>
            {icon}
          </CasaBox>
        </FlexGrid.Col>

        <FlexGrid.Col lg={11} md={11}>
          <SummaryHeaderContainer>
            <FlexGrid.Row>
              <FlexGrid.Col lg={12} md={12}>
                {isMobility ? (
                  <CasaBox pt={4} minWidth='289px'>
                    <span>
                      <Label size={16} height={17} color='#2A2C2E' mr={5}>
                        {getCapitalizedName(subscriberName)}
                      </Label>

                      <ClickToCopy text={typeof productName === 'string' ? productName : ''}>
                        <Label size={16} height={17} weight={600} color='#2A2C2E'>
                          {productName}
                        </Label>
                      </ClickToCopy>
                    </span>
                    {subscriberStatus &&
                      (
                        <Tooltip text={subscriberStatusTooltip}>
                          <ProductStatus
                            type={productStatus ? productStatus.toLowerCase() : ''}
                            id='productSummary_subscriberStatus'
                          >
                            {subscriberStatus}
                          </ProductStatus>
                        </Tooltip>
                      )}
                  </CasaBox>
                ) : (
                  <CasaBox pt={2} minWidth='289px' display='flex' flexDirection='row' alignItems='center'>
                    <Label size={16} height={17} weight={600} color='#2A2C2E'>{productName}</Label>
                    {indicatorsTemplate}
                    {
                    productStatus && productStatus.toLowerCase() !== 'a' &&
                    (
                      getProductStateTemplate()
                    )
                  }
                  </CasaBox>
                )}
              </FlexGrid.Col>
            </FlexGrid.Row>

            <FlexGrid.Row>
              <FlexGrid.Col lg={6} md={6}>
                <CasaBox pt={1} minWidth='289px'>
                  <GreyLabel id='productSummary_subscriberActivationDate'>
                    {`${locale.product.subscriberActivation} `}
                  </GreyLabel>
                  <Text size='small' id='productSummary_activationDate'>
                    {activationDate ? moment(activationDate).format('ll') : ''}
                  </Text>
                </CasaBox>
              </FlexGrid.Col>

              <FlexGrid.Col lg={3} md={3}>
                <CostContainer pt={2} pl={2} minWidth='111px'>
                  {(!isMobility || !isPrepaid) && (
                    <MonthlyCharge product={product} locale={locale} />
                  )}
                </CostContainer>
              </FlexGrid.Col>

              <FlexGrid.Col lg={3} md={3}>
                <CasaBox pt={1.5} pl={2} minWidth='131px'>
                  {(!isMobility || !isPrepaid) && (
                    <>
                      <GreyLabel>
                        {`${locale.product.term} `}
                      </GreyLabel>
                      <Text size='small'>
                        {productTerm}
                      </Text>
                    </>
                  )}
                </CasaBox>
              </FlexGrid.Col>
            </FlexGrid.Row>

            {transProductStatus && transProductStatus.toLowerCase() === 'inactive' && (
              <FlexGrid.Row>
                <FlexGrid.Col lg={12} md={12}>
                  <CasaBox mt='-4px' minWidth='289px' pb={1}>
                    <>
                      <GreyLabel>
                        {`${locale.product.subscriberCancellation} `}
                      </GreyLabel>
                      <Text size='small' id='productSummary_CancellationDateValue'>
                        {productStatusDate ? moment(productStatusDate).format('ll') : ''}
                      </Text>
                    </>
                  </CasaBox>
                </FlexGrid.Col>
              </FlexGrid.Row>
            )}

            <FlexGrid.Row>
              <FlexGrid.Col lg={6} md={6}>
                <CasaBox minWidth='289px' pr={2}>
                  <ProductHeader id='productSummary_planName'>
                    <Text size='small'>
                      <Tooltip text={typeof prodPlanName === 'string' ? prodPlanName : ''}>
                        {prodPlanName}
                      </Tooltip>
                    </Text>
                  </ProductHeader>
                </CasaBox>
              </FlexGrid.Col>

              <FlexGrid.Col lg={3} md={3}>
                <CasaBox minWidth='119px' />
              </FlexGrid.Col>

              <FlexGrid.Col lg={3} md={3}>
                <CasaBox pl={2} minWidth='131px'>
                  {(!isMobility || !isPrepaid) &&
                  prodExpiryDate && productTerm !== locale.product.mtm && (
                    <>
                      <GreyLabel>{`${locale.product.exp} `}</GreyLabel>
                      <Text size='small'>{prodExpiryDate}</Text>
                    </>
                  )}
                </CasaBox>
              </FlexGrid.Col>
            </FlexGrid.Row>

            <FlexGrid.Row>
              <FlexGrid.Col lg={12} md={12}>
                <CasaBox pt={3} pr={2.5} pb={isMobility ? 0 : 3}>
                  <DataUsage usage={usage} locale={locale} lineOfBusiness={lineOfBusiness} />
                </CasaBox>
              </FlexGrid.Col>
            </FlexGrid.Row>
          </SummaryHeaderContainer>
        </FlexGrid.Col>
      </FlexGrid.Row>
      {(productsListLength - 1 !== index) && <HairlineDivider />}
    </FlexGrid>
  )
}

ProductSummaryHeader.defaultProps = {
  product: {},
  key: '',
  locale: {},
  lineOfBusiness: '',
  indicatorsTemplate: null,
  getProductStateTemplate: () => {},
  isPrepaid: false,
  productTerm: null,
  prodPlanName: null,
  prodExpiryDate: null,
  index: 0,
  productsListLength: 0,
  subscriberStatus: '',
  subscriberStatusTooltip: ''
}

ProductSummaryHeader.propTypes = {
  product: PropTypes.object,
  key: PropTypes.string,
  locale: PropTypes.object,
  lineOfBusiness: PropTypes.string,
  indicatorsTemplate: PropTypes.node,
  getProductStateTemplate: PropTypes.func,
  isPrepaid: PropTypes.bool,
  productTerm: PropTypes.node,
  prodPlanName: PropTypes.node,
  prodExpiryDate: PropTypes.node,
  index: PropTypes.number,
  productsListLength: PropTypes.number,
  subscriberStatus: PropTypes.string,
  subscriberStatusTooltip: PropTypes.string
}

export default ProductSummaryHeader
