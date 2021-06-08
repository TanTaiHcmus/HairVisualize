import { TOKEN } from "../../constants";
import { SET_IS_LOGIN } from "../../redux/actions/Login";
import { getTokenFromStorage, isEmpty, checkExpiredToken } from "../../utils";

export const handleValidToken = () => async (dispatch) => {
  const { value: token, expiry } = await getTokenFromStorage(
    TOKEN.REFRESH_TOKEN
  );

  if (!isEmpty(token) && checkExpiredToken(expiry)) {
    dispatch({
      type: SET_IS_LOGIN,
      data: true,
    });
  } else {
    dispatch({
      type: SET_IS_LOGIN,
      data: false,
    });
  }
};
