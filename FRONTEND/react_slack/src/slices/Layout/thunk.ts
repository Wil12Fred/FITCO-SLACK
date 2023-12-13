import { changeBodyAttribute, manageBodyClass } from "./utils";

import {
  changeSidebarTypeAction,
} from "./reducer";

export const changeSidebarType =
  (sidebarType: any) =>
  async (dispatch: any) => {
    manageBodyClass("sidebar-enable", "remove");
    changeBodyAttribute("data-sidebar-size", "md");
    dispatch(changeSidebarTypeAction(sidebarType));
  };
