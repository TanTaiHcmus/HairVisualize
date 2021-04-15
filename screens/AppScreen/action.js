import { SET_ACCESS_TOKEN, SET_IS_LOGIN } from "../../redux/actions/Login";
import { getTokenFromStorage, isEmpty } from "../../utils";

export const handleValidToken = () => async (dispatch) => {
  const token = await getTokenFromStorage();

  if (!isEmpty(token)) {
    dispatch({
      type: SET_IS_LOGIN,
      data: true,
    });

    dispatch({
      type: SET_ACCESS_TOKEN,
      data: token,
    });
  } else {
    dispatch({
      type: SET_IS_LOGIN,
      data: false,
    });
  }
};
