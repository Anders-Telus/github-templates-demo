import React from "react";
import PropTypes from "prop-types";
import FlexGrid from "@tds/core-flex-grid";
import { useBolster } from '@mobilelive-inc/bolsterjs';
import HairlineDivider from "@tds/core-hairline-divider";
import Text from "@tds/core-text";
import { Home } from "@tds/core-decorative-icon";
import TextAreaComponent from "../TextArea";
import Telus from "../../assets/svgs/Telus";

import {
  SelectWrapper,
  BanNumber,
  WordCount,
  LobIcon,
  LobName,
  Comments,
  FeedbackContainer,
  UserDetailsContainer,
  SupportIconContainer,
} from "./styles";
import { OpenStatusIcon, HollowStatusIcon } from "../styles";
import { CasaBox, Label, SaveButton } from "../Styled";
import { getCasaAppLocale } from '../../utils/locale';
import { useState } from "react";
import { useEffect } from "react";

const Form = ({
  name,
  openNewDialog,
  dialogEvent,
  tabId,
  subTabId
}) => {
  const { lang } = useBolster();
  const locale = getCasaAppLocale(lang);
  const [subNote, setSubNote] = useState('');
  const [comment, setLineComment] = useState('');
  
  useEffect(() => {
    if (dialogEvent) {
      dialogEvent.on(`sub_note_${tabId}`, function(val) {
        setSubNote(val);
      });
    }
  }, [])

  const setComment = (value) => {
    if (dialogEvent) {
      setLineComment(value);
      localStorage.setItem(`sub_note_${subTabId}`, value)
    }
  }
  
  if(subTabId) {
    return (
      <FlexGrid id="note_form">
      <HairlineDivider />
      <FlexGrid.Row>
        <FeedbackContainer>
          <FlexGrid.Col lg={9} md={9}>
          <FlexGrid.Row>
              <SelectWrapper>
                {subNote}
                {subNote && <br />}
                <SaveButton type="button" onClick={() => openNewDialog()}>
                  {`${locale.app.openChildDialog} - ${subTabId}.${tabId}`}
                </SaveButton>
              </SelectWrapper>
            </FlexGrid.Row> 
            <FlexGrid.Row verticalAlign="middle">
              
              <Comments>
                <CasaBox weight="bold" mt="5px">
                  {locale.app.childDialogText}
                  <WordCount>
                    <Label size={14} weight={500}>
                      {0}
                      {"/1000"}
                    </Label>
                  </WordCount>
                </CasaBox>
                <CasaBox>
                  <TextAreaComponent
                    rows="7"
                    cols="40"
                    placeHolder={locale.app.noteTextPlaceholder}
                    styles={{
                      border: "1px solid #444",
                      borderRadius: "5px",
                      resize: "none",
                      padding: "5px",
                    }}
                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                    onBlur={() => {}}
                    value={comment}
                  />
                </CasaBox>
              </Comments>
            </FlexGrid.Row>
          </FlexGrid.Col>
        </FeedbackContainer>
        <HairlineDivider />
      </FlexGrid.Row>
    </FlexGrid>
    )
  }
  return (
    <FlexGrid id="note_form">
      <HairlineDivider />
      <FlexGrid.Row>
        <UserDetailsContainer>
          <FlexGrid.Col lg={3} md={3}>
            <CasaBox mt="30px" mb="20px">
              <Telus />
            </CasaBox>
            <CasaBox mb="5px" width="153px">
              {name}
            </CasaBox>
            <CasaBox dispay="inline-flex" width="153px">
              <LobIcon>
                <Home size={14} />
              </LobIcon>
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
          <FlexGrid.Col lg={9} md={9}>
            <CasaBox dispay="block" weight="bold">
              {<Text>{locale.app.category}</Text>}
            </CasaBox>
            <FlexGrid.Row>
              <SelectWrapper>
                {subNote}
                {subNote && <br />}
                <SaveButton type="button" onClick={() => openNewDialog()}>
                  {locale.app.openChildDialog}
                </SaveButton>
              </SelectWrapper>
            </FlexGrid.Row>
            <FlexGrid.Row verticalAlign="middle">
              <Comments>
                <CasaBox weight="bold" mt="5px">
                  {locale.app.comments}
                  <WordCount>
                    <Label size={14} weight={500}>
                      {0}
                      {"/1000"}
                    </Label>
                  </WordCount>
                </CasaBox>
                <CasaBox>
                  <TextAreaComponent
                    rows="7"
                    cols="57"
                    placeHolder={locale.app.noteTextPlaceholder}
                    styles={{
                      border: "1px solid #444",
                      borderRadius: "5px",
                      resize: "none",
                      padding: "5px",
                    }}
                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                    onBlur={() => {}}
                    value={comment}
                  />
                </CasaBox>
              </Comments>
            </FlexGrid.Row>
          </FlexGrid.Col>
        </FeedbackContainer>
        <HairlineDivider />
      </FlexGrid.Row>
    </FlexGrid>
  );
};

Form.defaultProps = {
  name: "",
  notesCategoriesList: [],
  commentText: "",
  selectedCategory: "",
  locale: { app: {} },
};

Form.propTypes = {
  name: PropTypes.string,
  transBillingAcctStatus: PropTypes.string.isRequired,
  notesCategoriesList: PropTypes.array,
  updateSelectedCategory: PropTypes.func.isRequired,
  updateCommentText: PropTypes.func.isRequired,
  commentText: PropTypes.string,
  selectedCategory: PropTypes.string,
  billingAcctNum: PropTypes.string.isRequired,
  onChnageCommentText: PropTypes.func.isRequired,
  locale: PropTypes.object,
};

export default Form;
