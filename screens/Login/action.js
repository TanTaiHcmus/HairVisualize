import UserApi from "../../Api/userApi";
import { STATUS_MESSAGE } from "../../constants";
import { SET_ACCESS_TOKEN, SET_IS_LOGIN } from "../../redux/actions/Login";
import { setTokenFromStorage } from "../../utils";

export const loginToServer = (info) => async (dispatch) => {
  const isRememberLogin = info.isCheck;
  delete info.isCheck;

  const response = await UserApi.login(info);
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    if (isRememberLogin) {
      console.log("ok");
      setTokenFromStorage(response.data.access_token);
    }

    dispatch({
      type: SET_IS_LOGIN,
      data: true,
    });

    dispatch({
      type: SET_ACCESS_TOKEN,
      data: response.data.access_token,
    });
  }

  return response;
};
