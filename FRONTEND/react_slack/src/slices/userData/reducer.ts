import actions from "./actions";

interface data {
  data: {
    name: string;
    lastname: string;
  };
}

interface initialState {
  data: data;
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
  loading: false,
  error: null,
};

const {
  USER_DATA_BEGIN,
  USER_DATA_SUCCESS,
  USER_DATA_ERR,
} = actions;

const userDataReducer = (state = initialStateUpdate, action: any) => {
  const { type, data, err } = action;
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
    default:
      return state;
  }
};

export { userDataReducer };
