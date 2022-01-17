import React from "react";
import FlexGrid from "@tds/core-flex-grid";
import Box from "@tds/core-box";
import Checkbox from "@tds/core-checkbox";
import HairlineDivider from "@tds/core-hairline-divider";
import { Home } from '@tds/core-decorative-icon'
import SelectInput from "../Select/CustomSelect";
import { useBolster } from '@mobilelive-inc/bolsterjs';
import Telus from '../../assets/svgs/Telus'
import {
  BanNumber,
  LobIcon,
  LobName,
  UserDetailsContainer,
  FeedbackContainer
} from './styles'
import { HollowStatusIcon } from '../styles'
import { CasaBox } from '../Styled'
import {
  Mandatory,
  DetailsLabel,
  CheckBoxWrapper,
  DateTimeLabelContainer,
  DueDateValue,
} from "./style";
import { getCasaAppLocale } from '../../utils/locale'

const DetailComponent = () => {
  const { lang } = useBolster();
  const locale = getCasaAppLocale(lang);
  return (
    <FlexGrid>
      <HairlineDivider />
      <FlexGrid.Row>
      <UserDetailsContainer>
        <FlexGrid.Col lg={3} md={3}>
          <CasaBox mt="30px" mb="20px">
            <Telus />
          </CasaBox>
          <CasaBox mb="5px" width="153px">{name}</CasaBox>
          <CasaBox dispay="inline-flex" width="153px">
            <LobIcon><Home size={14} /></LobIcon>
            <LobName>{locale.app.mobility}</LobName>
            <CasaBox mt="5px" dispay="inline-flex">
              <HollowStatusIcon margin="-3px 0 0 5px" />
              <BanNumber>
                70873913
                <br />
                *** *** 982
              </BanNumber>
            </CasaBox>
          </CasaBox>
        </FlexGrid.Col>
      </UserDetailsContainer>
      <FeedbackContainer>
        <FlexGrid.Col md={9} lg={9}>
          <Box between={2}>
            <Box between={1}>
              <FlexGrid limitWidth={false} gutter={false}>
                <FlexGrid.Row distribute="between">
                  <FlexGrid.Col xl={4} md={4} horizontalAlign="left">
                    <DetailsLabel>
                      <Box inline between={1}>
                        <Mandatory>*</Mandatory>
                        <DetailsLabel>{locale.app.request}</DetailsLabel>
                      </Box>
                    </DetailsLabel>
                  </FlexGrid.Col>
                  <FlexGrid.Col xl={8} md={8}>
                    <SelectInput
                      id="request"
                      options={[]}
                      placeholder={locale.app.select}
                    />
                  </FlexGrid.Col>
                </FlexGrid.Row>
              </FlexGrid>
              <FlexGrid limitWidth={false} gutter={false}>
                <FlexGrid.Row distribute="between">
                  <FlexGrid.Col xl={4} md={4} horizontalAlign="left">
                    <DetailsLabel>
                      <Box inline between={1}>
                        <Mandatory>*</Mandatory>
                        <DetailsLabel>{locale.app.type}</DetailsLabel>
                      </Box>
                    </DetailsLabel>
                  </FlexGrid.Col>
                  <FlexGrid.Col xl={8} md={8}>
                    <SelectInput
                      id="type"
                      options={[]}
                      placeholder={locale.app.select}
                    />
                  </FlexGrid.Col>
                </FlexGrid.Row>
              </FlexGrid>
            </Box>
            <Box between={3}>
              <FlexGrid limitWidth={false} gutter={false}>
                <FlexGrid.Row distribute="between">
                  <FlexGrid.Col xl={4} md={4} horizontalAlign="left">
                    <DetailsLabel>
                      <Box inline between={1}>
                        <Mandatory>*</Mandatory>
                        <DetailsLabel>{locale.app.agentFunction}</DetailsLabel>
                      </Box>
                    </DetailsLabel>
                  </FlexGrid.Col>
                  <FlexGrid.Col xl={8} md={8}>
                    <Box between={2}>
                      <SelectInput
                        id="agentFunction"
                        options={[]}
                        placeholder={locale.app.select}
                      />
                      <CheckBoxWrapper>
                        <Checkbox
                          id="agentFunction"
                          label={locale.app.routeAnotherAgentFunction}
                          value={false}
                        />
                      </CheckBoxWrapper>
                    </Box>
                  </FlexGrid.Col>
                </FlexGrid.Row>
              </FlexGrid>
              <FlexGrid limitWidth={false} gutter={false}>
                <FlexGrid.Row distribute="between">
                  <FlexGrid.Col xl={4} md={4} horizontalAlign="left">
                    <DetailsLabel>
                      <Box inline between={1}>
                        <Mandatory>*</Mandatory>
                        <DetailsLabel>{locale.app.dueDate}</DetailsLabel>
                      </Box>
                    </DetailsLabel>
                  </FlexGrid.Col>
                  <FlexGrid.Col xl={8} md={8}>
                    <DateTimeLabelContainer
                      isWarning={false}
                      onClick={() => {}}
                      isHover={true}
                    >
                      <>
                        <DueDateValue id="task_creation_duedate_label">
                          {locale.app.select}
                        </DueDateValue>
                      </>
                    </DateTimeLabelContainer>
                  </FlexGrid.Col>
                </FlexGrid.Row>
              </FlexGrid>
              <FlexGrid limitWidth={false} gutter={false}>
                <>
                  <FlexGrid.Row horizontalAlign="start">
                    <DetailsLabel>
                      <Box inline between={1}>
                        <Mandatory>*</Mandatory>
                        <DetailsLabel>{locale.app.comments}</DetailsLabel>
                      </Box>
                    </DetailsLabel>
                  </FlexGrid.Row>
                </>
              </FlexGrid>
            </Box>
          </Box>
        </FlexGrid.Col>
        </FeedbackContainer>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export default DetailComponent;
