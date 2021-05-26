import AsyncStorage from "@react-native-async-storage/async-storage";
import { SortOptions, SortOrderOptions, URL_SERVER } from "../constants";
import { SET_IS_LOGIN } from "../redux/actions/Login";
import store from "../redux/store";

export const isEmpty = (text) => {
  return text === null || text === undefined || text === "";
};

export const getTokenFromStorage = async (name) => {
  try {
    const token = await AsyncStorage.getItem(name);
    return token ? JSON.parse(token) : {};
  } catch {
    console.log("Storage error");
    return null;
  }
};

export const setTokenFromStorage = async (token, value) => {
  try {
    await AsyncStorage.setItem(token, value);
    return true;
  } catch {
    console.log("Storage error");
    return false;
  }
};

export const getFileFromUri = (uri) => {
  return {
    uri,
    type: "image/jpeg",
    name: "photo.jpg",
  };
};

export const handleLogout = async () => {
  const { dispatch } = store;

  try {
    await AsyncStorage.clear();
    dispatch({
      type: SET_IS_LOGIN,
      data: false,
    });
  } catch {
    console.log("Storage error");
  }
};

export const addPrefixUrl = (url) => {
  return !isEmpty(url) ? `${URL_SERVER}${url}` : "";
};

export const checkExpiredToken = (expiry) => {
  const today = new Date();
  const timeExpiredToken = new Date(expiry);
  return timeExpiredToken >= today;
};

export const generateToSortString = (sortType, sortOrder) => {
  let result = "";

  switch (sortType) {
    case SortOptions.Time: {
      result = "id";
      break;
    }
    case SortOptions.LikeAmount: {
      result = "num_likes";
      break;
    }
    case SortOptions.VisualizeAmount: {
      result = "num_simulations";
      break;
    }
    default: {
      break;
    }
  }

  if (sortOrder === SortOrderOptions.DESC) result = "-" + result;

  return result;
};
