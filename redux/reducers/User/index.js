import { UPDATE_USER_INFO } from "../../actions/User";

const initialState = {
  account: "",
  displayName: "",
  email: "",
  avatar: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO: {
      return {
        ...state,
        ...action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
