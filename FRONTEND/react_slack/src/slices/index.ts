import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
});

export const store = configureStore({ reducer: rootReducer, devTools: true });
