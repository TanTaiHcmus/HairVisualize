import FileApi from "../../Api/fileApi";
import UserApi from "../../Api/userApi";
import { STATUS_MESSAGE } from "../../constants";
import FileSystem from "expo-file-system";
import JSZip from "jszip";
import {
  SET_HAIR_STYLE_BANK,
  SET_YOUR_HAIR_STYLES,
} from "../../redux/actions/HairStyles";
import { addPrefixUrl, convertObjectToFormData } from "../../utils";

export const getYourHairStylesFromServer =
  (params, onEnd) => async (dispatch, getState) => {
    if (!params.filter.style) delete params.filter.style;
    if (!params.filter.gender) delete params.filter.gender;
    if (!params.filter.file_type) delete params.filter.file_type;
    if (Object.keys(params.filter).length === 0) delete params.filter;
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
            created_at: item.created_at,
            liked: item.liked,
            style: item.style,
            gender: item.gender,
            isOwn: true,
            file_type: item.file_type,
          })),
        ],
      });
    }
  };

export const getHairStyleBankFromServer =
  (params, userId, onEnd, onChangeSession) => async (dispatch, getState) => {
    if (!params.filter.style) delete params.filter.style;
    if (!params.filter.gender) delete params.filter.gender;
    if (!params.filter.file_type) delete params.filter.file_type;
    if (Object.keys(params.filter).length === 0) delete params.filter;
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
            style: item.style,
            gender: item.gender,
            created_at: item.created_at,
            liked: item.liked,
            isOwn: userId === item.user.id,
            file_type: item.file_type,
          })),
        ],
      });
    }
  };

export const handleMarkPublic = async (data) => {
  const response = await FileApi.markPublicFile(convertObjectToFormData(data));
  return response;
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

export const unshareItem = (itemInfo) => (dispatch, getState) => {
  const data = getState().hairStyles.hairStyleBank;
  dispatch({
    type: SET_HAIR_STYLE_BANK,
    data: data.filter((item) => item.id !== itemInfo.id),
  });

  dispatch(changeItem({ ...itemInfo, public: false }));
};

export const shareItem = (item) => (dispatch) => {
  dispatch(changeItem({ ...item, public: true }));
};

export const deleteItems = (ids) => async (dispatch, getState) => {
  const response = await FileApi.deleteFiles(JSON.stringify({ file_ids: ids }));
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    const { yourHairStyles, hairStyleBank } = getState().hairStyles;
    dispatch({
      type: SET_HAIR_STYLE_BANK,
      data: hairStyleBank.filter((item) => !ids.includes(item.id)),
    });
    dispatch({
      type: SET_YOUR_HAIR_STYLES,
      data: yourHairStyles.filter((item) => !ids.includes(item.id)),
    });
    return response;
  }
  return null;
};

export const downloadItems = async (ids) => {
  const response = await FileApi.downloadFiles(
    ids.map((value) => `ids=${value}`).join("&")
  );
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    // const zip = await JSZip.loadAsync(response.data);
    // console.log(zip);
    // zip.forEach((relativePath, file) => {
    //   if (file.dir) return;
    //   // const uri = `${localBaseUri}${relativePath}`;
    //   file.async("base64").then((base64) => {
    //     // FileSystem.writeAsStringAsync(uri, base64, {
    //     //   encoding: FileSystem.EncodingTypes.Base64,
    //     // });
    //   });
    // });
  }

  return null;
};
