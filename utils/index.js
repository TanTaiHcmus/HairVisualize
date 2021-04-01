import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN } from "../constants";

export const isEmpty = (text) => {
  return text === null || text === undefined || text === "";
};

export const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    return token;
  } catch {
    console.log("Storage error");
    return null;
  }
};

export const setTokenFromStorage = async (value) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, value);
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
