import { SET_HISTORY } from "../../actions/History";

const initialState = {
  data: [],
};

const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HISTORY: {
      return {
        ...state,
        data: [...action.data],
      };
    }
    default: {
      return state;
    }
  }
};

export default HistoryReducer;
