import FileApi from "../../Api/fileApi";
import UserApi from "../../Api/userApi";
import { STATUS_MESSAGE } from "../../constants";
import {
  SET_HAIR_STYLE_BANK,
  SET_YOUR_HAIR_STYLES,
} from "../../redux/actions/HairStyles";
import { addPrefixUrl } from "../../utils";

export const getYourHairStylesFromServer =
  (params, onEnd) => async (dispatch, getState) => {
    const response = await FileApi.getYourHairStyles(params);
    if (response.message === STATUS_MESSAGE.SUCCESS) {
      const { items } = response.data;
      if (items.length < params.limit) onEnd();
      const prevData = getState().hairStyles.yourHairStyles.slice(
        0,
        (params.page - 1) * params.limit
      );

      dispatch({
        type: SET_YOUR_HAIR_STYLES,
        data: [
          ...prevData,
          ...items.map((item) => ({
            image: addPrefixUrl(item.uri),
            interact: {
              numLikes: item.num_likes,
              numSimulations: item.num_simulations,
            },
            id: item.id,
            public: item.public,
            own: {
              displayName: item.user.display_name,
              avatar: addPrefixUrl(item.user.avatar),
            },
            liked: item.liked,
          })),
        ],
      });
    }
  };

export const getHairStyleBankFromServer =
  (params, userId, onEnd, onChangeSession) => async (dispatch, getState) => {
    const response = await FileApi.getHairStyleBank(params);
    if (response.message === STATUS_MESSAGE.SUCCESS) {
      const { items, session } = response.data;
      if (items.length < params.limit) onEnd();
      if (session !== params.session) onChangeSession(session);
      const prevData = getState().hairStyles.hairStyleBank.slice(
        0,
        (params.page - 1) * params.limit
      );

      dispatch({
        type: SET_HAIR_STYLE_BANK,
        data: [
          ...prevData,
          ...items.map((item) => ({
            image: addPrefixUrl(item.uri),
            interact: {
              numLikes: item.num_likes,
              numSimulations: item.num_simulations,
            },
            id: item.id,
            public: item.public,
            own: {
              displayName: item.user.display_name,
              avatar: addPrefixUrl(item.user.avatar),
            },
            liked: item.liked,
            isOwn: userId === item.user.id,
          })),
        ],
      });
    }
  };

export const handleMarkPublic = async (id, status) => {
  const response = await FileApi.markPublicFile(id, status);
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    return response.data;
  }
  return null;
};

export const handleMarkFileLiked = async (id, is_liked) => {
  const response = await FileApi.markFileLiked(id, is_liked);
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    return response.data;
  }
  return null;
};

export const getUserId = async () => {
  const response = await UserApi.getUserId();
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    return response.data;
  }
};

export const changeItem = (itemInfo) => (dispatch, getState) => {
  const { yourHairStyles, hairStyleBank } = getState().hairStyles;
  let findIndex = yourHairStyles.findIndex((item) => item.id === itemInfo.id);
  if (findIndex >= 0) {
    yourHairStyles[findIndex] = { ...itemInfo };
    dispatch({
      type: SET_YOUR_HAIR_STYLES,
      data: yourHairStyles,
    });
  }
  findIndex = hairStyleBank.findIndex((item) => item.id === itemInfo.id);
  if (findIndex >= 0) {
    hairStyleBank[findIndex] = {
      ...hairStyleBank[findIndex],
      ...itemInfo,
    };
    dispatch({
      type: SET_HAIR_STYLE_BANK,
      data: hairStyleBank,
    });
  }
};

export const deleteItemInHairStyleBank = (itemInfo) => (dispatch, getState) => {
  const data = getState().hairStyles.hairStyleBank;
  dispatch({
    type: SET_HAIR_STYLE_BANK,
    data: data.filter((item) => item.id !== itemInfo.id),
  });

  dispatch(changeItem({ ...itemInfo, public: false }));
};

export const addItemInHairStyleBank = (item) => (dispatch, getState) => {
  item.public = true;
  item.isOwn = true;
  const data = getState().hairStyles.hairStyleBank;
  dispatch({
    type: SET_HAIR_STYLE_BANK,
    data: [...data, item],
  });

  dispatch(changeItem(item));
};
