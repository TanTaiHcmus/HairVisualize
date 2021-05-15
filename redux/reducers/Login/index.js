import { SET_IS_LOGIN } from "../../actions/Login";

const initialState = {
  isLogin: null,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGIN: {
      return {
        ...state,
        isLogin: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
