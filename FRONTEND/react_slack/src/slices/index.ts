import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { userDataReducer } from "./userData/reducer";
import AuthReducer from "./authentication/reducer";
import layoutReducer from "./Layout/reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  userData: userDataReducer,
  Layout: layoutReducer,
});

export const store = configureStore({ reducer: rootReducer, devTools: true });
