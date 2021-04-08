import { SET_IS_LOGIN } from "../../redux/actions/Login";

export const setIsLogin = (isLogin) => (dispatch) => {
  dispatch({
    type: SET_IS_LOGIN,
    data: isLogin,
  });
};
