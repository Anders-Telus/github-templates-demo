import React from 'react'
import HairlineDivider from '@tds/core-hairline-divider'
import DimpleDivider from '@tds/core-dimple-divider'
import FlexGrid from '@tds/core-flex-grid'
import Box from '@tds/core-box'
import Text from '@tds/core-text'
import Paragraph from '@tds/core-paragraph'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import Skeleton from '../shared/Skeleton'
import Card from '../Card'
import {
  CustNameHeader,
  RowContainer,
  FirstRowContainer,
  BasicInfoContainer,
  RowContainerLast,
  IdValue,
  IdHead,
  FullName,
  SmallName
} from './styles'
import Tooltip from '../Tooltip'
import ClickToCopy from '../ClickToCopy'

const getCapitalizedName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1, name.length)
}

const BasicInfoSection = ({ parentBan }) => {
  const dob = parentBan.birthDate || 'N/A'
  return (
    <BasicInfoContainer>
      <Card collapsable={false} margin='10px 5px 5px 0'>
        <FlexGrid>
          <FlexGrid.Row>
            <FlexGrid.Col>
              <Box
                vertical={1}
                between='space-between'
                id={`customer_${parentBan.billingAccountName}`}
              >
                <CustNameHeader>
                  <ClickToCopy
                    text={
                      parentBan &&
                      getCapitalizedName(parentBan.billingAccountName)
                    }
                    textPosition='bottom'
                  >
                    {parentBan.billingAccountName &&
                    parentBan.billingAccountName.length < 27 ? (
                      <FullName>
                        {parentBan.billingAccountName &&
                          getCapitalizedName(parentBan.billingAccountName)}
                      </FullName>
                        ) : (
                          <SmallName>
                            {parentBan.billingAccountName &&
                          getCapitalizedName(parentBan.billingAccountName)}
                          </SmallName>
                        )}
                  </ClickToCopy>
                </CustNameHeader>
              </Box>
            </FlexGrid.Col>
          </FlexGrid.Row>

          <DimpleDivider />

          <FirstRowContainer>
            <FlexGrid.Row>
              <FlexGrid.Col xs={5} sm={5} md={5} lg={5} xl={5}>
                <Box vertical={1} between='space-between'>
                  <Paragraph id='label_sin'>
                    <Tooltip text='Social Insurance Number'>
                      <Text size='small'>
                        <IdHead>SIN</IdHead>
                      </Text>
                    </Tooltip>
                  </Paragraph>
                </Box>
              </FlexGrid.Col>
              <FlexGrid.Col xs={7} sm={7} md={7} lg={7} xl={7}>
                <Box vertical={1} between='space-between'>
                  {parentBan.isFetchingIdentities ? (
                    <Skeleton type='text' lines={1} characters={6} />
                  ) : (
                    <Paragraph id='value_sin'>
                      <Text bold size='small'>
                        <IdValue>
                          {parentBan.sin ? parentBan.sin : 'N/A'}
                        </IdValue>
                      </Text>
                    </Paragraph>
                  )}
                </Box>
              </FlexGrid.Col>
            </FlexGrid.Row>
          </FirstRowContainer>

          <HairlineDivider />
          <RowContainer>
            <FlexGrid.Row>
              <FlexGrid.Col xs={5} sm={5} md={5} lg={5} xl={5}>
                <Box vertical={1} between='space-between'>
                  <Paragraph id='label_dl'>
                    <Tooltip text={'Driver\'s License'}>
                      <Text size='small'>
                        <IdHead>DL</IdHead>
                      </Text>
                    </Tooltip>
                  </Paragraph>
                </Box>
              </FlexGrid.Col>
              <FlexGrid.Col xs={7} sm={7} md={7} lg={7} xl={7}>
                <Box vertical={1} between='space-between'>
                  {parentBan.isFetchingIdentities ? (
                    <Skeleton type='text' lines={1} characters={6} />
                  ) : (
                    <Paragraph id={`value_${parentBan.driversLicence}`}>
                      <Text bold size='small'>
                        <IdValue>
                          {parentBan.driversLicence
                            ? parentBan.driversLicence
                            : 'N/A'}
                        </IdValue>
                      </Text>
                    </Paragraph>
                  )}
                </Box>
              </FlexGrid.Col>
            </FlexGrid.Row>
          </RowContainer>

          <HairlineDivider />

          <RowContainerLast>
            <FlexGrid.Row>
              <FlexGrid.Col xs={5} sm={5} md={5} lg={5} xl={5}>
                <Box vertical={1} between='space-between'>
                  <Paragraph id='label_dob'>
                    <Tooltip text='Date Of Birth'>
                      <Text size='small'>
                        <IdHead>DOB</IdHead>
                      </Text>
                    </Tooltip>
                  </Paragraph>
                </Box>
              </FlexGrid.Col>
              <FlexGrid.Col xs={7} sm={7} md={7} lg={7} xl={7}>
                <Box vertical={1} between='space-between'>
                  {parentBan.isFetchingIdentities ? (
                    <Skeleton type='text' lines={1} characters={6} />
                  ) : (
                    <Paragraph id={`value_${parentBan.birthDate}`}>
                      <Text bold size='small'>
                        <IdValue>{dob}</IdValue>
                      </Text>
                    </Paragraph>
                  )}
                </Box>
              </FlexGrid.Col>
            </FlexGrid.Row>
          </RowContainerLast>
        </FlexGrid>
      </Card>
    </BasicInfoContainer>
  )
}

BasicInfoSection.propTypes = {
  parentBan: PropTypes.object.isRequired
}

export default BasicInfoSection
