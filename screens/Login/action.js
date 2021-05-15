import UserApi from "../../Api/userApi";
import { STATUS_MESSAGE, TOKEN } from "../../constants";
import { SET_IS_LOGIN } from "../../redux/actions/Login";
import { setTokenFromStorage } from "../../utils";

export const loginToServer = (info) => async (dispatch) => {
  const response = await UserApi.login(info);
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    await setTokenFromStorage(
      TOKEN.ACCESS_TOKEN,
      JSON.stringify(response.data.access_token)
    );
    await setTokenFromStorage(
      TOKEN.REFRESH_TOKEN,
      JSON.stringify(response.data.refresh_token)
    );

    dispatch({
      type: SET_IS_LOGIN,
      data: true,
    });
  }

  return response;
};
