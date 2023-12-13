import actions from "./actions";

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

const {
  user_data_begin,
  user_data_success,
  user_data_error,
  user_set_workspace,
  user_set_channel,
} = actions;

export const on_user_data_begin = () => {
  return async (dispatch: any) => {
    dispatch(user_data_begin());
  };
};

export const on_user_data_success = (data: data) => {
  return async (dispatch: any) => {
    dispatch(user_data_success(data));
  };
};

export const on_user_data_error = (err: any) => {
  return async (dispatch: any) => {
    dispatch(user_data_error(err));
  };
};

export const on_user_set_workspace = (currentState: any, workspace: workspace) => {
  return async (dispatch: any) => {
    dispatch(user_set_workspace(currentState, workspace));
  };
};
export const on_user_set_channel = (currentState: any, channel: any) => {
  return async (dispatch: any) => {
    dispatch(user_set_channel(currentState, channel));
  };
};