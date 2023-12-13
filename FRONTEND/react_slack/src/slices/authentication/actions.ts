const actions = {
  LOGIN_BEGIN: "LOGIN_BEGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERR: "LOGIN_ERR",

  LOGOUT_BEGIN: "LOGOUT_BEGIN",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_ERR: "LOGOUT_ERR",

  login_begin: () => {
    return {
      type: actions.LOGIN_BEGIN,
    };
  },

  login_success: (data: boolean) => {
    return {
      type: actions.LOGIN_SUCCESS,
      data,
    };
  },

  login_err: (err: any) => {
    return {
      type: actions.LOGIN_ERR,
      err,
    };
  },

  logout_begin: () => {
    return {
      type: actions.LOGOUT_BEGIN,
    };
  },

  logout_success: (data: any) => {
    return {
      type: actions.LOGOUT_SUCCESS,
      data,
    };
  },

  logout_err: (err: any) => {
    return {
      type: actions.LOGOUT_ERR,
      err,
    };
  },
};

export default actions;
