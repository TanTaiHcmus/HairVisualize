import {
  SET_HAIR_STYLE_BANK,
  SET_YOUR_HAIR_STYLES,
} from "../../actions/HairStyles";

const initialState = {
  yourHairStyles: [],
  hairStyleBank: [],
};

const HairStylesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_YOUR_HAIR_STYLES: {
      return {
        ...state,
        yourHairStyles: [...action.data],
      };
    }
    case SET_HAIR_STYLE_BANK: {
      return {
        ...state,
        hairStyleBank: [...action.data],
      };
    }
    default: {
      return state;
    }
  }
};

export default HairStylesReducer;
