import actions from "./actions";
import Cookies from "js-cookie";

const {
  login_begin,
  login_success,
  login_err,
  logout_begin,
  logout_success,
  logout_err,
} = actions;

export const on_login_begin = () => {
  return async (dispatch: any) => {
    dispatch(login_begin());
  };
};

export const on_login_success = () => {
  return async (dispatch: any) => {
    Cookies.set("logedIn", "true");
    dispatch(login_success(true));
  };
};

export const on_login_err = (err: any) => {
  return async (dispatch: any) => {
    dispatch(login_err(err));
  };
};

export const on_logout_begin = () => {
  return async (dispatch: any) => {
    dispatch(logout_begin());
  };
};

export const on_logout_success = () => {
  return async (dispatch: any) => {
    Cookies.remove("logedIn");
    dispatch(logout_success(null));
  };
};

export const on_logout_err = (err: any) => {
  return async (dispatch: any) => {
    dispatch(logout_err(err));
  };
};
