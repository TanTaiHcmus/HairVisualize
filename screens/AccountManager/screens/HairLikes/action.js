import FileApi from "../../../../Api/fileApi";
import { STATUS_MESSAGE } from "../../../../constants";
import { SET_HAIR_LIKES } from "../../../../redux/actions/HairStyles";
import { addPrefixUrl } from "../../../../utils";

export const getHairLikesFromServer =
  (params, onEnd) => async (dispatch, getState) => {
    const response = await FileApi.getHairLikes(params);
    if (response.message === STATUS_MESSAGE.SUCCESS) {
      const { items } = response.data;
      if (items.length < params.limit) onEnd();
      const prevData = getState().hairStyles.hairLikes.slice(
        0,
        (params.page - 1) * params.limit
      );
      const { id } = getState().user;
      dispatch({
        type: SET_HAIR_LIKES,
        data: [
          ...prevData,
          ...items.map((item) => ({
            image: addPrefixUrl(item.uri),
            interact: {
              numLikes: item.num_likes,
              numSimulations: item.num_simulations,
            },
            id: item.id,
            own: {
              displayName: item.user.display_name,
              avatar: addPrefixUrl(item.user.avatar),
            },
            created_at: item.created_at,
            public: item.public,
            liked: item.liked,
            isOwn: id === item.user.id,
            file_type: item.file_type,
          })),
        ],
      });
    }
  };

export const changeItem = (itemInfo) => (dispatch, getState) => {
  const { hairLikes } = getState().hairStyles;
  let findIndex = hairLikes.findIndex((item) => item.id === itemInfo.id);
  if (findIndex >= 0) {
    hairLikes[findIndex] = { ...itemInfo };
    dispatch({
      type: SET_HAIR_LIKES,
      data: hairLikes,
    });
  }
};

export const deleteItems = (ids) => async (dispatch, getState) => {
  const response = await FileApi.deleteFiles(JSON.stringify({ file_ids: ids }));
  if (response.message === STATUS_MESSAGE.SUCCESS) {
    const { hairLikes } = getState().hairStyles;
    dispatch({
      type: SET_HAIR_LIKES,
      data: hairLikes.filter((item) => !ids.includes(item.id)),
    });
  }
};
