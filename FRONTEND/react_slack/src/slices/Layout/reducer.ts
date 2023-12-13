import { createSlice } from "@reduxjs/toolkit";

//constants
import {
  leftSidebarTypes,
} from "../../constants/layout";

interface LayoutStateType {
  leftSideBarType : any;
}
export const initialState: LayoutStateType = {
  leftSideBarType: leftSidebarTypes.DEFAULT,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeSidebarTypeAction(state, action) {
      state.leftSideBarType = action.payload
    },
  },
});

export const {
  changeSidebarTypeAction,
} = layoutSlice.actions

export default layoutSlice.reducer;