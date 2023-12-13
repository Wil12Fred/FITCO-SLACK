interface data {
  email?: string;
  lastname: string;
  name: string;
  password?: string;
  status?: string;
  userId?: number;
  username?: string;
}

const actions = {
  USER_DATA_BEGIN: "USER_DATA_ERR",
  USER_DATA_SUCCESS: "USER_DATA_SUCCESS",
  USER_DATA_ERR: "USER_DATA_ERR",

  user_data_begin: () => {
    return {
      type: actions.USER_DATA_BEGIN,
    };
  },

  user_data_success: (data: data) => {
    return {
      type: actions.USER_DATA_SUCCESS,
      data,
    };
  },

  user_data_error: (err: any) => {
    return {
      type: actions.USER_DATA_ERR,
      err,
    };
  },
};

export default actions;
