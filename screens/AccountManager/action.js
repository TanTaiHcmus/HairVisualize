import UserApi from "../../Api/userApi";
import { STATUS_MESSAGE } from "../../constants";
import { UPDATE_USER_INFO } from "../../redux/actions/User";
import { addPrefixUrl, isEmpty } from "../../utils";

export const updateUserInfoToServer = (info) => async (dispatch) => {
  const response = await UserApi.updateInfo(info);

  if (response.message === STATUS_MESSAGE.SUCCESS) {
    const {
      display_name: displayName,
      avatar,
      email,
      updated_at,
    } = response.data;
    const customAvatar = !isEmpty(avatar)
      ? `${addPrefixUrl(avatar)}?${updated_at}`
      : "";

    dispatch({
      type: UPDATE_USER_INFO,
      data: {
        displayName,
        avatar: customAvatar,
        email,
      },
    });
  }

  return response;
};

export const getUserInfoFromServer = () => async (dispatch) => {
  const response = await UserApi.getUserInfo();

  if (response.message === STATUS_MESSAGE.SUCCESS) {
    const {
      id,
      account,
      display_name: displayName,
      avatar,
      email,
      updated_at,
    } = response.data || {};

    dispatch({
      type: UPDATE_USER_INFO,
      data: {
        id,
        account,
        displayName,
        avatar: !isEmpty(avatar) ? `${addPrefixUrl(avatar)}?${updated_at}` : "",
        email,
      },
    });
  }

  return response;
};
