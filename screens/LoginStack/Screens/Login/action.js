import UserApi from "../../../../Api/userApi";
import { STATUS_MESSAGE } from "../../../../constants";
import { SET_IS_LOGIN } from "../../../../redux/actions/Login";
import { setTokenFromStorage } from "../../../../utils";

export const loginToServer = (info) => async (dispatch) => {
  const response = await UserApi.login(info);
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    const isSetToken = await setTokenFromStorage(response.data.access_token);

    if (isSetToken) {
      dispatch({
        type: SET_IS_LOGIN,
        data: true,
      });
    }
  }

  return response;
};
