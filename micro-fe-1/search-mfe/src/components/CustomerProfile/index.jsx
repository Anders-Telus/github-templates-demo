import FlexGrid from '@tds/core-flex-grid'
import PropTypes from 'prop-types'
import React from 'react'
import { CasaBox } from '../Styled'
import AccountInfo from '../AccountSelectorSection'
import BanSummary from '../BanSummary'
import BasicInfoSection from '../BasicInfoSection'
import CustomerStory from '../CustomerStory'
import NotesSection from '../CustomerNotes'
import {
  CusStoryWrapper,
  NotesWrapper,
  CustomerProfileContainer
} from './styles'
import { genBanProps, PROFILE_DATA } from '../../shared/constants'
import { useBolster } from '@mobilelive-inc/bolsterjs'

const ProfileTemplate = ({
  currentCustomer,
  banSummary: { mobility, ffh },
  updateIsSelectedBan,
  isTaskOpen,
  isNoteFormWindowOpen
}) => {
  const { lineOfBusiness: parentBanLOB } = currentCustomer
  const selectedBanHandler = (banData, selected) => {
    updateIsSelectedBan(banData.billingAcctNum, selected)
  }
  const { searchResult } = useBolster()

  const defaultBillingProps = {
    billingAcctNum: 70873913,
    billingAcctType: 'TELUS Mobility - Consumer',
    billingAddress: '10150 JASPER AV NW EDMONTON AB CAN T5J1W4'
  }

  return (
    <CasaBox pt={4} width='100vw'>
      <CustomerProfileContainer>
        <FlexGrid limitWidth={false} gutter={false} outsideGutter>
          <FlexGrid.Row>
            <FlexGrid.Col xs={12} sm={12} md={3} lg={3} xl={3}>
              <BasicInfoSection
                parentBan={{
                  ...PROFILE_DATA.banSummary.mobility[0],
                  ...searchResult
                }}
              />
              <AccountInfo
                mobBans={PROFILE_DATA.banSummary.mobility}
                ffhBans={ffh}
                parentBanLOB={parentBanLOB}
              />
            </FlexGrid.Col>
            <FlexGrid.Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <BanSummary
                key={`banSummary_${currentCustomer.tabUniqId}`}
                selectedBanHandler={selectedBanHandler}
                isTaskOpen={isTaskOpen}
                isNoteFormWindowOpen={isNoteFormWindowOpen}
                openBansSummary={PROFILE_DATA.banSummary}
                currentCustomer={PROFILE_DATA.banSummary}
                closedBansSummary={PROFILE_DATA.banSummary}
                parentBanDetail={PROFILE_DATA.banSummary}
                {...genBanProps(searchResult || defaultBillingProps)}
              />
            </FlexGrid.Col>
            <FlexGrid.Col
              xs={12}
              sm={12}
              md={3}
              lg={3}
              xl={3}
              style={{ marginBottom: '10px' }}
            >
              <CusStoryWrapper id='customerStory'>
                <CustomerStory key={`customerSection_${currentCustomer.tabUniqId}`} />
              </CusStoryWrapper>
              <NotesWrapper id='notesSection'>
                <NotesSection key={`notesSection_${currentCustomer.tabUniqId}`} />
              </NotesWrapper>
            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>
      </CustomerProfileContainer>
    </CasaBox>
  )
}

ProfileTemplate.defaultProps = {
  banSummary: {}
}

ProfileTemplate.propTypes = {
  currentCustomer: PropTypes.object.isRequired,
  banSummary: PropTypes.object,
  updateIsSelectedBan: PropTypes.func.isRequired,
  isTaskOpen: PropTypes.bool.isRequired,
  isNoteFormWindowOpen: PropTypes.bool.isRequired
}

export default ProfileTemplate
