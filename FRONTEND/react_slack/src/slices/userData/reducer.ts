import actions from "./actions";

interface data {
  data: {
    name: string;
    lastname: string;
  };
}

interface workspace {
  name: string;
  id: string;
}

interface channel {
  name: string;
  id: string;
}

interface initialState {
  data: data;
  workspace: workspace | null;
  channel: channel | null;
  loading: boolean;
  error: false | null;
}

const initialStateUpdate: initialState = {
  data: {
    data: {
      name: "User",
      lastname: "",
    },
  },
  channel: null,
  workspace: null,
  loading: false,
  error: null,
};

const {
  USER_DATA_BEGIN,
  USER_DATA_SUCCESS,
  USER_DATA_ERR,
  USER_SET_WORKSPACE,
  USER_SET_CHANNEL,
} = actions;

const userDataReducer = (state = initialStateUpdate, action: any) => {
  const { type, data, workspace, channel, currentState, err } = action;
  switch (type) {
    case USER_DATA_BEGIN:
      return {
        ...initialStateUpdate,
        loading: true,
      };
    case USER_DATA_SUCCESS:
      return {
        ...initialStateUpdate,
        data,
        loading: false,
      };
    case USER_DATA_ERR:
      return {
        ...initialStateUpdate,
        error: err,
        loading: false,
      };
    case USER_SET_WORKSPACE:
      return {
        ...currentState,
        workspace,
      }
    case USER_SET_CHANNEL:
      return {
        ...currentState,
        channel,
      }
    default:
      return state;
  }
};

export { userDataReducer };
