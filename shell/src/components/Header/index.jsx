import React, { useState } from "react";
import FlexGrid from "@tds/core-flex-grid";
import Box from "@tds/core-box";
import Text from "@tds/core-text";
import { SettingsBold, ProfileBold } from "@tds/core-interactive-icon";
import { HeadMale, Chat1 } from "@tds/core-decorative-icon";
import Radio from "@tds/core-radio";
import { useAuth0 } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";
import { Wrapper, Feedback, MenuHeader, Toolbar } from "./styles";
import CasaLogo from "../../assets/svgs/CasaLogo";
import PopupMenu from "../PopupMenu";
import Tooltip from "../Tooltip";
import { changeLocale, getCasaAppLocale, getNewLocaleUrlWithoutBase } from "../../utils/locale";

const Header = () => {
  const lang = 'en';
  const { feedback } = "Some Feedback";
  const [localeLang, setLocaleLang] = useState(lang);
  const { user, logout } = useAuth0();
  const locale = getCasaAppLocale(lang);

  const updateLocale = (locale) => {
    const event = {
      detail: {
        language: locale,
        region: prov
      }
    };
    setLocaleLang(locale);
    const newUrl = getNewLocaleUrlWithoutBase(event);
    history.push(newUrl);
  }

  const menuStyleProps = {
    align: "left",
    width: "300px",
    offset: [-9, 0],
  };

  const profileMenuItems = [
    {
      content: (
        <Box horizontal={2} vertical={1} between={2} inline>
          <Wrapper>
            <HeadMale />
          </Wrapper>
          <Wrapper>{'Adil Sikandar'}</Wrapper>
        </Box>
      ),
      align: "left",
    },
    {
      content: (
        <Box horizontal={2} vertical={1} between={2} inline>
          <Wrapper>
            <Chat1 />
          </Wrapper>
          <Feedback target="_blank" href={feedback}>
            {locale.app.someFeedback}
          </Feedback>
        </Box>
      ),
      align: "left",
    },
  ];

  const settingsMenuItems = [
    {
      content: (
        <Box between={2} vertical={3}>
          <MenuHeader>
            <Text bold id="item_Text">
              {localeLang.toUpperCase()}
            </Text>
          </MenuHeader>
          <Radio
            label={locale.app.english}
            name="preferred-lang"
            value="en"
            checked={localeLang === "en"}
            onChange={() => updateLocale("en")}
          />
          <Radio
            label={locale.app.french}
            name="preferred-lang"
            value="fr"
            checked={localeLang === "fr"}
            onChange={() => updateLocale("fr")}
          />
        </Box>
      ),
    },
  ];

  return (
    <FlexGrid limitWidth={false} gutter={false}>
      <FlexGrid.Row distribute="between">
        <FlexGrid.Col xs={3} horizontalAlign="left">
          <Box inset={2}>
            <CasaLogo
              style={{
                transform: "translateY(3px)",
                marginTop: "2px",
                cursor: "auto",
              }}
            />
          </Box>
        </FlexGrid.Col>
        <FlexGrid.Col xs={9} horizontalAlign="right">
          <Toolbar>
            <PopupMenu
              id="SettingsMenu"
              items={settingsMenuItems}
              header={locale.app.settings}
              {...menuStyleProps}
            >
              <Tooltip text={locale.app.settings}>
                <SettingsBold copy={{ a11yText: "" }} />
              </Tooltip>
            </PopupMenu>

            <PopupMenu
              id="ProfileMenu"
              items={profileMenuItems}
              footer={
                <Text
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  {locale.app.logout}
                </Text>
              }
              {...menuStyleProps}
            >
              <Tooltip text={locale.app.user}>
                <ProfileBold copy={{ a11yText: "" }} />
              </Tooltip>
            </PopupMenu>
          </Toolbar>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export default Header;
