import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authentication/reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export const store = configureStore({ reducer: rootReducer, devTools: true });
