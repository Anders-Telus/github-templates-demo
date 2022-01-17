import React from "react";
import SearchView from "../Search/SearchView";
import { useBolster } from "@mobilelive-inc/bolsterjs";
import Notification from "@tds/core-notification";
import Text from "@tds/core-text";
import { permissions } from "../../helpers/constants";
import { hasAccess } from "../../helpers/auth";
import { withRouter } from "react-router-dom";
import { getCasaAppLocale } from '../../utils/locale';

const SearchApp = 
  ({
    history,
  }) => {
    const { requiresAuth, isAuthenticated, roles } = useBolster();
    const { lang } = useBolster()
   const locale = getCasaAppLocale(lang);
    return (
      <>
      <SearchView />
        {/* {(requiresAuth && !isAuthenticated && (
          <Notification variant="error" copy="en">
            <Text bold>{locale.app.unAuthenticated}</Text>
          </Notification>
        )) ||
          (requiresAuth && !hasAccess(roles, permissions.SEARCH_VIEW) && (
            <Notification variant="error" copy="en">
              <Text bold>
                {locale.app.invalidPermissions}
              </Text>
            </Notification>
          )) || <SearchView />} */}
      </>
    );
  }

export default SearchApp;
