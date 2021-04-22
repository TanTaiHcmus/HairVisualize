import { SET_CURRENT_LANGUAGE } from "../../../../../redux/actions/Common";

export const changeLanguage = (value) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_LANGUAGE,
    data: value,
  });
};
