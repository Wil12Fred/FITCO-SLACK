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

const {
  user_data_begin,
  user_data_success,
  user_data_error,
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
