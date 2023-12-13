import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { userDataReducer } from "./userData/reducer";
import AuthReducer from "./authentication/reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  userData: userDataReducer,
});

export const store = configureStore({ reducer: rootReducer, devTools: true });
