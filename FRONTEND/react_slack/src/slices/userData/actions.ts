interface data {
  email?: string;
  lastname: string;
  name: string;
  password?: string;
  status?: string;
  userId?: number;
  username?: string;
}

interface workspace {
  name: string;
  id: string;
}

const actions = {
  USER_DATA_BEGIN: "USER_DATA_ERR",
  USER_DATA_SUCCESS: "USER_DATA_SUCCESS",
  USER_DATA_ERR: "USER_DATA_ERR",
  USER_SET_WORKSPACE: "USER_SET_WORKSPACE",
  USER_SET_CHANNEL: "USER_SET_CHANNEL",

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

  user_set_workspace: (currentState: any, workspace: workspace) => {
    return {
      type: actions.USER_SET_WORKSPACE,
      currentState,
      workspace,
    }
  },
  user_set_channel: (currentState: any, channel: any) => {
    return {
      type: actions.USER_SET_CHANNEL,
      currentState,
      channel,
    }
  },
};

export default actions;
