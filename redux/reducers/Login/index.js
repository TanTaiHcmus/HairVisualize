import { SET_ACCESS_TOKEN, SET_IS_LOGIN } from "../../actions/Login";

const initialState = {
  isLogin: null,
  token: "",
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGIN: {
      return {
        ...state,
        isLogin: action.data,
      };
    }
    case SET_ACCESS_TOKEN: {
      return {
        ...state,
        token: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
