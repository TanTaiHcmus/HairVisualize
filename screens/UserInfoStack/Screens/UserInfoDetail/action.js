import UserApi from "../../../../Api/userApi";
import { INVALID_TOKEN_STATUS, STATUS_MESSAGE } from "../../../../constants";
import { UPDATE_USER_INFO } from "../../../../redux/actions/User";
import { addPrefixUrl, handleLogout } from "../../../../utils";

export const updateUserInfoToServer = (info) => async (dispatch) => {
  const response = await UserApi.updateInfo(info);

  if (response.message === STATUS_MESSAGE.SUCCESS) {
    const {
      account,
      display_name: displayName,
      avatar,
      email,
      updated_at,
    } = response.data;
    dispatch({
      type: UPDATE_USER_INFO,
      data: {
        account,
        displayName,
        avatar: `${addPrefixUrl(avatar)}?${updated_at}`,
        email,
      },
    });
  } else if (response.data.status === INVALID_TOKEN_STATUS) {
    handleLogout(dispatch);
  }

  return response;
};
