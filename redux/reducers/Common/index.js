import { LanguageOptions } from "../../../constants";
import { SET_CURRENT_LANGUAGE } from "../../actions/Common";

const initialState = {
  currentLanguage: LanguageOptions.Vietnamese,
};

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_LANGUAGE: {
      return {
        ...state,
        currentLanguage: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default CommonReducer;
